import React, { useState, useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import axios from 'axios'
import { TouchableOpacity } from 'react-native-gesture-handler'

import bitcoinWallets from '../store/BitcoinWallets'
import polygonWallets from '../store/PolygonWallets'
import activeWallet from '../store/ActiveWallet'
import currentChain from '../store/CurrentChain'

import { useIsFocused } from '@react-navigation/native'
import Polygon from '../utils/PolygonFunctions'

const HomeScreen = ({ navigation }) => {
    const [wallets, setWallets] = useState([])
    const isFocused = useIsFocused()
    const [text, setText] = useState()

    const [chain, setChain] = useState('Bitcoin')

    useEffect(() => {
        if (currentChain.chain === 'Bitcoin') {
            setWallets(bitcoinWallets.wallets)
        } else if (currentChain.chain === 'Polygon') {
            setWallets(polygonWallets.wallets)
        }
    }, [isFocused, currentChain.chain])

    function handleChainChange(chain) {
        currentChain.setChain(chain)
        setChain(chain)
        console.log('currentChain', chain)
    }

    function trimWalletAddress(account) {
        console.log('account', account)
        return account.slice(0, 6) + '...' + account.slice(-4)
    }

    const handleWalletClick = (wallet) => {
        // const account = calculatePublicKey(wallet.privateKey)
        activeWallet.changeCurrentActiveAccount(
            activeWallet.chain,
            wallet.wallet,
            wallet.account,
            wallet.privateKey
        )
        console.log('active wallet is ', activeWallet.activeWallet)
        navigation.navigate('Wallet')
    }

    return (
        <View style={styles.container}>
            <View style={styles.notch_container}>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => handleChainChange('Bitcoin')}
                >
                    <Text
                        style={[
                            styles.indicatorText,
                            chain === 'Bitcoin'
                                ? styles.selectedChain
                                : styles.unselectedChain,
                        ]}
                    >
                        Bitcoin
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => handleChainChange('Polygon')}
                >
                    <Text
                        style={[
                            styles.indicatorText,
                            chain === 'Polygon'
                                ? styles.selectedChain
                                : styles.unselectedChain,
                        ]}
                    >
                        Polygon
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container2}>
                <Button
                    title='Import'
                    onPress={() => {
                        navigation.navigate('ImportScreen')
                        console.log('Import clicked')
                    }}
                />
            </View>
            {currentChain.chain === 'Bitcoin' && (
                <View style={styles.horizontalElement}>
                    <Text style={styles.horizontalText}>Bitcoin</Text>
                    <Text style={styles.horizontalPrice}>$2500</Text>
                </View>
            )}
            <View style={styles.horizontalElement}>
                <Text style={styles.horizontalText}>USDT</Text>
                <Text style={styles.horizontalPrice}>$1.5</Text>
            </View>

            <Text>{text}</Text>

            <View style={styles.horizontalLine}></View>

            {/* users from ImportScreen */}
            <View style={styles.walletContainer}>
                {wallets.map((wallet, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            handleWalletClick(wallet)
                        }}
                        style={styles.walletItem}
                    >
                        <Text>{wallet.wallet}</Text>
                        <Text>{trimWalletAddress(wallet.account)}</Text>
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
    notch_container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        elevation: 2,
        marginTop: 50,
        height: 100,
    },
    indicatorText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    selectedChain: {
        color: 'black',
        textDecorationLine: 'underline',
    },
    unselectedChain: {
        color: 'grey',
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
    horizontalElement: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    horizontalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    horizontalPrice: {
        fontSize: 16,
        color: '#333',
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
