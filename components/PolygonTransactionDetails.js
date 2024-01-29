import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Button,
    Linking,
} from 'react-native'

const PolygonTransactionDetails = ({ route }) => {
    const { transaction } = route.params

    console.log('polygon transaction page')

    const handleRedirect = () => {
        console.log('transaction is', transaction.hash)
        if (currentChain.chain == 'Polygon') {
            Linking.openURL(
                `https://mumbai.polygonscan.com/tx/${transaction.hash}`
            )
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/transaction.png')}
                style={styles.profileImage}
            />
            <Button title='view on block explorer' onPress={handleRedirect} />
            <View style={styles.detailItem}>
                <Text style={styles.label}>Transaction Hash:</Text>
                <Text style={styles.value}>{transaction.hash}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Sender: </Text>
                <Text style={styles.value}>{transaction.from}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Receiver: </Text>
                <Text style={styles.value}>{transaction.to}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>Amount: </Text>
                <Text style={styles.value}>{transaction.value}</Text>
            </View>
            <View style={styles.detailItem}>
                <Text style={styles.label}>BlockNumber:</Text>
                <Text style={styles.value}>{transaction.blockNum}</Text>
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

export default PolygonTransactionDetails
