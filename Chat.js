import React, {Component} from 'react';
import { StyleSheet, NativeModules,TouchableOpacity,Text, View, Button, Dimensions, Image } from 'react-native';
import Backend from "./Backend.js";
import { GiftedChat, Actions, SystemMessage,
  ActionsProps, InputToolbar, Send} from "react-native-gifted-chat";
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import CustomBack from './CustomBack'
import Icon from 'react-native-vector-icons/Ionicons';
import IndicatorCustom from './IndicatorCustom'
import ImagePicker from 'react-native-image-picker';
// import { EventRegister } from 'react-native-event-listeners';
import moment from 'moment'
const {Agora} = NativeModules
console.log(Agora)

const {
    FPS30,
    AudioProfileDefault,
    AudioScenarioDefault,
    Host,
    Adaptative
} = Agora

type Props = {};

const options = {
    title: 'Select Avatar',
    maxWidth : 500,
    maxHeight : 500,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class Chat extends Component<Props> {
    state = {
        avatarSource:'https://reactjs.org/logo-og.png',
        messages: [ 
    {
    _id: 1,
    text: 'Hi! Please select to continue...',
    createdAt: new Date(),
    quickReplies: {
      type: 'radio', // or 'checkbox',
      keepIt: true,
      values: [
        {
          title: 'Video Call',
          value: 'yes',
        },
        {
          title: 'Chat',
          value: 'yes_picture',
        },
      ],
    },
    user: {
      _id: 2,
      name: 'Bot',
    },
  },


        {
          _id: 0,
          text: 'Hello Rahul, I’m Dr. Harshit and I’ll be handling your case today. Please explain your health concern in details.',
          createdAt: moment().format(),
          system:true,
        },
    ],
        imageUrl:'',        
        isTyping:true,
    };

  uploadImage=()=>{
  ImagePicker.showImagePicker(options, (response) => {
  // console.log('Response = ', response);
 
  if (response.didCancel) {
    console.log('User cancelled image picker');
  } else if (response.error) {
    console.log('ImagePicker Error: ', response.error);
  } else if (response.customButton) {
    console.log('User tapped custom button: ', response.customButton);
  } else {
    const source = { uri: response.uri };
 
    // You can also display the image using data:
    // const source = { uri: 'data:image/jpeg;base64,' + response.data };
 
    this.setState({
      avatarSource: source.uri,
    });
    this.uploadImageAfterSelection(source.uri)
    // GLOBAL.img = source.uri
//    alert(GLOBAL.img)
  }
});
}

        uploadImageAfterSelection(image){
            console.log(image)
            var id ="chat/" + GLOBAL.chat_g_id +'200'
            const url = GLOBAL.BASE_URL + "image_attchment_for_chat";
            const data = new FormData();
            data.append('bridge_id', GLOBAL.chat_g_id);
            data.append('firebase_gId', id);
            data.append('flag', 1);
            // you can append anyone.
            data.append('image', {
                uri: image,
                type: 'image/jpeg', // or photo.type
                name: 'image.png'
            });
           console.log(JSON.stringify(data))
            fetch(url, {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((response) => response.json())
                .then((responseJson) => {
                console.log(JSON.stringify(responseJson))
                alert('Image added')
                if (responseJson.status == true) {
                    this.setState({imageUrl: responseJson.images})
                }else{

                }
                })
          .catch((error) => {
          // this.hideLoading()
          console.error(error);

        });
    }

    renderBubble(props) {

        return (
            <View style = {{backgroundColor:'rgba(0,0,0,0.6)',borderRadius:12,marginBottom:6,borderColor:'#979797',borderWidth:1,flexDirection:'row'}}>


                <Text style={{color:'#7BAAED',fontSize:16,margin:4,marginLeft:8}}>{props.currentMessage.user.name} :</Text>


                <Text style={{color:'white',fontSize:16,margin:4}}>{props.currentMessage.text}</Text>

            </View>
        );
    }

// sendFinalImage=()=>{
//     Backend.sendImage(this.state.avatarSource)    
// }

    
renderActions=(props: Readonly<ActionsProps>) =>{
    return (
      <Actions
        {...props}
        options={{
          ['Send Image']: this.uploadImage,
          ['Send Pdf']: this.uploadImage,
        }}
        icon={() => (
          <Icon name={'ios-document'} size={28} color={'blue'} />
        )}
        onSend={args => {
                    console.log('------>'+JSON.stringify(args))
                    // Backend.sendImage(args);
        }}
      />
    )
  }

    renderSend(props) {
        return (
            <Send
                {...props}
            containerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginRight: 0,
            }}>
                <View style={{marginRight: 10, marginBottom: 10}}>
                    <Image style={{width: 50, height:50, resizeMode:'contain'}}
                    source={require('./resources/send.png')} />
                </View>
            </Send>
        );
    }
    renderBubble(props) {

        return (
            <View>
                <Text style={{color:'black'}}>{props.currentMessage.user.name}</Text>
            </View>
        );
    }

    renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={{ backgroundColor: 'white', width:'85%',
    borderRadius: 12,elevation:5,
    padding: 15}}
        textStyle={{ fontSize: 14,
    color: '#1E1F20',lineHeight:20,fontFamily:'AvenirLTStd-Heavy'
    }}
      />
    );
    }
    

 //    renderFooter=(props)=> {
 // if (this.state.isTyping) {
 //        // if (this.typingTimeoutTimer == null) {
 //        //   this.startTimer();
 //        // }
 //        return <Text>TYping</Text>;
 //      } 
 //    return null;
 //    }
    videoCall=()=>{
      this.props.navigation.navigate("VideoCall", {
                              uid: Math.floor(Math.random() * 100),
                              clientRole: Host,
                              channelName: '124421',
                              onCancel: (message) => {
                                  this.setState({
                                      visible: true,
                                      message
                                  });
                  }})           

    }
    

    render() {
        return (

<View style={{flex:1, backgroundColor:'#f5f5f5'}}>
         <CustomBack headTitle={'Chat'}
         navigation={this.props.navigation}/>

         <TouchableOpacity style={{position:'absolute', top:18, right:15}}
         onPress={()=> this.videoCall()}>
         <Image style={{width:25, height:28, resizeMode:'contain',}}
         source={require('./resources/Path.png')}
         />
         </TouchableOpacity>

            <GiftedChat
                renderUsernameOnMessage = {true}
                renderLoading={() => <IndicatorCustom />}
                messages={this.state.messages}
                isAnimated
                renderAvatarOnTop
                onSend={message => {
        
                        // attach image key to message then sendMessage
                        const img = {
                            image: this.state.imageUrl
                        }
                       var obj =  message[0]
                       Object.assign(obj, img)                        
                        console.log(JSON.stringify(message))

                        Backend.sendMessage(message);
                        this.setState({imageUrl : ''})

                        // console.log(JSON.stringify(message))
                        // Backend.sendMessage(message);


                }}
                scrollToBottom
                isTyping ={true}
                renderSystemMessage={this.renderSystemMessage}
                scrollToBottomComponent={() => (
                          <Icon name='ios-arrow-down' size={30} color='#000' />
                 )}                
                user={{
                    _id: GLOBAL.user_id,
                    name: GLOBAL.userDetails.name
                }}
                // renderFooter={this.renderFooter}                
                renderActions={this.renderActions}
                onQuickReply ={(value)=> alert(JSON.stringify(value))}
                renderSend={this.renderSend}
            />
    </View>
        );
    }


    componentDidMount() {
        Backend.loadMessages(message => {
            this.setState(previousState => {
                return {
                    messages: GiftedChat.append(previousState.messages, message)
                };
            });
        });
    }
    componentWillUnmount() {
        Backend.closeChat();
    }
}