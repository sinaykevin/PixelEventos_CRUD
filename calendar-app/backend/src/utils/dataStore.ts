import fs from 'fs';
import path from 'path';
import { Event } from '../models/Event';

const FILE_PATH = path.join(__dirname, '../../data/events.json');

export const readEvents = (): Event[] => {
  if (!fs.existsSync(FILE_PATH)) {
    fs.mkdirSync(path.dirname(FILE_PATH), { recursive: true });
    fs.writeFileSync(FILE_PATH, '[]');
  }

  const data = fs.readFileSync(FILE_PATH, 'utf-8');
  return JSON.parse(data);
};

export const writeEvents = (events: Event[]) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(events, null, 2));
};
