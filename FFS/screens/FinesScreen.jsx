

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

     useEffect(()=>{
          async function getAllOperaitons(){
               console.log("in use effect, searching for")
               axios.get("http://192.168.51.1:8000/fines/search")
               .then((response)=>{
                    console.log("got data");
                    dispatch(setFines(response?.data.fines))})
               .catch(function(err){
                    console.log("got error", err)
               });
          }
          getAllOperaitons();
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