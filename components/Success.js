import React from 'react'
import { StyleSheet, View, Text, Image, Button, Linking } from 'react-native'

const SuccessScreen = ({ route }) => {

  const { transactionId } = route.params
    const handleRedirect = () => {
        Linking.openURL(`https://mumbai.polygonscan.com/tx/${transactionId}`)
    }

    console.log('inside success screen')

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../assets/success.png')}
            />
            <Text style={styles.text}>Transaction sent successfully!</Text>
            <Text style={styles.txthash}>{transactionId}</Text>
            <Button
                title='Go to Blockchain Explorer'
                onPress={handleRedirect}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'green',
    },
})

export default SuccessScreen
