import { View, Text, Button } from 'react-native';
import React from 'react';

export default function ShopScreen({ navigation }) {
    return (
        <View>
            <Text>ShopScreen</Text>
            <Button title='Go to device screen' onPress={() => navigation.navigate('Device')} />
        </View>
    );
}