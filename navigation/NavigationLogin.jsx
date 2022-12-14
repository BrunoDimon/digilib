import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../screens/LoginScreen';
import { ViewBooksScreen } from '../screens/ViewBooksScreen';

const Stack = createNativeStackNavigator();

export function NavigationLogin() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen options = {{headerShown: true}} name="Visualização de Livros" component={ViewBooksScreen} />
        </Stack.Navigator>
    );
};
