import AppButton from "@/components/AppButton";
import EventCard from "@/components/EventCard";
import { useEvents } from "@/contexts/EventsContext";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ListViewScreen() {
  const { events, isLoading } = useEvents();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading events...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.btnConainer}>
        <AppButton
          title="Event Type Filter"
          onPress={() => console.log("testing")}
        />
        <AppButton
          title="Create Event"
          onPress={() => router.push("/forms/event-form")}
        />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {events.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No events yet</Text>
            <Text style={styles.emptySubtext}>
              Create your first event to get started
            </Text>
          </View>
        ) : (
          events.map((event) => <EventCard key={event.id} event={event} />)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  btnConainer: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  scrollContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
  },
});
