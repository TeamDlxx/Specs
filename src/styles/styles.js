import { StyleSheet, Dimensions } from "react-native"
import colors from "../colors/colors"

export default StyleSheet.create({

    container: {
        flex: 1,
        padding: 12,
        backgroundColor: colors.screenBackground,
    },

    safeAreaView: {
        backgroundColor: colors.screenBackground,
        flex: 1
    },

    coachBubble: {
        minHeight: 45,
        padding: 8,
        backgroundColor: colors.white,
        borderRadius: 8,
        borderBottomLeftRadius: 2,
        marginRight: 40,
        justifyContent: "center",
        alignSelf: "flex-start",
        marginTop: 8,
    },

    coachBubbleText: {
        fontSize: 14,
        fontFamily: "Gilroy-Medium",
        lineHeight: 20,
        color: colors.dark,
        fontWeight: "400"
    },

    userBubble: {
        minHeight: 45,
        padding: 8,
        backgroundColor: colors.blue,
        borderRadius: 8,
        borderBottomRightRadius: 2,
        marginLeft: 40,
        justifyContent: "center",
        alignSelf: "flex-end",
        marginTop: 8,
    },

    userBubbleText: {
        fontSize: 14,
        fontFamily: "Gilroy-Medium",
        lineHeight: 20,
        color: colors.white,
        fontWeight: "400"
    },

    shadow: {
        shadowColor: colors.gray,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 2,
    },

    answersContainer: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        bottom: 20,
        flexDirection: "row",
        alignSelf: "center"
    },

    answerTab: {
        height: 47,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 12,
        backgroundColor: colors.blue,
        borderRadius: 8,
        marginHorizontal: 6
    },

    answerButtonText: {

        fontFamily: "Gilroy-SemiBold",
        color: "white",
        fontWeight: "400",
        fontSize: 14

    },

    loader: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
    }

})