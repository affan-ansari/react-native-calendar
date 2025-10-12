import AppButton from "@/components/AppButton";
import { BottomSheetModal } from "@/components/BottomSheetModal";
import { CreateEventForm } from "@/components/CreateEventForm";
import EventCard from "@/components/EventCard";
import { dummyEvents } from "@/data/dummyEvents";
import { Event } from "@/types/events";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function ListViewScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [events, setEvents] = useState(dummyEvents);

  const handleCreateEvent = (eventData: Event) => {
    // Here you would normally process the date/time and create a proper Date object
    // For now, we'll just log it
    console.log("New event created:", eventData);

    // You can add the new event to your events list
    const newEvent = {
      id: Date.now().toString(),
      title: eventData.title,
      date: new Date().toString(), // You'd parse eventData.date and eventData.time here
      description: eventData.description,
    };

    setEvents([newEvent, ...events]);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnConainer}>
        <AppButton
          title="Event Type Filter"
          onPress={() => console.log("testing")}
        />
        <AppButton
          title="Create Event"
          onPress={() => setIsModalVisible(true)}
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
      {/* Create Event Modal */}
      <BottomSheetModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Create New Event"
      >
        <CreateEventForm
          onSubmit={handleCreateEvent}
          onCancel={() => setIsModalVisible(false)}
        />
      </BottomSheetModal>
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
