import React, {Component} from 'react';
import { StyleSheet,Text, View,ImageBackground,Animated,Easing,Image,Dimensions} from 'react-native';
const GLOBAL = require('./Global');
type Props = {};
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';


export default class Splash extends Component {
   static navigationOptions = ({ navigation }) => {
    return {
       header: () => null,
    }
}

 constructor(props) {
    super(props)
    this.state = {
    }


  }


  componentDidMount(){
  this.timeoutCheck = setTimeout(() => {
    this.proceed()
   }, 2000);
  }



  proceed=()=>{
     var value =  AsyncStorage.getItem('userID');
    value.then((e)=>{

    if (e == '' || e == null ){
         this.props.navigation.replace('Slider')
    }else {
       GLOBAL.user_id = e
       this.props.navigation.replace('Tab')
    }

    })

  }

  render() {
    return (
      <View style={styles.container}>
       <ImageBackground style = {{width :wp('100%') ,height : hp('100%')}}
         source={require('./resources/splash.png')}>
         </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

});
