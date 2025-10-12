import { Stack } from "expo-router";

export default function FormsLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name="event-form"
        options={{
          title: "Event Form",
        }}
      />
    </Stack>
  );
}
