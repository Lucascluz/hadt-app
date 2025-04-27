import { Fab, FabIcon } from '@/components/ui/fab';
import { AddIcon } from '@/components/ui/icon';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
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
        name="lists"
        options={{
          headerShown: false,
          animation: 'shift',
          title: 'Lists',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="list" color={color} />,
        }}
      />

    </Tabs>
  );
}
