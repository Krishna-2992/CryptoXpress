import React, { useState, useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
//  import { useHistory } from 'react-router-dom';
import TopIndicator from '../utils/notch'
import bitcoinWallets from '../store/BitcoinWallets'
import { useIsFocused } from '@react-navigation/native'

const HomeScreen = ({ navigation }) => {
    const [wallets, setWallets] = useState([])
    const isFocused = useIsFocused()
    useEffect(() => {
        setWallets(bitcoinWallets.wallets)
    }, [isFocused])

    const handleWalletClick = (wallet) => {
        // make the specific wallet active and navigate

        const account = getAccountAddress(wallet.privateKey)
        activeWallet.changeCurrentActiveAccount(
            wallet.chain,
            wallet.wallet,
            wallet.account,
            wallet.privateKey
        )

        // navigate to the Wallet screen
        navigation.navigate('Wallet')
    }

    return (
        <View style={styles.container}>
            {/* Existing code ... */}
            <TopIndicator />
            <View style={styles.container2}>
                <Button
                    title='Import'
                    onPress={() => {
                        navigation.navigate('ImportScreen')
                        console.log('Import clicked')
                    }}
                />
            </View>

            {/* Horizontal Line */}
            <View style={styles.horizontalLine}></View>

            {/* users from ImportScreen */}
            <View style={styles.walletContainer}>
                {wallets.map((wallet, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={handleWalletClick(wallet)}
                        style={styles.walletItem}
                    >
                        <Text>{wallet.wallet}</Text>
                        <Text>{wallet.privateKey}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    // Existing styles ...
    container: {
        flex: 1,
        marginTop: 25,
    },
    container1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    txt: {
        fontSize: 20,
        backgroundColor: 'white',
        margin: 10,
        opacity: 0.5,
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignContent: 'center',
        margin: 50,
    },
    horizontalLine: {
        width: '100%',
        height: 1,
        backgroundColor: 'grey',
    },
    walletItem: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 30,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
})
