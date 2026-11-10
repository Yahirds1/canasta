import { Tabs } from 'expo-router';

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#328264',
        tabBarStyle: { backgroundColor: '#F5F4EE' },
      }}>
      <Tabs.Screen name="index" options={{ title: 'Rescate' }} />
      <Tabs.Screen name="explore" options={{ title: 'Reloj' }} />
    </Tabs>
  );
}
