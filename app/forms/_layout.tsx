import { Stack } from "expo-router";

export default function FormsLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: "modal",
      }}
    >
      <Stack.Screen name="create-event" options={{ title: "Create Event" }} />
    </Stack>
  );
}
