import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigation from './src/navigation/RootNavigation';

// Reactotron configuration for development
if (__DEV__) {
  require("./ReactotronConfig");
}

export default function App() {
  return (
    <SafeAreaProvider>
        <RootNavigation />
    </SafeAreaProvider>
  );
}