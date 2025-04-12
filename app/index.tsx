import { Link } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background justify-center items-center">
      <Text className="text-3xl font-bold">Hello, world!</Text>
      <Link href="/(tabs)/dash">Go to Dash</Link>
      <Link href="/(tabs)/lists">Go to Lists</Link>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
