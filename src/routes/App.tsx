/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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
import {SetupAudioPlayService} from '../player/SetupService';
import TrackPlayer, {PitchAlgorithm, Track} from 'react-native-track-player';

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

const sampleTrack: Track = {
  url: 'https://d3nhzmkfu4bi2a.cloudfront.net/German/German%20Level%201%20orig/asset/main_audio/9781442348653_German1_U01_Lesson.mp3?versionId=I861TznwsEWHsaUxdzU.FiSbKV6LgHrO',
  title: `Lesson 1 - German Level 1`,
  artist: 'Pimsleur',
  album: 'German Level 1',
  contentType: 'mp3',
  artwork:
    'https://d3kaeubvx0x0ex.cloudfront.net/German/German%20Level%201%20orig/asset/lesson_photo/full/GR_1_M_02.jpg?versionId=mr4xmNNhjeKzVh3pBWGcE6ndhP_7yly0',
  pitchAlgorithm: PitchAlgorithm.Voice,
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const playLesson = async () => {
    // setup audio player
    await SetupAudioPlayService();
    // load and play the sample track
    await TrackPlayer.load(sampleTrack);
    await TrackPlayer.play();
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
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <TouchableOpacity style={styles.playButton} onPress={playLesson}>
            <Text style={styles.playButtonText}>Play lesson</Text>
          </TouchableOpacity>
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
  playButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  playButtonText: {
    color: 'blue',
  },
});

export default App;
