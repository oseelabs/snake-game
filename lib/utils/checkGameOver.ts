import { Coordinate } from "../types/types";

export const checkGameOver = (
    snakeHead: Coordinate, 
    boundaries: any
): boolean => {
    return (
        snakeHead.x < boundaries.xMin - 1 ||
        snakeHead.x > boundaries.xMax + 1 ||
        snakeHead.y < boundaries.yMin - 1 ||
        snakeHead.y > boundaries.yMax + 1
    );
};