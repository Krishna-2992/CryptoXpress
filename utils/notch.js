import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import currentChain from '../store/CurrentChain'

const TopIndicator = () => {
    const [chain, setChain] = useState('Bitcoin')

    function handleChainChange(chain) {
        currentChain.setChain(chain)
        setChain(chain)
        console.log('currentChain', chain)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => handleChainChange('Bitcoin')}
            >
                <Text
                    style={[
                        styles.indicatorText,
                        chain === 'Bitcoin'
                            ? styles.selectedChain
                            : styles.unselectedChain,
                    ]}
                >
                    Bitcoin
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => handleChainChange('Polygon')}
            >
                <Text
                    style={[
                        styles.indicatorText,
                        chain === 'Polygon'
                            ? styles.selectedChain
                            : styles.unselectedChain,
                    ]}
                >
                    Polygon
                </Text>
            </TouchableOpacity>
        </View>
    )
}

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
        textAlign: 'center'
    },
    selectedChain: {
        color: 'black',
        textDecorationLine: 'underline',
    },
    unselectedChain: {
        color: 'grey',
    },
})

export default TopIndicator
