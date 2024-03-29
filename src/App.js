import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeScreen from './components/HomeScreen';
import ImportScreen from './components/HomeScreen';
import TransferFund from './components/HomeScreen';
import SuccessScreen from './components/HomeScreen';

const Stack = createStackNavigator() ;

const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator >
       <Stack.Screen name = "Home" component = {HomeScreen} options={{headerShown: false}}/>
       <Stack.Screen name = "ImportScreen" component = {ImportScreen} options={{headerShown: false}}/>
       <Stack.Screen name = "TransferFund" component = {TransferFund} options={{headerShown: false}}/>
       <Stack.Screen name = "Success" component = {SuccessScreen} options={{headerShown: false}}/>

    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})