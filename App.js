import React, {Component} from 'react';
import {Platform, StyleSheet,Dimensions, Text, View,Alert,StatusBar,PermissionsAndroid,} from 'react-native';
import 'react-native-gesture-handler';
import NetInfo from "@react-native-community/netinfo";
const { width } = Dimensions.get('window');
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import AppNavigator from './Navigator';
import NotifService from './NotifService';
const GLOBAL = require('./Global');
import appConfig from './app.json';
import PushNotificationAndroid  from 'react-native-push-notification';
import { MenuProvider } from 'react-native-popup-menu';
import AsyncStorage from '@react-native-community/async-storage';


function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}



export default class App extends Component<Props> {
  constructor(props) {
      super(props);
      this.state = {
        gotNotif:0,
        isConnected:false,
        senderId: appConfig.senderID,
        netalert : 0,
      };
     this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));

      // console.disableYellowBox = true;
    }


    componentDidMount(){

      const unsubscribe = NetInfo.addEventListener(state => {
  console.log("Connection type", state.type);
  console.log("Is connected? "+ state.isConnected);
        if(state.isConnected){
          this.setState({netalert : 0})
        }else{
//          this.dropDownAlertRef.alertWithType('error', 'Error', 'No Internet Connection.');
        }
      });
    }

  render() {
    //alert(this.state.netalert)
    return (
  <MenuProvider>

   <SafeAreaProvider>
        <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1 }}>
        <StatusBar backgroundColor={'black'}/>

         <AppNavigator/>
     

      </SafeAreaView>
     </SafeAreaProvider>
     </MenuProvider>

    );
  }


  onRegister(token) {
      AsyncStorage.setItem('token', token.token);
      GLOBAL.firebaseToken= token.token
      console.log( 'TOKEN:', token );
      this.setState({ registerToken: token.token, fcmRegistered: true });
    }

    onNotif(notif) {
//    IncomingCall.display(this.uuid(), 'asdsa', './resources/fbaby.png');

      console.log(notif);
     Alert.alert(notif.title, notif.message);
      this.setState({gotNotif: 1})
    }

    handlePerm(perms) {
      Alert.alert("Permissions", JSON.stringify(perms));
    }


  }


const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: 'green',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    top: 30,
  },
  offlineText: {
    color: '#fff',
  },
});
