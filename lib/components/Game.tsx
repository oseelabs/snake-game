import { Dimensions, SafeAreaView, StyleSheet, View, Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { Colors } from "@/lib/styles/colors";
import { Coordinate, Direction, GestureEventType, OverlayPosition } from "@/lib/types/types";
import Snake from "@/lib/components/Snake";
import { checkGameOver } from "../utils/checkGameOver";
import Food from "./Food";
import { checkEatFood } from "../utils/checkEatFood";
import { randomFoodPosition } from "../utils/randomFoodPosition";
import Header from "./Header";
import Overlay from "./Overlay";

const SNAKE_INITIAL_POSITION = [
    { x: 5, y: 5 }, { x: 5, y: 15 }
];
const FOOD_INITIAL_POSITION = { x: 10, y: 20 };
const GAME_BOUNDS = { xMin: 1, xMax: 31, yMin: 1, yMax: 60 };
const MOVE_INTERVAL = 100;
const SCORE_INCREMENT = 10;

export default function Game(): JSX.Element {
    const [direction, setDirection] = useState<Direction>(Direction.Right);
    const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
    const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
    const [score, setScore] = useState<number>(0);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    useEffect(() => {
        if (isGameOver) return;
        const intervalId = setInterval(
            () => {
                !isPaused && moveSnake();
            },
            MOVE_INTERVAL
        );

        return () => {
            clearInterval(intervalId);
        };
    }, [snake, isGameOver, isPaused]);

    const moveSnake = () => {
        const snakeHead = snake[0];
        const newHead = { ...snakeHead }; // A copy of snakeHead


        // move snake
        switch(direction) {
            case Direction.Up:
                newHead.y -= 1;
                break;
            case Direction.Down:
                newHead.y += 1;
                break;
            case Direction.Left:
                newHead.x -= 1;
                break;
            case Direction.Right:
                newHead.x += 1;
                break;
            default:
                break;
        };
        
        // game over
        if (checkGameOver(snakeHead, GAME_BOUNDS)) {
            setIsGameOver((prev) => !prev);
            return;
        };

        // if snake eats food
        if (checkEatFood(snakeHead, food, 2)) {
            setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
            setSnake([newHead, ...snake]);
            setScore((prev) => prev + SCORE_INCREMENT);
        } else {
            setSnake([newHead, ...snake.slice(0, -1)]);
        }
    };

    const handleGesture = (event: GestureEventType) => {
        const { translationX, translationY } = event.nativeEvent;
        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                setDirection(Direction.Right);
            } else {
                setDirection(Direction.Left);
            }
        } else {
            if (translationY > 0) {
                setDirection(Direction.Down);
            } else {
                setDirection(Direction.Up);
            }
        }
    };

    const reloadGame = () => {
        setSnake(SNAKE_INITIAL_POSITION);
        setFood(FOOD_INITIAL_POSITION);
        setDirection(Direction.Right);
        setScore(0);
        setIsGameOver(false);
    };

    const pauseGame = () => {
        setIsPaused(!isPaused);
    };

    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <SafeAreaView style={styles.container}>
                <Header 
                    isPaused={isPaused} 
                    pauseGame={pauseGame}
                    reloadGame={reloadGame}
                >
                    <Text
                        style={{ 
                            color: Colors.primary, 
                            fontSize: 26,
                            fontWeight: 'bold',
                        }}
                    >{score}</Text>
                </Header>
                <View style={styles.boundaries}>
                    <Overlay positions={[OverlayPosition.Top]} translate />
                    <Snake snake={snake} />
                    <Food x={food.x} y={food.y} />
                </View>
                <Overlay
                    positions={[
                        OverlayPosition.Top,
                        OverlayPosition.Bottom,
                        OverlayPosition.Left,
                        OverlayPosition.Right
                    ]}
                />
            </SafeAreaView>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.tertiary
    },
    boundaries: {
        flex: 1,
        position: 'relative',
        borderWidth: 12,
        borderColor: Colors.tertiary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: Colors.header,//Colors.background,
    },
})
