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
import Options from './Options';

export default function QuestionAnswersList(props) {


    let flatlistRef = useRef();


    const [questionsArray, setQuestionsArray] = useState(props.questionsArray)
    const [sessionId, setSessionId] = useState(props.sessionId);
    const [disableAnswer, setdisableAnswer] = useState(false)


    useEffect(() => {
        setQuestionsArray([...props.questionsArray])
        console.log(questionsArray, "first question props")
    }, [])



    function showQuestion(index) {
        questionsArray[index].showQuestion = true;
        setQuestionsArray([...questionsArray]);
    }

    function showAnswers(index) {
        questionsArray[index].showAnswers = true;
        setQuestionsArray([...questionsArray]);
    }


    function showGreeting() {
        questionsArray[questionsArray.length - 1].showGreeting = true;
        setQuestionsArray([...questionsArray]);
    }



    function showUserAnswer(answer) {
        questionsArray[questionsArray.length - 1].showUserAnswer = true;
        questionsArray[questionsArray.length - 1].userAnswer = answer;
        setQuestionsArray([...questionsArray]);
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

            setdisableAnswer(true)

            Toast.show({
                type: "success",
                text1: 'Good job',
                text2: "That's it for today!"
            });

        })

    }





    return (

        <View style={{ flex: 1 }}>


            <View style={{ flex: 1 }}>

                <FlatList
                    ref={flatlistRef}
                    showsVerticalScrollIndicator={false}
                    legacyImplementation={false}
                    style={{ marginTop: 5 }}
                    data={questionsArray}
                    onContentSizeChange={() => flatlistRef.current.scrollToEnd()}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (

                        <View>

                            {item.showGreeting &&
                                <Animatable.View animation={"slideInLeft"} onAnimationEnd={() => { showQuestion(index) }}>
                                    <CoachBubble text={item.response} />
                                </Animatable.View>
                            }

                            {item.showQuestion &&
                                <Animatable.View animation={"slideInLeft"} onAnimationEnd={() => { showAnswers(index) }}>
                                    <CoachBubble text={item.question} />
                                </Animatable.View>
                            }

                            {item.showUserAnswer &&
                                <Animatable.View animation={"slideInRight"} onAnimationEnd={() => { showGreeting(index) }}>
                                    <UserBubble text={item.userAnswer} />
                                </Animatable.View>
                            }

                        </View>

                    )}

                />


                {questionsArray[questionsArray.length - 1].showAnswers &&
                    <Options options={questionsArray[questionsArray.length - 1].answers} postAnswer={postAnswer} disableAnswer = {disableAnswer}/>
                }


            </View>




        </View>


    )

}