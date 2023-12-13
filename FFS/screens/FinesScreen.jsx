

import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, {useEffect} from "react";
import { axiosInstance } from "../API";
import {setFines} from '../store/fineSlice';
import FineCard from "../components/FineCard";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import axios from "axios";




export default function FinesScreen({navigation}){
     console.log("Fines list")
     const dispatch = useDispatch();
     const {fines} = useSelector((store)=>store.fine);

     useEffect(() => {
          async function getAllFines() {
            try {
              console.log("in use effect");
              response = axios.get(`http://127.0.0.1:8000/fines/search`);
              console.log("got data");
              dispatch(setFines(response?.fines));
            } catch (err) {
              console.log(err);
            }
          }
          getAllFines();
        }, [dispatch]);



     return (
          <ScrollView>
          <View style= {styles.page}>
               {!!fines && fines.map((fine)=><FineCard key = {fine.id} {...fine} navigation = {navigation}></FineCard>)}
          </View>
          </ScrollView>
          
     )
}

const styles = StyleSheet.create({
     page: {
         display: 'flex',
         width: '100%',
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: '#2a2a2a',
     },
 });