import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '../../../utils/api';

export default function EditEvent() {
  const { query, push } = useRouter();
  const id = query.id as string;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (id) {
      api.get(`/events`)
        .then(res => {
          const event = res.data.find((e: any) => e.id === id);
          if (event) {
            setTitle(event.title);
            setDescription(event.description);
            setDate(event.date);
            setCategory(event.category);
          }
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.put(`/events/${id}`, { title, description, date, category });
    push('/events');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Evento</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea value={description} onChange={e => setDescription(e.target.value)} />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <input value={category} onChange={e => setCategory(e.target.value)} />
      <button type="submit">Actualizar</button>
    </form>
  );
}
