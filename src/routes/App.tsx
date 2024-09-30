/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import "./gesture-handler";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';

import {PageLearn} from '../pages/learn/PageLearn';
import {PagePractice} from '../pages/practice/PagePractice';
import {PageVoiceCoachHome} from '../pages/voiceCoach/PageVCModeSelector';
import {PageMiniLesson} from '../pages/miniLesson/PageMiniLesson';
import {PageMe} from '../pages/me/PageMe';
import {createStackNavigator} from '@react-navigation/stack';
import {BackgroundImageView} from '../components/BackgroundImageView';
import {CustomSafeArea} from '../components/CustomSafeArea';

function DetailScreen() {
  return (
    <CustomSafeArea customStyle={{flex: 1}} withNavigation>
      <Text>Details Screen</Text>
      <BackgroundImageView />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={item => item.toString()}
        renderItem={({item}) => (
          <Pressable style={styles.button} onPress={() => {}}>
            <Text>Go to Details</Text>
          </Pressable>
        )}
      />
    </CustomSafeArea>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTintColor: '#ffffff',
          headerLeftLabelVisible: false,
        }}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={HomeTabs}
        />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
 * create custom tabbar https://snack.expo.dev/@khageshfoodapp/material-bottom-tabs-navigator-%7C-react-navigation?platform=android
 */

function HomeTabs({navigation}: any) {
  React.useEffect(() => {}, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {height: 106, borderBottomWidth: 0},
        headerTransparent: true,
        headerTintColor: '#ffffff',
        tabBarStyle: {position: 'absolute', borderTopWidth: 0},
        tabBarBackground: () => <View style={{backgroundColor: '#00000000'}} />,
        tabBarLabel(props) {
          console.log('tabBarLabel', props);
          return (
            <View
              style={{
                height: 49,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: props.focused ? 'blue' : 'white',
                  fontSize: 14,
                  fontWeight: 'bold',
                  backgroundColor: props.focused ? '#fff' : '#00000000',
                  height: 26,
                  lineHeight: 26,
                  paddingHorizontal: 6,
                  borderRadius: 13,
                  overflow: 'hidden',
                  minWidth: 40,
                  textAlign: 'center',
                }}>
                {props.children}
              </Text>
            </View>
          );
        },
        tabBarIconStyle: {display: 'none'},
      }}>
      <Tab.Screen name="Learn" component={PageLearn} />
      <Tab.Screen name="Practice" component={PagePractice} />
      <Tab.Screen name="Speak" component={PageVoiceCoachHome} />
      <Tab.Screen name="Enrich" component={PageMiniLesson} />
      <Tab.Screen name="Me" component={PageMe} />
    </Tab.Navigator>
  );
}

/**
 * TODO:
 * 1. Transition between home screens, double tap to exit the app (Android specifically).
 * 2. Taps button rapidly won't cause repeated screen to be pushed.
 * 3. Transition mode, push, modal, etc.
 * 4. Customize header bar and bottom tab.
 */

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    padding: 20,
    borderColor: '#ededed',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 10,
  },
});

export default App;
