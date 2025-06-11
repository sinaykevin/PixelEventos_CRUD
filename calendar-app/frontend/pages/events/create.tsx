import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

export default function CreateEventPage() {
  const { token } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    category: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/events', form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    router.push('/events');
  };

  return (
    <main style={{ maxWidth: '600px', margin: '4rem auto' }}>
      <h2>Crear Evento</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="title" placeholder="Título" value={form.title} onChange={handleChange} required />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="category" placeholder="Categoría" value={form.category} onChange={handleChange} />
        <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} />
        <button type="submit">Guardar</button>
      </form>
    </main>
  );
}
