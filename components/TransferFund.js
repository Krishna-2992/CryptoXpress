import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
} from 'react-native'

import currentChain from '../store/CurrentChain'
import activeWallet from '../store/ActiveWallet'

const TransferFund = ({ navigation }) => {
    const [receiverAddress, setReceiverAddress] = useState('')
    const [amount, setAmount] = useState('')
    const [userBalance, setUserBalance] = useState(0)

    useEffect(() => {
        const fetchBalances = async () => {
            console.log('👍')
            if (currentChain.chain === 'Bitcoin') {
                console.log('👍👍')
                await fetchBitcoinBalance()
            } else if (currentChain.chain === 'Polygon') {
                await fetchPolygonBalance()
            }
        }
        fetchBalances()
    }, [])

    const fetchPolygonBalance = async () => {
        const provider = new ethers.providers.JsonRpcProvider(
            'https://polygon-mumbai.g.alchemy.com/v2/2sNa9TgLKPsPhrveTuT7JRb9GgZTbboc'
        )
        const address = activeWallet.activeWallet.account
        const balance = await provider.getBalance(address)
        setUserBalance(ethers.utils.formatEther(balance))
    }

    const fetchBitcoinBalance = async () => {
        console.log('👍👍👍')
        console.log(activeWallet.activeWallet.account)
        const response = await axios({
            baseURL: `https://rest.cryptoapis.io/blockchain-data/bitcoin/testnet/addresses/${activeWallet.activeWallet.account}/transactions`,
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': '76cbc7b242f9cfc3a7b1f14d8f92c663c8cb878d',
            },
        })

        let totalAmountAvailable = 0
        let utxos = response.data.data.items

        for (const element of utxos) {
            totalAmountAvailable += Math.floor(
                parseFloat(element.blockchainSpecific.vout[0].value) * 100000000
            )
        }
        setUserBalance(totalAmountAvailable / 10 ** 8)
    }

    function trimWalletAddress() {
        return (
            activeWallet.activeWallet.account.slice(0, 6) +
            '...' +
            activeWallet.activeWallet.account.slice(-4)
        )
    }

    async function transferBitcoins() {
        // Logic for sending bitcoins
        console.log(`Sending ${amount} bitcoins to ${receiverAddress}`)
    }


    async function transferPolygon() {
        try {
            console.log(`Sending ${amount} polygon to ${receiverAddress}`)

        const privateKey = activeWallet.activeWallet.privateKey
        const address = activeWallet.activeWallet.account

        const provider = new ethers.providers.JsonRpcProvider(
            'https://polygon-mumbai.g.alchemy.com/v2/2sNa9TgLKPsPhrveTuT7JRb9GgZTbboc'
        )
        const signer = new ethers.Wallet(privateKey, provider)


        if(amount > userBalance) {alert("insufficient funds"); return}

        const tx = await signer.sendTransaction({
            to: receiverAddress,
            value: ethers.utils.parseEther(amount)
        });
        await tx.wait();

        const transactionId = tx.hash;
        console.log(`Transaction ID: ${transactionId}`);
        console.log('polygon trasaction complete')
        navigation.navigate('Success', { transactionId })
        } catch (error) {
            console.log(error)
            alert('Something went wrong!! transaction failed')
        }
        
    }

    const handleSend = async () => {
        // Logic for sending funds
        if (currentChain.chain === 'Bitcoin') {
            await transferBitcoins()
        } else if (currentChain.chain === 'Polygon') {
            await transferPolygon()
        }
        console.log(`Sending ${amount} to ${receiverAddress}`)
    }

    return (
        <View style={{ marginTop: 100 }}>
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
                <Text style={styles.currentChain}>
                    Wallet Balance: {userBalance}
                </Text>
            </View>
            <View style={styles.container}>
                <View style={styles.bottomContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Receiver Address'
                        value={receiverAddress}
                        onChangeText={setReceiverAddress}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Amount'
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType='numeric'
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSend}
                    >
                        <Text
                            style={styles.buttonText}
                        >
                            Send
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
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
    bottomContainer: {
        width: '80%',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 16,
        paddingHorizontal: 10,
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
    button: {
        backgroundColor: 'blue',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        height: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default TransferFund
