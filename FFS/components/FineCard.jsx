import {View, Text,StyleSheet, Image, ImageBackground ,Button,  Pressable , Card} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function FineCard({navigation,...fine}){
     console.log("Fine Card")

     const handlePress = () => {
          navigation.navigate('Fine', { id: fine.id });
          console.log ("fine id from handlePress in Operation card", fine.if)
      };

     return (
  
          <View style= {styles.card}>
            <ImageBackground style= {styles.image} source={{ uri: fine.image }}>
              <Text style= {styles.price}>{fine.price}₽</Text>
              <Text style= {styles.title}>{fine.title}</Text>
                <Pressable style = {styles.button} title='View details' onPress={handlePress}> 
                  <Text style = {styles.buttonText}>Подробнее</Text> 
                </Pressable>
            </ImageBackground>
            </View>


      
     );
}

const styles = StyleSheet.create({
  card: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column',
      width: 320,
      height: 420,
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 24,
      gap: 12,
      margin: 8,
  },

  image: { 
    height: 320,
    width: 320,
    borderRadius: 100,
    resizeMode: 'contain',
  },


  container: { 
    display: 'flex', 
    width: '100%', 
    margin: 8 
  },

  row: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },

  title: { 
    color: '#00000093',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
  },

  price: { 
    color: '#00000093', 
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: -20,
    marginLeft: 10,
  },

  button: {
    backgroundColor: '#970000',
    padding: 10,
    borderRadius: 5,
    margin: 70,
    marginTop: 100,
    
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});