import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';


export default function RootLayoutNav() {

  return (
      <Stack
        screenOptions={
          {
            headerStyle: {
              backgroundColor: '#EEA217',
            },
            headerTintColor: '#fff',
          }
        }
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: 'My Chats',
            headerRight: () => (
              <Link href={'/(modal)/create'} asChild>
                <TouchableOpacity>
                  <Ionicons name='add' size={32} color="white"/>
                </TouchableOpacity>
              </Link>
            ),
          }}
        />

        <Stack.Screen
          name="(modal)/create"
          options={{
            headerTitle: 'Start a Chat',
            presentation: 'modal',
            headerLeft: () => (
              <Link href={'/'} asChild>
                <TouchableOpacity>
                  <Ionicons name='close-outline' size={32} color="white"/>
                </TouchableOpacity>
              </Link>
            ),
          }}
        />

        <Stack.Screen name="(chat)/[chatid]" options={{ headerTitle: ''}}/>
      </Stack>
  );
}
