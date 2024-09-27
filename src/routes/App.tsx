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
  FlatList,
  Pressable,
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
import {CustomSafeArea} from '../components/CustomSafeArea';

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
 * 4. Transition between home screens, double tap to exit the app (Android specifically).
 * 5. Taps button rapidly won't cause repeated screen to be pushed.
 * 6. Transition mode, push, modal, etc.
 * 7. Customize header bar and bottom tab.
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
