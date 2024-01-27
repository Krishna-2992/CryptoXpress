import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const TransactionDetails = ({ route }) => {
    const { transaction } = route.params

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/transaction.png')}
                style={styles.profileImage}
            />
            <View style={styles.detailItem}>
                <Text style={styles.label}>Transaction Hash:</Text>
                <Text style={styles.value}>{transaction.hash}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Sender:</Text>
                <Text style={styles.value}>{transaction.sender}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Receiver:</Text>
                <Text style={styles.value}>{transaction.receiver}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Amount:</Text>
                <Text style={styles.value}>{transaction.amount}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Fees:</Text>
                <Text style={styles.value}>{transaction.fees}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Time:</Text>
                <Text style={styles.value}>
                    {new Date(transaction.time).toLocaleString()}
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

export default TransactionDetails
