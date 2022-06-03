
import { View, Text, TouchableOpacity } from "react-native"
import React from "react"
import styles from "../styles/styles"


export default function AnswerTab(props) {
    return (
        <TouchableOpacity disabled = {props.disableAnswer} onPress={props.onPress} style={[styles.answerTab, styles.shadow]}>
            <Text style={styles.answerButtonText}>{props.text}</Text>
        </TouchableOpacity>
    )
}