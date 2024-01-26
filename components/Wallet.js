import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import activeWallet from '../store/ActiveWallet'
import { useIsFocused } from '@react-navigation/native'

const History = ({ navigation }) => {
    const [wallet, setWallet] = useState({})
    const isFocused = useIsFocused()

    useEffect(() => {
        setWallet(activeWallet.wallet)
        console.log('walllet: ', wallet)
    }, [isFocused])

    return (
        <View>
            <Text>History</Text>
            <Text>History</Text>
            <Text>History</Text>
            <Text>History</Text>
            <Text>
                <Button
                    title='Transfer Fund'
                    onPress={() => navigation.navigate('TransferFund')}
                />
            </Text>
        </View>
    )
}

export default History

const styles = StyleSheet.create({})
