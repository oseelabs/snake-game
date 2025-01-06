import { StyleSheet, Text } from "react-native";
import { Coordinate } from "@/lib/types/types";
import { useEffect, useState } from "react";

export default function Food({ x, y }: Coordinate): JSX.Element {
    const [food, setFood] = useState<string>("🍎");

    const getRandomFood = () => {
        const foods = ["🍎", "🍉", "🍌", "🍇", "🍊", "🍒", "🍓"];
        return foods[
            Math.floor(Math.random() * foods.length)
        ];
    };

    useEffect(() => {
        setFood(getRandomFood());
    }, [x, y]);
    

    return (
        <Text style={[ { top: y * 10, left: x * 10 }, styles.food ]}>{food}</Text>
    );
};

const styles = StyleSheet.create({
    food: {
        width: 22,
        height: 22,
        borderRadius: 7,
        position: 'absolute',
    }
});
