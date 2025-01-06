import Game from "@/lib/components/Game";
import { Colors } from "@/lib/styles/colors";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("screen");

export default function Index() {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Game />
      </GestureHandlerRootView>
  );
};
