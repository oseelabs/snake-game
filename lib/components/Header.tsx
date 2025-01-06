import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Colors } from "@/lib/styles/colors";

interface HeaderProps {
    reloadGame: () => void;
    pauseGame: () => void;
    children: React.ReactNode;
    isPaused: boolean;
};

export default function Header(
    { reloadGame, pauseGame, children, isPaused }: HeaderProps
): JSX.Element {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={reloadGame} style={styles.button}>
                <Ionicons 
                    name="reload-circle" 
                    size={40} 
                    color={Colors.primary}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={pauseGame} style={styles.button}>
                <FontAwesome
                    name={isPaused ? "play-circle" : "pause-circle"}
                    size={40}
                    color={Colors.primary}
                />
            </TouchableOpacity>

            { children }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0.06,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'center',
        borderColor: Colors.tertiary,
        borderWidth: 12,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomWidth: 0,
        padding: 15,
        backgroundColor: Colors.header,
    },
    button: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
