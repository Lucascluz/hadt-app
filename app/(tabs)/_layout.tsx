import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#000', tabBarInactiveTintColor: '#888' }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          animation: 'shift',
          title: 'Dash',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="rocket" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          headerShown: false,
          animation: 'shift',
          title: 'Tasks',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="check" color={color} />,
        }}
      />

    </Tabs>
  );
}
