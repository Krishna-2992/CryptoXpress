import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import TopIndicator from '../utils/notch'

const TransferFund = ({ navigation }) => {
    const [receiverAddress, setReceiverAddress] = useState('')
    const [amount, setAmount] = useState('')

    const handleSend = () => {
        // Logic for sending funds
        console.log(`Sending ${amount} to ${receiverAddress}`)
    }

    return (
        <View style={{ marginTop: 15 }}>
            <TopIndicator />

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
                            onPress={() => navigation.navigate('Success')}
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
