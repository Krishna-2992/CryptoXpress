import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TopIndicator = () => {


  const [chain, setChain] = useState('Bitcoin');
  return (
    <View style={styles.container}>
      <Text style={styles.indicatorText} onPress={()=>{setChain('Bitcoin')}}>Bitcoin</Text>
      <Text style={styles.indicatorText} onPress={()=>{setChain('Polygon')}}>Polygon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  },
});

export default TopIndicator;
