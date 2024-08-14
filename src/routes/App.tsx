import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SetupAudioPlayService} from '../player/SetupService';
import TrackPlayer, {
  Event,
  PitchAlgorithm,
  Track,
  useActiveTrack,
  useIsPlaying,
  useProgress,
} from 'react-native-track-player';
import {IconBackward} from '../player/assets/IconBackward';
import {IconForward} from '../player/assets/IconForward';
import {IconPlay} from '../player/assets/IconPlay';
import {IconPause} from '../player/assets/IconPause';
import {LoadingSpinner} from '../components/LoadingSpinner';
import Slider from '@react-native-community/slider';
import moment from 'moment';

interface PracticeItem {
  image?: ImageSourcePropType;
  title: string;
  description: string;
}

const practices: PracticeItem[] = [
  {
    image: require('../pages/practice/assets/practiceFlashCards.png'),
    title: 'Voice Coach',
    description:
      'Perfect your pronunciation and test your accuracy with Speech Recognition.',
  },
  {
    image: require('../pages/practice/assets/practiceReading.png'),
    title: 'Reading',
    description: 'Reading lessons begin in lesson 11',
  },
  {
    image: require('../pages/practice/assets/practiceFlashCards.png'),
    title: 'Flash Cards',
    description: 'Master essential vocabulary.',
  },
  {
    image: require('../pages/practice/assets/practiceQuickMatch.png'),
    title: 'Quick Match',
    description: 'Challenge yourself with a fast quiz.',
  },
  {
    image: require('../pages/practice/assets/practiceSpeakEasy.png'),
    title: 'Speak Easy',
    description: 'Refine your pronunciation, rhythm, cadence, and accent.',
  },
  {
    image: require('../pages/practice/assets/practiceSpeedRound.png'),
    title: 'Speed Round',
    description: 'Are you up for the challenge?',
  },
];

const sampleTracks: Track[] = [
  {
    url: 'https://d3nhzmkfu4bi2a.cloudfront.net/German/German%20Level%201%20orig/asset/main_audio/9781442348653_German1_U01_Lesson.mp3?versionId=I861TznwsEWHsaUxdzU.FiSbKV6LgHrO',
    title: `Lesson 1`,
    artist: 'Pimsleur',
    album: 'German Level 1',
    contentType: 'mp3',
    artwork:
      'https://d3kaeubvx0x0ex.cloudfront.net/German/German%20Level%201%20orig/asset/lesson_photo/full/GR_1_M_02.jpg?versionId=mr4xmNNhjeKzVh3pBWGcE6ndhP_7yly0',
    pitchAlgorithm: PitchAlgorithm.Voice,
  },
  {
    url: 'https://d3nhzmkfu4bi2a.cloudfront.net/German/German%20Level%201%20orig/asset/main_audio/9781442348653_German1_U07_Lesson.mp3?versionId=5hxg0NNLt9rkE6j60ppvNO2ZduLX2Bol',
    title: `Lesson 7`,
    artist: 'Pimsleur',
    album: 'German Level 1',
    contentType: 'mp3',
    artwork:
      'https://d3nhzmkfu4bi2a.cloudfront.net/German/German%20Level%201%20orig/asset/lesson_photo/full/GR_1_M_07.jpg?versionId=o.zivaNiUMh.pJlpKO_zfZqkrTf2_ZWF',
    pitchAlgorithm: PitchAlgorithm.Voice,
  },
  {
    url: 'https://d3nhzmkfu4bi2a.cloudfront.net/German/German%20Level%201%20orig/asset/main_audio/9781442348653_German1_U27_Lesson.mp3?versionId=CsUXB7pYeSJlv3MHSb7VxrVfXikJ6odt',
    title: `Lesson 27`,
    artist: 'Pimsleur',
    album: 'German Level 1',
    contentType: 'mp3',
    artwork:
      'https://d3nhzmkfu4bi2a.cloudfront.net/German/German%20Level%201%20orig/asset/lesson_photo/full/GR_1_M_27.jpg?versionId=S0CrT3Nx8F53S5zE22Kme2vfKYHLI3lL',
    pitchAlgorithm: PitchAlgorithm.Voice,
  },
  {
    url: 'https://d3nhzmkfu4bi2a.cloudfront.net/French/French%20Level%201%202018/asset/main_audio/9781508261131_French1_U27_Lesson.mp3?versionId=BcpGQ1OHzvjR4kMEP1sHRYRPz0qTVTDK',
    title: `Lesson 27`,
    artist: 'Pimsleur',
    album: 'French Level 1',
    contentType: 'mp3',
    artwork:
      'https://d3nhzmkfu4bi2a.cloudfront.net/French/French%20Level%201%202018/asset/lesson_photo/full/FR_1_M_27.jpg?versionId=HCcVzDgy1UMWZR.OSdejL3uX67WSB3FC',
    pitchAlgorithm: PitchAlgorithm.Voice,
  },
  {
    url: 'https://d3nhzmkfu4bi2a.cloudfront.net/French/French%20Level%201%202018/asset/main_audio/9781508261131_French1_U01_Lesson.mp3?versionId=BH5e_s9QtNRo4tkdxkon3X8bmGIUb6as',
    title: `Lesson 1`,
    artist: 'Pimsleur',
    album: 'French Level 1',
    contentType: 'mp3',
    artwork:
      'https://d3nhzmkfu4bi2a.cloudfront.net/French/French%20Level%201%202018/asset/lesson_photo/full/FR_1_M_01.jpg?versionId=ENxibsGeel0002FgH_DzPNrSb5xxho5N',
    pitchAlgorithm: PitchAlgorithm.Voice,
  },
  {
    url: 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
    title: `Demo`,
    artist: 'Unkown artist',
    album: 'DemoDemo',
    contentType: 'wav',
    pitchAlgorithm: PitchAlgorithm.Voice,
  },
];

function App(): React.JSX.Element {
  const [hasInitPlayer, setHasInitPlayer] = React.useState(false);
  const {playing, bufferingDuringPlay} = useIsPlaying();
  const {duration, position} = useProgress();
  const activaTrack = useActiveTrack();

  React.useEffect(() => {
    const stateListener = TrackPlayer.addEventListener(
      Event.PlaybackState,
      async data => {
        console.log('data', data);
      },
    );
    return () => {
      stateListener.remove();
    };
  }, []);

  const playLesson = async () => {
    if (!hasInitPlayer) {
      // setup audio player
      await SetupAudioPlayService();
      setHasInitPlayer(true);
      // load and play the sample track
      await TrackPlayer.add(sampleTracks);
    }
    await TrackPlayer.play();
  };

  const pauseLesson = async () => {
    await TrackPlayer.pause();
  };

  const playBackward = async () => {
    await TrackPlayer.seekBy(-10);
  };

  const playForward = async () => {
    await TrackPlayer.seekBy(10);
  };

  const playPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const playNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const slideComplete = async (value: number) => {
    await TrackPlayer.seekTo(value);
  };

  return (
    <SafeAreaView>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <ImageBackground
        style={styles.blurBackground}
        source={require('../player/assets/default_cover.png')}
        resizeMethod={'resize'}
        blurRadius={50}>
        <Image
          source={
            activaTrack?.artwork
              ? {uri: activaTrack.artwork}
              : require('../player/assets/default_cover.png')
          }
          style={styles.blurBackground}
          blurRadius={50}
          resizeMethod={'resize'}
          resizeMode={'cover'}
        />
        <View style={styles.overlay} />
      </ImageBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic">
        <ImageBackground
          style={styles.coverImageBkg}
          imageStyle={styles.coverImage}
          source={require('../player/assets/default_cover.png')}>
          <Image
            source={
              activaTrack?.artwork
                ? {uri: activaTrack.artwork}
                : require('../player/assets/default_cover.png')
            }
            resizeMethod="resize"
            resizeMode="cover"
            style={styles.coverImage}
          />
        </ImageBackground>

        <View style={styles.lessonInfoView}>
          <Text style={styles.lessonTitle}>
            {activaTrack?.title ?? 'Sample Lesson'}
          </Text>
          <Text style={styles.lessonAlbum}>
            {activaTrack?.album ?? 'Pimsleur'}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#666666"
            thumbTintColor="#FFFFFF"
            onSlidingComplete={slideComplete}
          />
          <View style={styles.timeView}>
            <Text style={styles.timeText}>
              {moment.utc(position * 1000).format('m:ss')}
            </Text>
            <Text style={styles.timeText}>
              {moment.utc(duration * 1000).format('m:ss')}
            </Text>
          </View>
        </View>
        <View style={styles.controlView}>
          <TouchableOpacity
            style={[styles.playButton, styles.skipMargin]}
            onPress={playPrevious}>
            <Image
              source={require('../player/assets/media-skip-previous.png')}
              style={styles.playButton}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton} onPress={playBackward}>
            <IconBackward />
          </TouchableOpacity>
          {!bufferingDuringPlay && !playing && (
            <TouchableOpacity style={styles.playButton} onPress={playLesson}>
              <IconPlay />
            </TouchableOpacity>
          )}
          {!bufferingDuringPlay && playing && (
            <TouchableOpacity style={styles.playButton} onPress={pauseLesson}>
              <IconPause />
            </TouchableOpacity>
          )}
          {bufferingDuringPlay && (
            <View style={styles.iconLoading}>
              <LoadingSpinner
                content={
                  <Image
                    source={require('../player/assets/spinner-grey.png')}
                  />
                }
              />
            </View>
          )}
          <TouchableOpacity style={styles.playButton} onPress={playForward}>
            <IconForward />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.playButton, styles.skipMargin]}
            onPress={playNext}>
            <Image
              source={require('../player/assets/media-skip-next.png')}
              style={styles.playButton}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 30}}>
          <Text style={[styles.lessonTitle, {paddingHorizontal: 20}]}>
            Practice
          </Text>
          <Text style={styles.practiceTip}>
            Practice the contents of this lesson here.
          </Text>
          <View style={{marginVertical: 20}}>
            {practices.map(item => (
              <TouchableOpacity key={item.title} style={styles.practiceItem}>
                <Image source={item.image} style={{marginHorizontal: 10}} />
                <View style={{flex: 1}}>
                  <Text style={styles.practiceTitle}>{item.title}</Text>
                  <Text style={styles.practiceDescription}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  blurBackground: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
  },
  overlay: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  playButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  playButtonText: {
    color: 'white',
  },
  controlView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  coverImageBkg: {
    width: 300,
    height: 300,
    marginTop: 64,
    alignSelf: 'center',
    borderRadius: 8,
  },
  coverImage: {
    width: 300,
    height: 300,
    borderRadius: 8,
  },
  iconLoading: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipMargin: {
    marginHorizontal: 5,
  },
  lessonInfoView: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  lessonTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  lessonAlbum: {
    color: '#f0f0f0',
    fontSize: 15,
  },
  slider: {
    width: '100%',
    marginTop: 20,
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    color: 'white',
    fontSize: 14,
  },
  practiceTip: {
    color: '#f0f0f0',
    fontSize: 15,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  practiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  practiceTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  practiceDescription: {
    color: '#dedede',
    fontSize: 14,
  },
});

export default App;
