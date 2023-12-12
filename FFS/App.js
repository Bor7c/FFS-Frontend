import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShopScreen from './pages/FinesPage/FinesPage';
import DeviceScreen from './pages/FinePage/FinePage';
// import { store } from './store';
// import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        // <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Fines' component={ShopScreen} />
                    <Stack.Screen name='Fine' component={DeviceScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        // </Provider>
    );
}