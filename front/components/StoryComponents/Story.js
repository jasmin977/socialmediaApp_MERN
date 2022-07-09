/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Dimensions, ImageBackground, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
// import Image from 'react-native-scalable-image';
import PropTypes from 'prop-types';
import {
  FontAwesome, AntDesign, MaterialCommunityIcons,
  Octicons
} from '@expo/vector-icons';
import ENV from '../../env';

import { useDispatch, useSelector } from 'react-redux';

const ScreenWidth = Dimensions.get('window').width;

const Story = (props) => {
  const { story, pause } = props;
  const loggedInUserId = useSelector(state => state.auth.user._id);
  return (
    <View style={styles.container}>
      {/* {!props.isLoaded && (
      <View style={styles.loading}>
        <ActivityIndicator color="white" />
      </View>
      )} */}


      <ImageBackground
        source={{ uri: `${ENV.apiUrl}/story/photo/${story._id}` }}
        onLoadEnd={props.onImageLoaded}
        style={styles.content}
        resizeMode="stretch"
      // width={ScreenWidth}
      >

        {loggedInUserId === story.postedBy._id &&
          <TouchableOpacity style={{ position: 'absolute', bottom: 50, justifyContent: 'center', alignItems: 'center', right: 20, flexDirection: 'row', marginHorizontal: 10 }}>
            <AntDesign
              name='eyeo'
              size={30}
              color="white"
            />


            <Text style={{ fontSize: 25, color: 'white', marginHorizontal: 5 }}>
              {story.views.length}

            </Text>
          </TouchableOpacity>}

      </ImageBackground>


    </View>
  );
};

Story.propTypes = {
  story: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  imageContent: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  loading: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default Story;
