import { Dimensions, StyleSheet, View } from "react-native"
import { OverlayPosition } from "@/lib/types/types";
import { Fragment } from "react";
import { Colors } from "../styles/colors";

interface OverlayProps {
    positions: OverlayPosition[];
    translate?: boolean;
};

const { width, height } = Dimensions.get('window');
const bound = 12;

export default function Overlay({ positions, translate: tr }: OverlayProps): JSX.Element {
    return (
        <Fragment>
            { positions.map((position, index) => (
                <View 
                    key={index}
                    style={[ 
                        styles.overlay,
                        {
                            top: position === OverlayPosition.Top ? 0 : undefined,
                            bottom: position === OverlayPosition.Bottom ? 0 : undefined,
                            left: position === OverlayPosition.Left ? 0 : undefined,
                            right: position === OverlayPosition.Right ? 0 : undefined,
                            width: position === OverlayPosition.Left || position === OverlayPosition.Right ? bound : width,
                            height: position === OverlayPosition.Top || position === OverlayPosition.Bottom ? bound : height,
                            transform: tr ? [{ translateY: -12 }] : undefined,
                        }
                    ]}
                />
            ))}
        </Fragment>
    )
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: Colors.tertiary,
    }
});