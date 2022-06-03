import React, { Component } from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native"
import colors from "../colors/colors";
import styles from "../styles/styles";

export default function Loader(props) {


    return (
        <ActivityIndicator size="large" color={colors.blue} style={styles.loader} />
    )


}