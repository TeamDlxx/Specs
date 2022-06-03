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

export default function FirstQuestion(props) {


    const [firstQuestion, setfirstQuestion] = useState(props.firstQuestion)


    useEffect(() => {
        setfirstQuestion(firstQuestion)
        console.log(firstQuestion, "first question props")
    }, [])

    function showQuestion() {
        firstQuestion.question.showQuestion = true;
        setfirstQuestion({ ...firstQuestion })
    }

    function showAnswers() {
        firstQuestion.question.showAnswers = true;
        setfirstQuestion({ ...firstQuestion })
    }


    function showGreeting() {
        firstQuestion.question.question.showGreeting = true;
        setfirstQuestion(firstQuestion)
    }




    return (

        <View style={{ flex: 1 }}>

            {(firstQuestion != "" && firstQuestion != undefined && firstQuestion != null) &&

                <View style={{ flex: 1 }}>
                    {firstQuestion.question.showGreeting &&
                        <Animatable.View animation={"slideInLeft"} onAnimationEnd={() => { showQuestion() }}>
                            <CoachBubble text={firstQuestion.question.greeting[0]} />
                        </Animatable.View>
                    }

                    {firstQuestion.question.showQuestion &&
                        <Animatable.View animation={"slideInLeft"} onAnimationEnd={() => { showAnswers() }}>
                            <CoachBubble text={firstQuestion.question.question} />
                        </Animatable.View>
                    }

                    {firstQuestion.question.showUserAnswer &&
                        <Animatable.View animation={"slideInRight"} onAnimationEnd={() => { showGreeting() }}>
                            <UserBubble text={firstQuestion.question.userAnswer} />
                        </Animatable.View>
                    }


                    {firstQuestion.question.showAnswers &&
                        <Options options={firstQuestion.question.answers} postAnswer = {props.postAnswer}/>
                    }


                </View>

            }


        </View>


    )

}