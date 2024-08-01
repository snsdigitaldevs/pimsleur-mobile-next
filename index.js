/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/routes/App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import PlaybackService from './src/player/PlaybackService';

AppRegistry.registerComponent(appName, () => App);

TrackPlayer.registerPlaybackService(() => PlaybackService);
