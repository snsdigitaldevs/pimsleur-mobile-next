import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {BackgroundImageView} from '../../components/BackgroundImageView';
import {CustomSafeArea} from '../../components/CustomSafeArea';

export const PagePractice = ({navigation}: any) => {
  return (
    <CustomSafeArea customStyle={{flex: 1}} withNavigation withTabBar>
      <BackgroundImageView />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={item => item.toString()}
        renderItem={({item}) => (
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate('Details');
            }}>
            <Text>Go to Details</Text>
          </Pressable>
        )}
      />
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
