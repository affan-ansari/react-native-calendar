import { Event } from "@/types/events";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (date: string) => {
    const d = new Date(date);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View style={styles.eventCard}>
      <View style={styles.eventHeader}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
          <Text style={styles.eventTime}>{formatTime(event.date)}</Text>
        </View>
      </View>
      <Text style={styles.eventDescription}>{event.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventHeader: {
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  dateTimeContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    gap: 12,
  },
  eventDate: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  eventTime: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  eventDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});

export default EventCard;
