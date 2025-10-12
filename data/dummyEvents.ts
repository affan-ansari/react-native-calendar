import { Event } from "@/types/events";

// Dummy Data
export const dummyEvents: Event[] = [
  {
    id: '1',
    title: 'Team Meeting',
    date: (new Date(2025, 9, 12, 10, 0)).toString(),
    description: 'Monthly team sync to discuss project progress and upcoming milestones.'
  },
  {
    id: '2',
    title: 'Product Launch',
    date: (new Date(2025, 9, 15, 14, 30)).toString(),
    description: 'Official launch event for our new product line. All hands on deck!'
  },
  {
    id: '3',
    title: 'Client Presentation',
    date: (new Date(2025, 9, 18, 9, 0)).toString(),
    description: 'Quarterly review presentation with key stakeholders.'
  },
  {
    id: '4',
    title: 'Workshop: React Native',
    date: (new Date(2025, 9, 20, 15, 0)).toString(),
    description: 'Internal training session on advanced React Native patterns and best practices.'
  },
  {
    id: '5',
    title: 'Networking Event',
    date: (new Date(2025, 9, 25, 18, 30)).toString(),
    description: 'Industry networking mixer at the downtown convention center.'
  }
];