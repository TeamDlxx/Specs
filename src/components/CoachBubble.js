
import { View, Text } from "react-native"
import React from "react"
import styles from "../styles/styles"
export default function CoachBubble(props) {
    return (
        <View style={[styles.coachBubble, styles.shadow]}>
            <Text style={styles.coachBubbleText}>{props.text}</Text>
        </View>
    )
}