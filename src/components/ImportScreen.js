import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
// import bitcoinWallets from '../store/BitcoinWallets';

const ImportScreen = ({navigation}) => {
  const [wallet, setWallet] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const handleImport = () => {
    // Logic for importing wallet and private key
    console.log('Import button pressed');
    console.log(`Wallet: ${wallet}, Private Key: ${privateKey}`);
    // bitcoinWallets.addBitcoinWallet(wallet, privateKey)
    // navigation.goBack()
  };

  const handleCancel = () => {
    // Logic for canceling import
    console.log('Cancel button pressed');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Wallet"
        value={wallet}
        onChangeText={setWallet}
      />
      <TextInput
        style={styles.input}
        placeholder="Private Key"
        value={privateKey}
        onChangeText={setPrivateKey}
      />
      <View style={styles.buttonContainer}>
        <Button title="Import" onPress={handleImport} />
        <Button title="Cancel" onPress={()=>{navigation.navigate('Home')}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default ImportScreen;
