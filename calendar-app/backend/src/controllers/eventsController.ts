import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { readEvents, writeEvents } from '../utils/dataStore';
import { Event } from '../models/Event';

export const getEvents = (req: Request, res: Response): void => {
  let events = readEvents();
  const { search = '', page = '1', limit = '5' } = req.query;

  const filtered = events.filter(e =>
    e.title.toLowerCase().includes((search as string).toLowerCase()) ||
    e.date.includes(search as string)
  );

  const start = (parseInt(page as string) - 1) * parseInt(limit as string);
  const paginated = filtered.slice(start, start + parseInt(limit as string));

  res.json({
    total: filtered.length,
    page: parseInt(page as string),
    events: paginated
  });
};


export const createEvent = (req: Request, res: Response): void => {
  const { title, description, date, category } = req.body;
if (!title) {
  res.status(400).json({ error: 'Title is required' });
  return;
}

  const newEvent: Event = {
    id: uuid(),
    title,
    description,
    date,
    category
  };

  const events = readEvents();
  events.push(newEvent);
  writeEvents(events);
  res.status(201).json(newEvent);
};

export const updateEvent = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { title, description, date, category } = req.body;

  const events = readEvents();
  const index = events.findIndex(e => e.id === id);
  if (index === -1) {
    res.status(404).json({ error: 'Event not found' });
    return;
  }

  events[index] = { id, title, description, date, category };
  writeEvents(events);
  res.json(events[index]);
};

export const deleteEvent = (req: Request, res: Response): void => {
  const { id } = req.params;
  const events = readEvents();
  const filtered = events.filter(e => e.id !== id);

  if (filtered.length === events.length) {
    res.status(404).json({ error: 'Event not found' });
    return;
  }

  writeEvents(filtered);
  res.status(204).send();
};