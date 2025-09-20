import React, { useState } from 'react';
import { View, ScrollView, Image, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const contentPadding = 16;
const cardInnerPadding = 20;
const slideWidth = screenWidth - contentPadding * 2 - cardInnerPadding * 2;
const imageInnerWidth = slideWidth - 12;

const imageMap: Record<string, any> = {
    'issue1.png': require('@/assets/images/issue1.png'),
    'issue2.png': require('@/assets/images/issue2.png'),
    'issue3.png': require('@/assets/images/issue3.png'),
};

const ImageSlider = ({ images }: { images: string[] }) => {
    const [index, setIndex] = useState(0);
    if (!images?.length) return null;

    return (
        <View className="mt-3">
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={e =>
                    setIndex(Math.round(e.nativeEvent.contentOffset.x / slideWidth))
                }
            >
                {images.map((img, i) => (
                    <View key={i} style={{ width: slideWidth }}>
                        <Image
                            source={imageMap[img]}
                            style={{
                                width: imageInnerWidth,
                                height: 192,
                                borderRadius: 16,
                                marginRight: 12,
                            }}
                            resizeMode="cover"
                        />
                    </View>
                ))}
            </ScrollView>

            {images.length > 1 && (
                <View className="flex-row justify-center mt-2">
                    {images.map((_, i) => (
                        <View
                            key={i}
                            className={`w-2 h-2 mx-1 rounded-full ${
                                i === index ? 'bg-blue-500' : 'bg-zinc-300'
                            }`}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

export default ImageSlider;
