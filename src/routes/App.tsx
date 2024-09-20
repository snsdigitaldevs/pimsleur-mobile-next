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
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {PageLearn} from '../pages/learn/PageLearn';
import {PagePractice} from '../pages/practice/PagePractice';
import {PageVoiceCoachHome} from '../pages/voiceCoach/PageVCModeSelector';
import {PageMiniLesson} from '../pages/miniLesson/PageMiniLesson';
import {PageMe} from '../pages/me/PageMe';
import {createStackNavigator} from '@react-navigation/stack';
import {BackgroundImageView} from '../components/BackgroundImageView';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function HomeScreen({navigation}: any) {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const onTapHeader = () => {
    navigation.navigate('Details');
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <TouchableOpacity onPress={onTapHeader}>
          <Header />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <BackgroundImageView />
    </View>
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
            options={{headerShown: false}}
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
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {height: 106, borderBottomWidth: 0},
        headerTransparent: true,
        headerTintColor: '#ffffff',
        tabBarStyle: {position: 'absolute', borderTopWidth: 0},
        tabBarBackground: () => <View style={{backgroundColor: '#00000000'}} />,
        tabBarLabelStyle: {
          color: '#ffffff',
          fontSize: 15,
          fontWeight: 'bold',
          lineHeight: 49,
        },
        tabBarActiveBackgroundColor: 'yellow',
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
 * 1. Sign in flow, stack navigator.
 * 2. Relaunch flow
 * 3. Transition between signin and home screen. tab navigator to stack navigator.
 * 4. Transition between home screens, double tap to exit the app.
 * 5. Taps button rapidly won't cause repeated screen to be pushed.
 * 6. iPhone X and Android with notch support.
 * 7. Transition mode, push, modal, etc.
 * 8. Customize header bar and bottom tab.
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
});

export default App;
