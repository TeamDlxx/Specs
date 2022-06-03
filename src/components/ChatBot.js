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

import { invokeApi } from '../api/invokeApi';
import AnswerTab from './AnswerTab';
import CoachBubble from './CoachBubble';
import UserBubble from './UserBubble';
import styles from '../styles/styles';
import * as Animatable from 'react-native-animatable';
import Loader from './Loader';
import FirstQuestion from './FirstQuestion';
import QuestionAnswersList from './QuesitionAnswersList';

export default function ChatBot() {


    const [questionsArray, setQuestionsArray] = useState([]);
    const [sessionId, setSessionId] = useState("");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getFirstQuestionApi()
    }, [])






    async function getFirstQuestionApi() {


        setLoading(true);

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        let urlParams = ""
        let body = ""

        invokeApi("auth", "POST", headers, urlParams, body, "").then(async function (response) {
            prepareData(response)
            setLoading(false)

        }).catch(function (e) {

            setLoading(false)

            Toast.show({
                type: "success",
                text1: 'Good job',
                text2: "That's it for today!"
            });
            console.error(e);
        })

    }



    async function postAnswer(answer) {

        // setLoading(true)

        showUserAnswer(answer)


        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionId
        }

        let urlParams = ""
        let body = JSON.stringify({ "responseId": answer.toLowerCase() })

        invokeApi("responses", "POST", headers, urlParams, body, "").then(async function (response) {


            console.log(response, "response from post answer api");

            let questions = props.questionsArray;

            response.showGreeting = true;
            response.showQuestion = false;
            response.showAnswers = false;
            response.showUserAnswer = false
            response.userAnswer = answer

            let answers = []
            for (let i = 0; i < Object.keys(response.answers).length; i++) {
                answers.push(Object.values(response.answers)[i])
            }

            response.answers = answers;

            console.log(response, "response from post answer api");


            questions.push(response);
            await setQuestionsArray([...questions])
            await setSessionId(response.sessionId);


            console.log(questions, "questions array after setting");


            showGreeting()


            // setLoading(false)



        }).catch(function (e) {
            // setLoading(false)

            Toast.show({
                type: "success",
                text1: 'Good job',
                text2: "That's it for today!"
            });

        })

    }




    async function prepareData(response) {


        await setSessionId(response.sessionId);


        //setting animations of items
        response.question.showGreeting = true
        response.question.showQuestion = false
        response.question.showAnswers = false
        response.question.showUserAnswer = false
        //setting animations of items ends

        // converting answers object from api to array (was required)
        let answers = []
        for (let i = 0; i < Object.keys(response.question.answers).length; i++) {
            answers.push(Object.values(response.question.answers)[i])
        }
        // converting answers object from api to array (was required) ends


        response.question.answers = answers;

        let item = {};

        item.response = response.question.greeting[0];
        item.question = response.question.question;
        item.showAnswers = response.question.showAnswers;
        item.showGreeting = response.question.showGreeting;
        item.showQuestion = response.question.showQuestion;
        item.answers = response.question.answers
        item.showUserAnswer = response.question.showUserAnswer

        let questions = [];
        questions.push(item)

        console.log(questions)
        setQuestionsArray([...questions])


    }







    return (

        <SafeAreaView style={styles.safeAreaView}>

            <View style={styles.container}>

                {(questionsArray.length != 0) &&
                    <QuestionAnswersList questionsArray={questionsArray} sessionId={sessionId} />
                    
                }




               
                {loading &&
                    <Loader />
                }
                <Toast />

            </View>

        </SafeAreaView>

    )


}


