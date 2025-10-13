// import { dummyEvents } from "@/data/dummyEvents";
import { Event } from "@/types/events";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface EventsContextType {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, event: Event) => void;
  deleteEvent: (id: string) => void;
  getEvent: (id: string) => Event | undefined;
  isLoading: boolean;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

const STORAGE_KEY = "@events_storage";

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load events from storage on mount
  useEffect(() => {
    loadEvents();
  }, []);

  // Save events to storage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveEvents(events);
    }
  }, [events, isLoading]);

  const loadEvents = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedEvents !== null) {
        setEvents(JSON.parse(storedEvents));
      }
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveEvents = async (eventsToSave: Event[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(eventsToSave));
    } catch (error) {
      console.error("Error saving events:", error);
    }
  };

  const addEvent = (event: Event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const updateEvent = (id: string, updatedEvent: Event) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === id ? updatedEvent : event))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const getEvent = (id: string) => {
    return events.find((event) => event.id === id);
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        getEvent,
        isLoading,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
}
