import { Fragment } from "react";
import { Coordinate } from "../types/types";
import { StyleSheet, View } from "react-native";
import { Colors } from "../styles/colors";

interface SnakeProps {
    snake: Coordinate[];
};

export default function Snake({ snake }: SnakeProps): JSX.Element {
    return (
        <Fragment>
            {snake.map((segment, index) => {
                const segmentStyle = {
                    left: segment.x * 10,
                    top: segment.y * 10,
                };
                return (
                    <View 
                        key={index} 
                        style={[ styles.snake, segmentStyle ]}
                    />
                )
            })}
        </Fragment>
    );
};

const styles = StyleSheet.create({
    snake: {
        width: 15,
        height: 15,
        borderRadius: 6,
        backgroundColor: Colors.secondary,
        position: 'absolute',
    }
})