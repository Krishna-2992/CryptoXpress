import React, { useState } from 'react'
import { View, TextInput, Text, Button, StyleSheet, ActivityIndicator } from 'react-native'
import axios from 'axios'

import bitcoinWallets from '../store/BitcoinWallets'
import polygonWallets from '../store/PolygonWallets'

import currentChain from '../store/CurrentChain'

// import { Bitcoin_calculatePublicKey } from '../utils/BitcoinFunctions'
import Bitcoin from '../utils/BitcoinFunctions'
import Polygon from '../utils/PolygonFunctions'

const SERVER_URL = 'https://cryptoxpress-back.onrender.com'

const ImportScreen = ({ navigation }) => {
    const [walletName, setWalletName] = useState('')
    const [privateKey, setPrivateKey] = useState('')
    const [loading, setLoading] = useState(false)

    function checkPrivateKey(privateKey) {
        console.log(currentChain.chain, privateKey.length)
        if (currentChain.chain === "Bitcoin" && privateKey.length === 52) {
            return true
        } else if(currentChain.chain === "Polygon" && privateKey.length === 64) {
            return true
        }
        else return false
    }

    async function calculatePublicKey(privateKey) {
        if (currentChain.chain === 'Bitcoin') {
            const response = await axios.get(`${SERVER_URL}/calculatePublicKey?privateKey=${privateKey}`)
            return response.data
        } else if (currentChain.chain === 'Polygon') {
            return Polygon.calculatePublicKey(privateKey)
        } 
    }

    const handleImport = async () => {
        console.log('Import button pressed')
        if (!checkPrivateKey(privateKey)) {
          alert(`Invalid private key for ${currentChain.chain} network`);
          return;
        }
        setLoading(true)
        const account = await calculatePublicKey(privateKey)
        if(currentChain.chain === 'Bitcoin') {
            bitcoinWallets.addBitcoinWallet(walletName, privateKey, account)
        } else if(currentChain.chain === 'Polygon') {
            polygonWallets.addPolygonWallet(walletName, privateKey, account)
        }
        console.log('Wallet added successfully')
        navigation.goBack()
    }

    const handleCancel = () => {
        console.log('Cancel button pressed')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Import Your {currentChain.chain} Wallet</Text>
            <TextInput
                style={styles.input}
                placeholder='Wallet'
                value={walletName}
                onChangeText={setWalletName}
            />
            <TextInput
                style={styles.input}
                placeholder='Private Key'
                value={privateKey}
                onChangeText={setPrivateKey}
            />
            <View style={styles.buttonContainer}>
                <Button title='Import' onPress={handleImport} />
                <Button
                    title='Cancel'
                    onPress={() => {
                        navigation.navigate('Home')
                    }}
                />
            </View>
            { loading && <ActivityIndicator size="large" color="#0000ff" /> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginBottom: 10,
        alignSelf: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
})

export default ImportScreen
