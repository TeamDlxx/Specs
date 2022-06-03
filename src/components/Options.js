/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    FlatList
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import styles from '../styles/styles';
import AnswerTab from './AnswerTab';


export default function Options(props) {




    return (

        <Animatable.View animation={"slideInUp"} style={styles.answersContainer}>
            <View style={styles.answersContainer}>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    legacyImplementation={false}
                    horizontal
                    data={props.options}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (

                        <AnswerTab text={item.label} onPress={() => { props.postAnswer(item.label) }} disableAnswer = {props.disableAnswer} />

                    )}
                />

            </View>
        </Animatable.View>

    )
}

