import 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeScreen from './components/HomeScreen'
import ImportScreen from './components/ImportScreen'
import TransferFund from './components/TransferFund'
import SuccessScreen from './components/Success'
import Wallet from './components/Wallet'
import BitcoinTransactionDetails from './components/BitcoinTransactionDetails'
import PolygonTransactionDetails from './components/PolygonTransactionDetails'

const Stack = createStackNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen
                    name='Home'
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='ImportScreen'
                    component={ImportScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='TransferFund'
                    component={TransferFund}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Success'
                    component={SuccessScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Wallet'
                    component={Wallet}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='BitcoinTransactionDetails'
                    component={BitcoinTransactionDetails}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='PolygonTransactionDetails'
                    component={PolygonTransactionDetails}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App

const styles = StyleSheet.create({})
