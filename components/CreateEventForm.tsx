import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import AppButton from "./AppButton";

interface CreateEventFormProps {
  onSubmit: (event: {
    title: string;
    date: string;
    time: string;
    description: string;
  }) => void;
  onCancel: () => void;
}

export const CreateEventForm: React.FC<CreateEventFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !date.trim() || !time.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    onSubmit({
      title,
      date,
      time,
      description,
    });

    // Reset form
    setTitle("");
    setDate("");
    setTime("");
    setDescription("");
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Event Title */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Event Title <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter event title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#999"
          />
        </View>

        {/* Event Date */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Date <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="MM/DD/YYYY"
            value={date}
            onChangeText={setDate}
            placeholderTextColor="#999"
          />
        </View>

        {/* Event Time */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Time <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="HH:MM AM/PM"
            value={time}
            onChangeText={setTime}
            placeholderTextColor="#999"
          />
        </View>

        {/* Event Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter event description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />
        </View>

        {/* Add more fields for testing if needed */}
      </ScrollView>

      {/* Fixed Action Buttons at Bottom */}
      <View style={styles.buttonContainer}>
        <AppButton
          title="Cancel"
          variant="outline"
          onPress={onCancel}
          style={styles.button}
        />
        <AppButton
          title="Create Event"
          variant="primary"
          onPress={handleSubmit}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  required: {
    color: "#FF3B30",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  button: {
    flex: 1,
  },
});
