import React from 'react';
      import { StyleSheet, View, Text, Image, Button, Linking } from 'react-native';

      const SuccessScreen = () => {
        const handleRedirect = () => {
          Linking.openURL('https://www.blockchain.com/explorer');
        };

        return (
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require('../assets/success.png')}
            />
            <Text style={styles.text}>Success!</Text>
            <Text style={styles.txthash}>1ee4njfn3frnoj</Text>
            <Button title="Go to Blockchain Explorer" onPress={handleRedirect}/>
    </View>
  );
};

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
 
});

export default SuccessScreen;
