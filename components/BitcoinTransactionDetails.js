import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native'

const BitcoinTransactionDetails = ({ route }) => {
    const { transaction } = route.params

    console.log('transaction', transaction)

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/transaction.png')}
                style={styles.profileImage}
            />
            <TouchableOpacity
                onPress={() =>
                    Linking.openURL(
                        `https://live.blockcypher.com/btc-testnet/tx/${transaction.transactionId}`
                    )
                }
            >
                <Text style={styles.label}>View in Block Explorer:</Text>
                <Text style={styles.value}>
                    https://live.blockcypher.com/btc-testnet/tx/
                    {transaction.transactionId}
                </Text>
            </TouchableOpacity>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Transaction Id:</Text>
                <Text style={styles.value}>{transaction.transactionId}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Transaction Hash:</Text>
                <Text style={styles.value}>{transaction.transactionHash}</Text>
            </View>
            {transaction.senders.map((sender, index) => (
                <View style={styles.detailItem} key={index}>
                    <Text style={styles.label}>Sender {index + 1}:</Text>
                    <Text style={styles.value}>{sender.address}</Text>
                    <Text style={styles.value}>{sender.amount}</Text>
                </View>
            ))}
            {transaction.recipients.map((receiver, index) => (
                <View style={styles.detailItem} key={index}>
                    <Text style={styles.label}>Receiver {index + 1}:</Text>
                    <Text style={styles.value}>{receiver.address}</Text>
                    <Text style={styles.value}>{receiver.amount}</Text>
                </View>
            ))}
            <View style={styles.detailItem}>
                <Text style={styles.label}>Fees:</Text>
                <Text style={styles.value}>
                    {transaction.fee.amount} {transaction.fee.unit}
                </Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Time:</Text>
                <Text style={styles.value}>
                    {new Date(transaction.timestamp).toLocaleString()}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        marginTop: 100,
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    detailItem: {
        backgroundColor: '#ffffff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontWeight: 'bold',
    },
    value: {
        flexShrink: 1,
        textAlign: 'right',
    },
})

export default BitcoinTransactionDetails
