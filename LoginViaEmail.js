import React, {Component} from 'react';
import { StyleSheet,TextInput,Text, View,Linking,Image ,Animated,Easing,Alert,Dimensions ,TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
var randomString = require('random-string');
import CheckBox from 'react-native-check-box'
import IndicatorCustom from './IndicatorCustom'
var validator = require("email-validator");

export default class LoginViaEmail extends Component {
   static navigationOptions = ({ navigation }) => {
    return {
       header: () => null,
    }
}

 constructor(props) {
    super(props)
    this.state = {
      email:'',
      elevations:0,
    }
    this.anim = new Animated.Value(0)
    this.login = this.login.bind(this);
  }


  showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }


  updateInfo() {
      this.setState({
        valid: this.phone.isValidNumber(),
        type: this.phone.getCountryCode(),
        value: this.phone.getValue()
      });
    }

  login=()=>{
//        this.props.navigation.replace('Otp', {params:'LoginOtp'})

  if(validator.validate(this.state.email)){
      var genOtp = randomString({
          length: 4,
          numeric: true,
          letters: false,
          special: false,
      });
      this.showLoading()
    console.log(JSON.stringify({
        from: 'email',
        reciever: this.state.email,
        otp: genOtp,
      }))
    GLOBAL.loginmobile= this.state.email
    GLOBAL.loginOTP = genOtp
      const url = GLOBAL.BASE_URL +  'otp'
    //  this.showLoading()
      fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'email',
        reciever: this.state.email,
        otp: genOtp,
      }),
    }).then((response) => response.json())
        .then((responseJson) => {

            console.log(JSON.stringify(responseJson))
             this.hideLoading()
           if (responseJson.status == true) {

    //      this.setState({ results: responseJson.user_detail })
            this.props.navigation.navigate('Otp', {params: {login_Type: 'email', condition: responseJson.condition}})
           }
           else{
//            alert('It seems you are not registered with us. Please signup to continue.')
           }
        })
        .catch((error) => {
          this.hideLoading()
          console.error(error);

        });

      }else{

        alert('Invalid email id')
      }

  }

  componentDidMount(){
    this.handleAnimation()
  }


  _handlePress=()=>{
    if(this.state.mobiles == this.state.mobile){
      alert('An OTP has been sent to your registered mobile number!')
      this.props.navigation.navigate('Otp')      
    }else{
      alert('It seems you are not registered with us!')
    }
  }



  _handleSkip = ()=>{
//    alert('skip')
      GLOBAL.user_id =  '0'
      this.props.navigation.replace('DrawerNavigator')
  }

 handleAnimation = () => {
        Animated.timing(this.anim, {
            toValue: 1,
            duration: 1700,
            easing: Easing.ease,
            useNativeDriver: true
        }).start()
 }


  render() {

    if(this.state.loading){
      return(
        <IndicatorCustom/>
      )
    }

    return (
      <View style={styles.container}>


    <KeyboardAwareScrollView style={{ height:hp(100)}}
    keyboardShouldPersistTaps='handled'
    >

         <View style={{flexDirection:'column',alignItems:'center',backgroundColor:'transparent',height:hp(97)}}>


         <View style={{width:wp('100%'), marginTop:hp('0%'),flex:1}}>


         <Image style = {{width:80, height:80, marginLeft:wp(6.5),resizeMode:'contain', marginTop:hp('5%'),}} source={require('./resources/logo.png')}/>
          <Text style = {{width:wp('70%'),color:'black',fontSize: 23,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginTop:hp('5%'), marginLeft:wp('8%'), lineHeight:25}}>
          Please enter your Email Id</Text>



          <Text style = {{width:wp('70%'),color:'black',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginTop:hp('3%'), marginLeft:wp('8%'),}}>
          Email Id</Text>

          <View style = {{flexDirection:'row',marginTop:hp('1%'),width:wp('82%'),height:hp('7%'),
           borderColor:'#F0F0F0',borderRadius:5, borderWidth:2, elevation: this.state.elevations, backgroundColor:'white', marginLeft:wp('8%')}}>
        
        <TextInput style={{width:wp('78%'), height:hp('7%'),fontFamily:'AvenirLTStd-Medium', color:'black',marginLeft:wp('2%')}}
          placeholder={'abc@gmail.com'}
          autoFocus={true} 
          onChangeText={(text) => this.setState({email:text})}
          value={this.state.email}
        />
          </View>

          <Text style = {{width:wp('75%'),color:'#BDBDBD',fontSize: 14,fontFamily:'AvenirLTStd-Medium',fontSize:16,textAlign:'left', marginLeft:wp('8%'),marginTop:wp('5%')}}>
          An OTP will be sent to this email
          </Text>

    

          <TouchableOpacity style={{width:wp('82%'),borderRadius:5, marginTop:hp('4%'),
           backgroundColor:'#1976D2',height:hp('7%'),alignSelf:'center', marginRight:wp('2%')}}
           onPress={this.login}>
          <View style={{width:'100%', height:hp('7%'), justifyContent:'center',alignItems:'center'}}>
          <Text style = {{color:'white',fontSize: 18,fontFamily:'AvenirLTStd-Heavy',
          alignSelf:'center'}}>
          Continue
          </Text>
          </View>
          </TouchableOpacity>



         </View>

    
         </View>

          <Animated.View style = {{flexDirection:'column',width:wp('90%'),height:hp('28%'),
           borderColor:'#F0F0F0',borderRadius:10, borderWidth:2, elevation: this.state.elevations,
            backgroundColor:'white', alignSelf:'center',position:'absolute', bottom:-4
            , transform:[{
                                translateY: this.anim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [200, 0],
                                })
                            },]}}>

          <Text style = {{color:'black',fontSize: 18,fontFamily:'AvenirLTStd-Heavy',textAlign:'center',marginTop:hp('3%'),}}>
          Need Help?</Text>

          <View style={{flexDirection:'row', marginTop:hp(2), alignItems:'center'}}>

           <Image style = {{width:52, height:52, marginLeft:wp(6),resizeMode:'contain', }} source={require('./resources/call.png')}/>
           <View style={{flexDirection:'column', marginLeft:wp(3)}}>
          <Text style = {{color:'black',fontSize: 15,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',}}>
          Call Us</Text>
          <Text style = {{color:'#1976D2',fontSize: 16,fontFamily:'AvenirLTStd-Medium',textAlign:'left',}}
          onPress={()=> Linking.openURL(`tel:`+'1800-220-333')}>
          1800-220-333</Text>
          </View>
          </View>

          <View style={{flexDirection:'row', marginTop:hp(3), alignItems:'center',}}>

           <Image style = {{width:52, height:52, marginLeft:wp(6),resizeMode:'contain', }} source={require('./resources/mail.png')}/>
           <View style={{flexDirection:'column', marginLeft:wp(3)}}>
          <Text style = {{color:'black',fontSize: 15,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',}}>
          Email Us</Text>
          <Text style = {{color:'#1976D2',fontSize: 16,fontFamily:'AvenirLTStd-Medium',textAlign:'left',}}
          onPress={()=> Linking.openURL(`mailto:`+'support@easemymed.com')}>
          support@easemymed.com</Text>
          </View>
          </View>

           </Animated.View>


         </KeyboardAwareScrollView>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#FAFAFA'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

});
