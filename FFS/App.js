import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FinesScreen from './screens/FinesScreen';

import { store } from './store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Fines for Scooters' component={FinesScreen} />
                    {/* <Stack.Screen name='Device' component={DeviceScreen} /> */}
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}