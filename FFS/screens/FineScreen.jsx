import {View, Text, StyleSheet, Image, ImageBackground ,Button,  Pressable , Card}  from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { resetDevice, resetFine, setDevice, setFine } from '../store/fineSlice';
import { axiosInstance } from '../API';

export default function FineScreen({ route }) {
    const { id } = route.params;
    const dispatch = useDispatch();
    const { fine } = useSelector((store) => store.fine);
    useEffect(() => {
        async function getOneFine() {
            await axiosInstance.get(`/fines/${id}`).then((response) => dispatch(setFine(response?.data)));
            
        }
        getOneFine();
        return () => {
            dispatch(resetFine());
        };
    }, [dispatch]);
    return (
        <View style={styles.container}>
        <View style={styles.circleImage}>
          <Image source={{ uri: fine.image }} style={styles.image} />
        </View>
        <Text style={styles.shortText}>{fine.title}</Text>
        <View style={styles.line} />
        <View style={styles.container}>
          <Text style={styles.info}>{fine.text}</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    circleImage: {
      width: 150,
      height: 150,
      borderRadius: 75,
      overflow: 'hidden',
      margin: 10,
    },
    image: {
      flex: 1,
      width: undefined,
      height: undefined,
    },
    shortText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    line: {
      width: '80%',
      height: 1,
      backgroundColor: 'black',
      marginVertical: 10,
    },
    info: {
      textAlign: 'center',
      marginTop: -300
    },
  });