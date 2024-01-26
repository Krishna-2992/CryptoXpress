import React, { useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
import bitcoinWallets from '../store/BitcoinWallets'

import currentChain from '../store/CurrentChain'

// import { Bitcoin_calculatePublicKey } from '../utils/BitcoinFunctions'
import Polygon from '../utils/PolygonFunctions'

const ImportScreen = ({ navigation }) => {
    const [walletName, setWalletName] = useState('')
    const [privateKey, setPrivateKey] = useState('')

    function checkPrivateKey(privateKey) {
        if (privateKey.length === 64) {
            return true
        } else return false
    }

    function calculatePublicKey(privateKey) {
        if (currentChain.chain === 'Bitcoin') {
            // return Bitcoin_calculatePublicKey(privateKey)
            console.log('implementation for bitcoin not yet added')
        } else if (currentChain.chain === 'Polygon') {
            console.log(Polygon.calculatePublicKey)
            return Polygon.calculatePublicKey(privateKey)
        } 
    }

    const handleImport = () => {
        console.log('Import button pressed')
        const account = calculatePublicKey(privateKey)
        if (!checkPrivateKey(privateKey)) {
          alert('Invalid private key');
          return;
        }
        if(currentChain.chain === 'Bitcoin') {
            bitcoinWallets.addBitcoinWallet(walletName, privateKey, account)
        } else if(currentChain.chain === 'Polygon') {
            polygonWallets.addPolygonWallet(walletName, privateKey, account)
        }
        console.log('Wallet added successfully')
        navigation.goBack()
    }

    const handleCancel = () => {
        // Logic for canceling import
        console.log('Cancel button pressed')
    }

    return (
        <View style={styles.container}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
