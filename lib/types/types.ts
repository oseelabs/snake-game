export interface GestureEventType {
    nativeEvent: {
        translationX: number;
        translationY: number;
    };
};

export interface Coordinate {
    x: number;
    y: number;
};

export enum Direction {
    Up,
    Down,
    Right,
    Left
};

export enum OverlayPosition {
    Top,
    Bottom,
    Left,
    Right
};
