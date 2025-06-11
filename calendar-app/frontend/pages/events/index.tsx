import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

export default function EventsPage() {
  const { token, logout } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const loadEvents = async () => {
    const res = await api.get(`/events?search=${search}&page=${page}&limit=${limit}`);
    setEvents(res.data.events);
    setTotal(res.data.total);
  };

  useEffect(() => {
    if (token) loadEvents();
  }, [token, page]);

  useEffect(() => {
    if (!token) router.push('/login');
  }, [token]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    await loadEvents();
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/events/${id}`);
    loadEvents();
  };

  return (
    <main style={{ maxWidth: '800px', margin: '3rem auto' }}>
      <h2>Eventos</h2>

      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input placeholder="Buscar por título o fecha" value={search} onChange={e => setSearch(e.target.value)} />
        <button type="submit">Buscar</button>
        <button type="button" onClick={() => router.push('/events/create')}>Nuevo Evento</button>
        <button type="button" onClick={logout}>Cerrar Sesión</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {events.map(e => (
          <li key={e.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
            <strong>{e.title}</strong> – {e.date} <br />
            <small>{e.category}</small> <br />
            <div style={{ marginTop: '0.5rem' }}>
              <button onClick={() => router.push(`/events/${e.id}/edit`)}>Editar</button>
              <button onClick={() => handleDelete(e.id)} style={{ marginLeft: '1rem' }}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
        <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>Anterior</button>
        <span>Página {page}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={page * limit >= total}>Siguiente</button>
      </div>
    </main>
  );
}
