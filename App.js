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
import Toast from 'react-native-toast-message';

import { invokeApi } from './src/api/invokeApi';
import AnswerTab from './src/components/AnswerTab';
import CoachBubble from './src/components/CoachBubble';
import UserBubble from './src/components/UserBubble';
import styles from './src/styles/styles';
import * as Animatable from 'react-native-animatable';
import Loader from './src/components/Loader';
import ChatBot from './src/components/ChatBot';

export default function App() {

  return (

    <ChatBot />

  )


}


