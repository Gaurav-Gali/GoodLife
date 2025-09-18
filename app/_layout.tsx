import React from 'react';
import {Slot} from "expo-router";
import {View} from "react-native";

import "@/global.css";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

function _Layout() {
    return (
        <GluestackUIProvider>
          <View>
              <Slot/>
          </View>
        </GluestackUIProvider>
    );
}

export default _Layout;