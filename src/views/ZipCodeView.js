import React from 'react';
import { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import colors from '../constants/colors';

/**
 * ZipCodeView
 */

const ZipCodeView = props => {
    const [zipCode, setZipCode] = useState(``);
    const validation = (zipcode) => {
        if(zipcode.length <= 0){
            Alert.alert('ZIPCODE IS REQUIRED')
            return false;
        } else if (zipcode.length > 0 && zipcode.length < 6) {
            Alert.alert('ENTER A VALID ZIPCODE')
            return false;
        }
        return true;
    }
    return (
        <View style={styles.body}>
            <Input
                keyboardType={'numeric'}
                placeholder='Enter Zipcode'
                errorStyle={{ color: 'red' }}
                onChangeText={(zipcode) => setZipCode(zipcode)}
                onSubmitEditing={() => {
                    validation(zipCode) ? props.navigation.navigate('WeatherView', {
                        zipcode: zipCode
                    }) : ''
                }}
            />

            <TouchableOpacity style={styles.submitButton}
                onPress={() => {
                    validation(zipCode) ? props.navigation.navigate('WeatherView', { zipcode: zipCode })
                        : ''
                }}>
                <Text style={styles.submitText}> Submit </Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#C5C5C5',
        flex: 1,
        justifyContent: "center",
        alignContent: 'center',
        padding: 20
    },
    container: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    submitButton: {
        backgroundColor: colors.primary,
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitText: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 16,

    }
});

export default ZipCodeView;