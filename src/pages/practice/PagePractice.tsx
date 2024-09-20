import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {BackgroundImageView} from '../../components/BackgroundImageView';

export const PagePractice = ({navigation}: any) => {
  return (
    <View style={{flex: 1}}>
      <BackgroundImageView />
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          keyExtractor={item => item.toString()}
          renderItem={({item}) => (
            <Pressable
              style={{
                padding: 20,
                borderColor: '#ededed',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#ffffff',
                marginHorizontal: 20,
                marginVertical: 10,
              }}
              onPress={() => {
                navigation.navigate('Details');
              }}>
              <Text>Go to Details</Text>
            </Pressable>
          )}
        />
    </View>
  );
};
