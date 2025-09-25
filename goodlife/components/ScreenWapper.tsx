import React, { useEffect, useRef } from 'react';
import {
    Dimensions,
    Platform,
    Animated,
    Easing,
    ViewStyle,
} from 'react-native';

const { height } = Dimensions.get('window');

type Props = {
    children: React.ReactNode;
    className: string;
};

const ANIM_DURATION = 800;
const ANIM_DELAY = 0;
const START_OPACITY = 0;
const END_OPACITY = 1;
const START_Y_OFFSET = 10;
const EASING_FN = Easing.out(Easing.cubic);

const ScreenWrapper: React.FC<Props> = ({ children, className }) => {
    const paddingTop = Platform.OS === 'ios' ? height * 0.06 : 50;

    const animValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        animValue.setValue(0);
        Animated.timing(animValue, {
            toValue: 1,
            duration: ANIM_DURATION,
            delay: ANIM_DELAY,
            easing: EASING_FN,
            useNativeDriver: true,
        }).start();
    }, [className, animValue]);

    const animatedStyle: Animated.WithAnimatedObject<ViewStyle> = {
        opacity: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [START_OPACITY, END_OPACITY],
        }),
        transform: [
            {
                translateY: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [START_Y_OFFSET, 0],
                }),
            },
        ],
        paddingTop,
    };

    return (
        <Animated.View className={`${className} h-screen`} style={animatedStyle}>
            {children}
        </Animated.View>
    );
};

export default ScreenWrapper;
