import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {BackgroundImageView} from '../../components/BackgroundImageView';

export const PageLearn = ({navigation}: any) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <BackgroundImageView />
      <Text style={{color:"#ffffff"}}>PageLearn</Text>
      <TouchableOpacity
        style={{
          padding: 10,
          borderColor: '#ededed',
          borderWidth: 1,
          borderRadius: 5,
          backgroundColor: '#ffffff',
        }}
        onPress={() => {
          navigation.navigate('Details');
        }}>
        <Text>Go to Details</Text>
      </TouchableOpacity>
    </View>
  );
};
