/* eslint-disable */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ENV from '../../env';
import { timeDifference } from '../../helpers/timeDifference';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as storyActions from '../../store/actions/stories';
import { useDispatch, useSelector } from 'react-redux';




const UserView = (props) => {
  const { story } = props;
  const loggedInUserId = useSelector(state => state.auth.user._id);

  const dispatch = useDispatch();




  // messages you recieve when you are about to delete a story
  const deleteHandler = (id) => {
    Alert.alert(
      'Are you sure?',
      'Do you really want to delete this story?',
      [
        { text: 'No', style: 'default' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            await dispatch(storyActions.deleteStory(id));

            showMessage({
              message: "Your story was successfully deleted.",
              type: "success",
              icon: { icon: "success", position: 'left' },
              duration: 3000
            });

          }
        }
      ]
    )
  };




  return (
    <View style={styles.userView}>



      <Image
        source={{ uri: `${ENV.apiUrl}/user/photo/${props.profile}` }}
        style={styles.image}
      />




      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{props.name.username}</Text>
        <Text style={styles.time}>{timeDifference(new Date(), new Date(props.postedTime))} </Text>
      </View>
      <TouchableOpacity onPress={props.onClosePress}>
        <Icon
          name="close"
          color="white"
          size={25}
          style={{ marginRight: 8 }}
        />
      </TouchableOpacity>



      {loggedInUserId === story.postedBy._id &&
        <TouchableOpacity onPress={deleteHandler.bind(this, story._id)}>
          <MaterialCommunityIcons

            name="delete-outline"

            color="white"
            size={25}
            style={{ marginRight: 8 }}
          />
        </TouchableOpacity>}






    </View>


  );
};

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 8,
  },
  userView: {
    flexDirection: 'row',
    position: 'absolute',
    top: 55,
    width: '98%',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 12,
    color: 'white',
  },
  time: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 3,
    marginLeft: 12,
    color: 'white',
  },
});

export default UserView;
