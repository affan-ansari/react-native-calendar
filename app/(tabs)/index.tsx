import AppButton from "@/components/AppButton";
import EventCard from "@/components/EventCard";
import { useEvents } from "@/contexts/EventsContext";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function ListViewScreen() {
  const { events } = useEvents();

  return (
    <View style={styles.container}>
      <View style={styles.btnConainer}>
        <AppButton
          title="Event Type Filter"
          onPress={() => console.log("testing")}
        />
        <AppButton
          title="Create Event"
          onPress={() => router.push("/forms/create-event")}
        />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
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
  header: {
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  scrollView: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  scrollContent: {
    padding: 16,
  },
});
