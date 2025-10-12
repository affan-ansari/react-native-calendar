import AppButton from "@/components/AppButton";
import { useEvents } from "@/contexts/EventsContext";
import { Event } from "@/types/events";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const pad = (n: number) => String(n).padStart(2, "0");
const fmtISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

const fmtHM = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

export default function EventFormScreen() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [description, setDescription] = useState("");
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { addEvent, updateEvent, getEvent } = useEvents();

  const isEditMode = !!id;
  const existingEvent = id ? getEvent(id) : undefined;
  useEffect(() => {
    if (isEditMode && existingEvent) {
      setTitle(existingEvent.title);
      setDate(new Date(existingEvent.date));
      setDescription(existingEvent.description);
    }
  }, [isEditMode, existingEvent]);

  const isDisabled = !title || !date || !description;

  const dateDisplay = useMemo(() => (date ? fmtISO(date) : ""), [date]);
  const timeDisplay = useMemo(() => (date ? fmtHM(date) : ""), [date]);

  const onChange = (_e: DateTimePickerEvent, selected?: Date) => {
    if (selected) setDate(selected);
  };
  const onChangeTime = (e: DateTimePickerEvent, selected?: Date) => {
    if (e.type === "set" && selected) {
      const base = new Date(date ?? new Date());
      base.setHours(selected.getHours(), selected.getMinutes(), 0, 0);
      setDate(base);
    }
  };

  const openDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date ?? new Date(),
      onChange,
      mode: "date",
      is24Hour: true,
    });
  };
  const openTimePicker = () => {
    DateTimePickerAndroid.open({
      value: date ?? new Date(),
      onChange: onChangeTime,
      mode: "time",
    });
  };

  const handleSubmit = () => {
    if (!title || !date || !description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const eventData: Event = {
      id: isEditMode && id ? id : Date.now().toString(),
      title,
      date: date.toISOString(),
      description,
    };

    if (isEditMode && id) {
      updateEvent(id, eventData);
      Alert.alert("Success", "Event updated successfully");
    } else {
      addEvent(eventData);
      Alert.alert("Success", "Event created successfully");
    }

    router.back();
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <Text style={styles.label}>Event Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter event title"
            placeholderTextColor="#999"
            returnKeyType="next"
          />

          <Text style={styles.label}>Date</Text>
          <Pressable onPress={openDatePicker}>
            <View pointerEvents="none">
              <TextInput
                style={styles.input}
                value={dateDisplay}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#999"
                editable={false}
              />
            </View>
          </Pressable>
          <Text style={styles.label}>Time</Text>
          <Pressable onPress={openTimePicker}>
            <View pointerEvents="none">
              <TextInput
                style={styles.input}
                value={timeDisplay}
                placeholder="HH:mm"
                placeholderTextColor="#999"
                editable={false}
              />
            </View>
          </Pressable>

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter event description"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <View style={styles.buttonContainer}>
            <AppButton
              title={isEditMode ? "Update Event" : "Create Event"}
              disabled={isDisabled}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  buttonContainer: {
    marginTop: 24,
  },
});
