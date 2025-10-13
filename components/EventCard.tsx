import { useEvents } from "@/contexts/EventsContext";
import { Event } from "@/types/events";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { deleteEvent } = useEvents();
  const [imageModalVisible, setImageModalVisible] = useState(false);

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

  const handleEdit = () => {
    router.push({
      pathname: "/forms/event-form",
      params: { id: event.id },
    });
  };

  const handleDelete = () => {
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteEvent(event.id);
          Alert.alert("Success", "Event deleted successfully");
        },
      },
    ]);
  };

  const handleImagePress = () => {
    setImageModalVisible(true);
  };

  return (
    <>
      <View style={styles.eventCard}>
        <View style={styles.cardHeader}>
          <View style={styles.eventHeader}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.eventDate}>{formatDate(event.date)}</Text>
              <Text style={styles.eventTime}>{formatTime(event.date)}</Text>
            </View>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={handleEdit}
              style={styles.iconButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="pencil" size={20} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.iconButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="trash-outline" size={20} color="#FF3B30" />
            </TouchableOpacity>
          </View>
        </View>

        {event.imageUri && (
          <TouchableOpacity
            onPress={handleImagePress}
            activeOpacity={0.9}
            style={styles.imageContainer}
          >
            <Image
              source={{ uri: event.imageUri }}
              style={styles.eventImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay}>
              <Ionicons name="expand-outline" size={24} color="#fff" />
            </View>
          </TouchableOpacity>
        )}

        <Text style={styles.eventDescription}>{event.description}</Text>
      </View>

      {/* Full Screen Image Modal */}
      <Modal
        visible={imageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setImageModalVisible(false)}
          />
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setImageModalVisible(false)}
            >
              <Ionicons name="close" size={30} color="#fff" />
            </TouchableOpacity>
            {event.imageUri && (
              <Image
                source={{ uri: event.imageUri }}
                style={styles.fullScreenImage}
                resizeMode="contain"
              />
            )}
          </View>
        </View>
      </Modal>
    </>
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
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  eventHeader: {
    flex: 1,
    marginRight: 12,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  imageContainer: {
    position: "relative",
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
  },
  eventImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  imageOverlay: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    padding: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 25,
    padding: 10,
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
  },
});

export default EventCard;
