import { useDispatch, useSelector } from "react-redux";
import React, {useEffect , useState} from "react";
import { axiosInstance } from "../API";
import {resetTitle, setFines, setTitle} from '../store/fineSlice';
import FineCard from "../components/FineCard";

import axios from "axios";

import { StyleSheet, TextInput, View, RefreshControl, Pressable , ScrollView, Text} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";




export default function FinesScreen({navigation}){
     console.log("Fines list")
     const dispatch = useDispatch();
     const {fines} = useSelector((store)=>store.fine);
     const {title} = useSelector((store)=>store.fine);
     const [input, setInput] = useState("");
     const [clicked, setClicked] = useState(false);
     const [refreshing, setRefreshing] = useState(false);

     useEffect(()=>{
          async function getAllFines(){
               console.log("in use effect, searching for")
               axiosInstance.get("fines/search/?title="+title)
               .then((response)=>{
                    console.log("got data");
                    dispatch(setFines(response?.data.fines))})
               .catch(function(err){
                    console.log("got error", err)
               });
          }
          getAllFines();
     }, [dispatch, title, refreshing]);
     
     const SubmitFunc = ()=>{
          console.log ("SUBMITTED!")
          onRefresh;
          dispatch(setTitle(input))};

     const onRefresh = () => {
          setRefreshing(true);
          setRefreshing(false);
          };


     return (
          <ScrollView style={styles.background} >
          <View style={styles.container}>
               <View
               style={
                    clicked
                    ? styles.searchBar__clicked
                    : styles.searchBar__unclicked
               }
               >
               {/* search Icon */}
               <Feather
                    name="search"
                    size={20}
                    color="black"
                    style={{ marginLeft: 5 }}
               />
               {/* Input field */}
               <TextInput
                    style={styles.input}
                    placeholder="Поиск..."
                    value={input}
                    onChangeText={setInput}
                    onFocus={() => {
                    setClicked(true);
                    }}
               />
               {/* cross Icon, depending on whether the search bar is clicked or not */}
               {clicked && (
                    <Entypo name="cross" size={25} color="black" style={{ padding: 1 , marginLeft: -20 }} onPress={() => {
                         setInput("");
                         dispatch(resetTitle())
                         setRefreshing(true);
                         setRefreshing(false);
                         setClicked(false);
                         // Keyboard.dismiss();
                         
                    }}/>
               )}
               </View>
               {/* cancel button, depending on whether the search bar is clicked or not */}
               {clicked && (
               <View>
                    <Pressable style = {styles.button} title='View details' onPress={SubmitFunc}> 
                         <Text style = {styles.buttonText}>Поиск</Text> 
                    </Pressable>
               </View>
               )}
          </View>



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
     },

     background: {
          backgroundColor: '#2a2a2a'
     },

     button: {
          backgroundColor: '#970000',
          padding: 14.5,
          borderRadius: 15,
          marginLeft: 10,
          width: 85
        },
      
        buttonText: {
          color: 'white',
          textAlign: 'center',
          fontSize: 15,
          fontWeight: 'bold'
        },

     container: {
          margin: 10,
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
          width: "90%",
          
        },
        searchBar__unclicked: {
          padding: 10,
          marginLeft: 10,
          flexDirection: "row",
          width: "100%",
          backgroundColor: "#d9dbda",
          borderRadius: 15,
          alignItems: "center",
        },
        searchBar__clicked: {
          padding: 10,
          flexDirection: "row",
          width: "75%",
          marginLeft: 10,
          backgroundColor: "#d9dbda",
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "space-evenly",
        },
        input: {
          fontSize: 20,
          marginLeft: 20,
          width: "90%",
        },
 });