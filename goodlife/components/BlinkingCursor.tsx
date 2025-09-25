import React, { useEffect, useRef } from 'react';
import { Animated, Easing, TextProps } from 'react-native';

export default function BlinkingCursor(props: TextProps) {
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        );
        loop.start();
        return () => loop.stop();
    }, [opacity]);

    return (
        <Animated.Text
            className="text-3xl font-thin text-zinc-700"
    style={[props.style, { opacity }]}
>
|
    </Animated.Text>
);
}
