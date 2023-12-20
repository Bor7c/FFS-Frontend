import {View, Text,StyleSheet, Image, ImageBackground ,Button,  Pressable , Card, CardCover , CardContent} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

export default function FineCard({navigation,...fine}){
     console.log("Fine Card")

     const handlePress = () => {
          navigation.navigate('Штраф', { id: fine.id });
          console.log ("fine id from handlePress in Operation card", fine.if)
      };

     return (
      
          <View style= {styles.card}>
            <ImageBackground style= {styles.image} source={{ uri: fine.image }}>
            <View style= {styles.back}>
              <Text style= {styles.price}>{fine.price}₽</Text>
              <Text style= {styles.title}>{fine.title}</Text>
                <Pressable style = {styles.button} title='View details' onPress={handlePress}> 
                  <Text style = {styles.buttonText}>Подробнее</Text> 
                </Pressable>
              </View>    
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

  back: {
    backgroundColor: '#00000093',
    width: 326,
    height: 426,
    position: 'relative',
    top: -27,
    left: -3,
    gap: 12,
    borderRadius: 12,
    
    
  },

  image: { 
    height: 320,
    width: 320,
    resizeMode: 'contain',

  },

  container: { 
    display: 'flex', 
    width: '100%', 
    margin: 8,
  },

  row: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },

  title: { 
    color: '#e6e6e6',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 100,
  },

  price: { 
    color: '#b3b3b3', 
    fontSize: 25,
    fontWeight: 'bold',
    
    marginLeft: 10,
  },

  button: {
    backgroundColor: '#970000',
    padding: 10,
    borderRadius: 7,
    margin: 80,
    marginTop: 100,
    
  },

  buttonText: {
    color: 'white',
    textAlign: 'center',
  },


});