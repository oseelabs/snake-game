import { Coordinate } from "@/lib/types/types";

export const checkEatFood = (
    head: Coordinate,
    food: Coordinate,
    area: number
): boolean => {
    const distanceX = Math.abs(head.x - food.x);
    const distanceY = Math.abs(head.y - food.y);
    return (
        distanceX < area && distanceY < area
    );
};