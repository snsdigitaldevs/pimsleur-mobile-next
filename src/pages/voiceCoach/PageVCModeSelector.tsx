import React from 'react';
import {Text, View} from 'react-native';
import {BackgroundImageView} from '../../components/BackgroundImageView';

export const PageVoiceCoachHome = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <BackgroundImageView />
      <Text style={{color: '#ffffff'}}>PageVoiceCoach</Text>
    </View>
  );
};
