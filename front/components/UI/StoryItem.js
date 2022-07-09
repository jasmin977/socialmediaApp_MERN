import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, ActivityIndicator, Platform, Alert, TouchableNativeFeedback, Dimensions } from 'react-native';
import {
    Ionicons, MaterialCommunityIcons, Entypo,
    Octicons
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { timeDifference } from '../../helpers/timeDifference';

import Colors from '../../constants/Colors';
import ENV from '../../env';
import { useDispatch } from 'react-redux';
import * as storiesActions from '../../store/actions/stories';
import { showMessage } from "react-native-flash-message";
import VerifiedUser from '../../constants/VerifiedUser';

const Storyitem = (props) => {
    const { story, userId, fromUserProfile } = props;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // const liked = post.likes.indexOf(userId) !== -1;

    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageUri, setImageUri] = useState('')
    const [showFullBody, setShowFullBody] = useState(false);
    const [imgWidth, setImgWidth] = useState();
    const [imgHeight, setImgHeight] = useState();

    const onImageErrorHandler = () => {
        setImageUri(ENV.defaultImageUri)
    }


    let TouchableComp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComp = TouchableNativeFeedback;
    }


    const deleteHandler = (id) => {
        Alert.alert(
            'Are you sure?',
            'Do you really want to delete this post?',
            [
                { text: 'No', style: 'default' },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: async () => {
                        await dispatch(storiesActions.deleteStory(id))
                        showMessage({
                            message: "Your post was successfully deleted.",
                            type: "success",
                            icon: { icon: "success", position: 'left' },
                            duration: 3000
                        });
                    }
                }
            ]
        )
    };

    

    useEffect(() => {
        let imageUrl = `${ENV.apiUrl}/story/photo/${story._id}?${new Date(story.updated)}`;
        Image.getSize(imageUrl, (width, height) => {
            // calculate image width and height 
            const screenWidth = Dimensions.get('window').width
            const scaleFactor = width / screenWidth
            const imageHeight = height / scaleFactor
            setImgWidth(screenWidth);
            setImgHeight(imageHeight);
        })
    }, [])


    return (
      
            <View >


<TouchableOpacity
                                    style={{
                                        width: 75,
                                        height: 75,
                                        borderRadius: 100,
                                    margin:5,
                                        borderColor: '#D4AF37' ,
          
                                        borderWidth: 3.5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                
                                >
                                 <Image
                         style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 100,

                                        }} resizeMode="cover"
                        source={{ uri: `${ENV.apiUrl}/story/photo/${story._id}?${new Date(story.updated)}` }}
                        onLoad={() => setIsImageLoading(false)}
                    />
                    <ActivityIndicator
                        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        animating={isImageLoading}
                        size='large'
                        color={Colors.gold}
                    />
                                </TouchableOpacity>
                                <View style={{ marginTop: 5, alignItems: 'center' }}>

                                    <Text style={{ marginTop: 4, color: 'black', fontSize: 12 }}>
                                        name here
                                    </Text>
                                </View>
                   
  
   </View>

       
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EBECF4"
    },

    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#111",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#fff"
    },
    timestamp: {
        fontSize: 11,
        color: "grey",
        marginTop: 4
    },
    post: {
        marginTop: 10,
        fontSize: 12,
        color: "white"
    },
    postImage: {
        width: '100%',
        height: 250,
        borderRadius: 5,
        marginVertical: 16,

    }
})

export default Storyitem;