
import { View, Text } from "react-native"
import React from "react"
import styles from "../styles/styles"
export default function UserBubble(props) {
    return (
        <View style={[styles.userBubble, styles.shadow]}>
            <Text style={styles.userBubbleText}>{props.text}</Text>
        </View>
    )
}