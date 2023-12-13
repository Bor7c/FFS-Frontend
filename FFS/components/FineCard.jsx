import {View, Text,StyleSheet, Image, Button,  Pressable } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function FineCard({navigation,...fine}){
     console.log("Fine Card")

     const handlePress = () => {
          navigation.navigate('Fine', { id: props.pk });
          console.log ("fine id from handlePress in Operation card",props.pk)
      };

     return (

        <Card>
        <Card.Image source={{ uri: fine.image }}>
          <Text>{fine.price}₽</Text>
          <Text>{fine.title}</Text>
          <Button
            title="Подробнее"
            onPress={() => navigation.navigate('Fine', { id: fine.id })}
          />
        </Card.Image>
      </Card>
      
     );
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        width: 320,
        backgroundColor: '#303030',
        borderRadius: 12,
        padding: 24,
        gap: 12,
        margin: 8,
    },
    image: { height: 320, alignSelf: 'stretch' },
    container: { display: 'flex', width: '100%', margin: 8 },
    row: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between' },
    brandTitle: { color: '#4287f5', fontSize: 16 },
    text: { color: '#f0f0f0', fontSize: 16 },
});