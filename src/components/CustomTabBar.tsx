import React from 'react';
import {Alert, TouchableOpacity, View, Text} from 'react-native';
import {iPhoneXHomeIndicatorHeight} from '../utils/DimensionHelper';

export const CustomTabBar = ({state, descriptors, navigation}: any) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        marginBottom: iPhoneXHomeIndicatorHeight,
      }}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          if (!isFocused && route.name === 'Speak') {
            Alert.alert(
              'Alert',
              'Microphone permission is needed for this feature.',
              [{text: 'OK', onPress: () => {}}],
              {
                cancelable: false,
              },
            );
            return;
          }
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            key={index}>
            <Text
              style={{
                color: isFocused ? 'blue' : 'white',
                fontSize: 14,
                fontWeight: 'bold',
                backgroundColor: isFocused ? '#fff' : '#00000000',
                height: 26,
                lineHeight: 26,
                paddingHorizontal: 6,
                borderRadius: 13,
                overflow: 'hidden',
                minWidth: 40,
                textAlign: 'center',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
