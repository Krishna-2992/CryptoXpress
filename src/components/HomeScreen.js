import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
//  import { useHistory } from 'react-router-dom';
import TopIndicator from '../page/notch'
import { useIsFocused } from '@react-navigation/native'
// import bitcoinWallets from '../store/BitcoinWallets'

const HomeScreen = ({ navigation }) => {
    const isFocused = useIsFocused()
    const wallets = ['Wallet 1', 'Wallet 2', 'Wallet 3'] // Replace with actual wallet data

    // useEffect(() => {
    //     const allWallets = bitcoinWallets.wallets
    //     console.log(allWallets)
    // }, [isFocused])

    const handleWalletClick = (wallet) => {
        // Logic to redirect to show history page of the selected wallet
        history.push(`/history/${wallet}`)
    }

    return (
        <View style={styles.container}>
            {/* Existing code ... */}
            <TopIndicator />
            <View style={styles.container2}>
                <Button
                    title='Import'
                    onPress={() => navigation.navigate('ImportScreen')}
                />
                <Button
                    title='Transfer Fund'
                    onPress={() => navigation.navigate('TransferFund')}
                />
            </View>

            {/* Horizontal Line */}
            <View style={styles.horizontalLine}></View>

            {/* users from ImportScreen */}
            <View style={styles.walletContainer}>
                {wallets.map((wallet, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleWalletClick(wallet)}
                        style={styles.walletItem}
                    >
                        <Text>{wallet}</Text>
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
    walletContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    walletItem: {
        marginBottom: 10,
    },
})
