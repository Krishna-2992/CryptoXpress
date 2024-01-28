import {
    Button,
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import activeWallet from '../store/ActiveWallet'
import currentChain from '../store/CurrentChain'

import { useIsFocused } from '@react-navigation/native'
import { transaction } from 'mobx'

const Wallet = ({ navigation }) => {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        console.log('inside useEffect')
        const fetchBitcoinTransactions = async () => {
            try {
                console.log('inside fetchTransactions')
                const response = await axios.get(
                    `https://rest.cryptoapis.io/blockchain-data/bitcoin/testnet/addresses/${activeWallet.activeWallet.account}/transactions`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-API-Key':
                                '76cbc7b242f9cfc3a7b1f14d8f92c663c8cb878d',
                        },
                    }
                )
                setTransactions(response.data.data.items)
            } catch (error) {
                console.error('Error fetching transactions:', error)
            }
        }
        const fetchPolygonTransactions = async () => {

            console.log('activewallet is 🐶🐶🐶🐶🐶🐶🐶🐶🐶', activeWallet.activeWallet.account)
            let data = JSON.stringify({
                jsonrpc: '2.0',
                id: 0,
                method: 'alchemy_getAssetTransfers',
                params: [
                    {
                        fromBlock: '0x0',
                        fromAddress: activeWallet.activeWallet.account,
                        category: ['external'],
                    },
                ],
            })

            var requestOptions = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                data: data,
            }

            const apiKey = '2sNa9TgLKPsPhrveTuT7JRb9GgZTbboc'
            const baseURL = `https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`
            const axiosURL = `${baseURL}`

            axios(axiosURL, requestOptions)
                .then((response) => {

                    console.log(response.data.result.transfers.reverse())
                    setTransactions(response.data.result.transfers.reverse())
                })
                .catch((error) => console.log(error))
        }

        if (currentChain.chain === 'Bitcoin') {
            fetchBitcoinTransactions()
        } else if (currentChain.chain === 'Polygon') {
            fetchPolygonTransactions()
        }
    }, [])

    function handleTransactionPress(transaction) {
        if(currentChain.chain === "Bitcoin") {
            navigation.navigate('BitcoinTransactionDetails', { transaction })
        } 
        else if(currentChain.chain === "Polygon") {
            navigation.navigate('PolygonTransactionDetails', { transaction })
        }
    }

    function trimWalletAddress() {
        return (
            activeWallet.activeWallet.account.slice(0, 6) +
            '...' +
            activeWallet.activeWallet.account.slice(-4)
        )
    }

    return (
        <View style={styles.walletContainer}>
            <View style={styles.profileContainer}>
                <Image
                    source={require('../assets/profile.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.walletName}>
                    {activeWallet.activeWallet.wallet}
                </Text>
                <Text style={styles.walletAddress}>{trimWalletAddress()}</Text>
                <Text style={styles.currentChain}>
                    Current Chain: {currentChain.chain}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title='Transfer Fund'
                    onPress={() => navigation.navigate('TransferFund')}
                />
            </View>
            <View style={styles.transactionsContainer}>
                <Text style={styles.transactionsTitle}>
                    Transaction History
                </Text>
                <FlatList
                    data={transactions}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.transactionItem}
                            onPress={() => handleTransactionPress(item)}
                        >
                            {currentChain.chain === 'Bitcoin' ? (
                                <View>
                                    <Text style={styles.transactionLabel}>
                                        Time:
                                    </Text>
                                    <Text style={styles.transactionValue}>
                                        {new Date(
                                            item?.timestamp * 1000
                                        ).toLocaleString()}
                                    </Text>
                                </View>
                            ) : currentChain.chain === 'Polygon' ? (
                                <View>
                                    <Text style={styles.transactionLabel}>
                                        BlockNumber:
                                    </Text>
                                    <Text style={styles.transactionValue}>
                                        {item?.blockNum}
                                    </Text>
                                </View>
                            ) : null}
                            {currentChain.chain === 'Bitcoin' ? (
                                <View>
                                    <Text style={styles.transactionLabel}>
                                        Transaction ID:
                                    </Text>
                                    <Text style={styles.transactionValue}>
                                        {item.transactionId}
                                    </Text>
                                </View>
                            ) : currentChain.chain === 'Polygon' ? (
                                <View>
                                    <Text style={styles.transactionLabel}>
                                        Transaction Hash:
                                    </Text>
                                    <Text style={styles.transactionValue}>
                                        {item.hash}
                                    </Text>
                                </View>
                            ) : null}
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.transactionId}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    walletContainer: {
        flex: 1,
        padding: 10,
        marginTop: 100,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    walletName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    walletAddress: {
        fontSize: 16,
        color: 'grey',
    },
    currentChain: {
        fontSize: 16,
        color: 'blue',
    },
    transactionsContainer: {
        flex: 1,
    },
    transactionsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    transactionItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    transactionLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2,
    },
    transactionValue: {
        fontSize: 14,
        color: '#666',
        flexShrink: 1,
    },
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    receiverAddress: {
        fontSize: 16,
    },
    amountSent: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 20,
    },
})

export default Wallet
