import React, {Component} from 'react';
import { StyleSheet,TextInput,Text, View,Platform,Image,ImageBackground ,Alert,Dimensions ,TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
// import OTPInput from 'react-native-otp';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import NetInfo, {NetInfoSubscription} from "@react-native-community/netinfo";
import IndicatorCustom from './IndicatorCustom'
import OTPInputView from '@twotalltotems/react-native-otp-input'

import CodeInput from 'react-native-confirmation-code-input';

// get all required values of device
let uniqueId = DeviceInfo.getUniqueId();
let hasNotch = DeviceInfo.hasNotch();
// console.log(RNLocalize.getCountry());

var deviceNetinfo = NetInfo.fetch().then(state => {
  GLOBAL.deviceIp = state.details.ipAddress
  console.log(JSON.stringify(state))
  console.log("Connection type", state.details.ipAddress);
  console.log("Is connected?", state.isConnected);
});

//alert(GLOBAL.deviceIp)
DeviceInfo.getManufacturer().then(manufacturer => {
  GLOBAL.deviceManuf = manufacturer
});

DeviceInfo.getCarrier().then(carrier => {
  GLOBAL.deviceCarrier = carrier
});

let model = DeviceInfo.getModel();

type Props = {};
export default class Otp extends Component {
   static navigationOptions = ({ navigation }) => {
    return {
       header: () => null,
    }
}

 constructor(props) {
    super(props)
    this.state = {
      otp:'',
      elevations:10,
      results:''
    }
  }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }


  componentDidMount(){
    alert('otp--->'+GLOBAL.loginOTP)

    console.log('otp--->'+GLOBAL.loginOTP)
    console.log('OTP screen '+JSON.stringify(this.props.route.params))
  }

  _onFulfill=(code)=>{
   // this.setState({otp : code})
    this._handlePress(code)
//    this.props.navigation.navigate('Signup')
  }


  _handlePress=(code)=>{
    console.log('OTP screen '+JSON.stringify(this.props.route.params))

    var code= code
    var loginType = this.props.route.params.params.login_Type
    var otpType = this.props.route.params.params.condition
      console.log(otpType)

    if(otpType == 1){
      if(code == GLOBAL.loginOTP){
//        alert('user_detail_after_otp')
      //this.props.navigation.replace('DrawerNavigator')
     const url = GLOBAL.BASE_URL +  'user_detail_after_otp'
     var body={
        from: loginType,
        reciever: GLOBAL.loginmobile,
        ip_address : "",
        deviceID: "",
        deviceType: Platform.OS,
        deviceToken:"",
        model_name: "",
        carrier_name: "",
        device_country: 'India',
        device_memory: '',
        has_notch: "",
        manufacture: GLOBAL.deviceManuf,
      }
      console.log(JSON.stringify(body))
      this.showLoading()
       fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

      body: JSON.stringify(body),
    }).then((response) => response.json())
        .then((responseJson) => {
          console.log(JSON.stringify(responseJson))
          this.hideLoading()
         if (responseJson.status == true) {

            this.setState({ results: responseJson.user_detail })

            GLOBAL.user_id = responseJson.user_detail.user_id

             AsyncStorage.setItem('userID', this.state.results.user_id);
             AsyncStorage.setItem('image', this.state.results.image);
             AsyncStorage.setItem('name', this.state.results.name);
             AsyncStorage.setItem('email', this.state.results.email);
             AsyncStorage.setItem('mobile', this.state.results.mobile);
            this.props.navigation.replace('Tab')
           }else{
            alert(responseJson.msg)
          }
        })
        .catch((error) => {
          console.error(error);
           this.hideLoading()
        });

      }else{
        alert('Invalid OTP')
      }

    }else if(otpType == 0){
    //  alert(loginType)
    //  alert('It seems you are not registered with us. Please fillout details to continue.')
      this.props.navigation.navigate('Agreement', {params:{ login_Type: loginType }})

//       if(code ==  GLOBAL.signupOtp){
//             const url = GLOBAL.BASE_URL +  'Signup'
//   //          console.log(url)
// //            console.log(GLOBAL.myname+'--' + GLOBAL.myemail+'--'+GLOBAL.mymobile+'--' +DeviceInfo.getUniqueId())
//     //  this.showLoading()
//       fetch(url, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },


//   body: JSON.stringify({
//     name: GLOBAL.signupName,
//     mobile: GLOBAL.signupMobile,
//     email: GLOBAL.signupEmail,
//     auth : 'normal',
//     gender: GLOBAL.signupGender,
//     dob: GLOBAL.signupDob,
//     deviceID: uniqueId,
//     deviceType: Platform.OS,
//     deviceToken: GLOBAL.firebaseToken,
//     model_name: model,
//     carrier_name: GLOBAL.deviceCarrier,
//     device_country: 'India',
//     device_memory: '',
//     country_code: GLOBAL.signupCountryCode,
//     has_notch: hasNotch,
//     manufacture: GLOBAL.deviceManuf,
//     ip_address: GLOBAL.deviceIp,
//     is_refer_verify: GLOBAL.signupVerifyRefer,
//     apply_to: GLOBAL.signupApplyRefer,
//     referral_code_other: GLOBAL.signupReferCode


//   }),
// }).then((response) => response.json())
//     .then((responseJson) => {
//       console.log(JSON.stringify(responseJson))
//       //this.hideLoading()
//      if (responseJson.status == true) {

//       this.setState({ results: responseJson.user_detail })

//         GLOBAL.user_id = responseJson.user_detail.user_id


//          AsyncStorage.setItem('userID', this.state.results.user_id);
//          AsyncStorage.setItem('image', this.state.results.image);
//          AsyncStorage.setItem('name', this.state.results.name);
//          AsyncStorage.setItem('email', this.state.results.email);
//          AsyncStorage.setItem('mobile', this.state.results.mobile);
//         this.props.navigation.replace('DrawerNavigator')
//        }else{
//         alert(responseJson.msg)
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//        //this.hideLoading()
//     });


      }else{
        alert('Invalid OTP')
      }


  }

  handleOTPChange = (otp) => {
    this.setState({ otp })
  }

  clearOTP = () => {
    this.setState({ otp: undefined })
  }

  autoFill = () => {
    this.setState({ otp: '221198' })
  }





  render() {

        if(this.state.loading){
            return(
              <IndicatorCustom/>
            )
        }

    return (
      <View style={styles.container}>


    <KeyboardAwareScrollView contentContainerStyle = {{height:window.height}}keyboardShouldPersistTaps='handled'>


         <View style={{flexDirection:'column',flex:1, alignItems:'center',}}>


         <View style={{width:wp('100%'), marginTop:hp('5%'),}}>

         <TouchableOpacity style={{marginLeft:wp(4)}} onPress={()=> this.props.navigation.goBack()}>
          <View style = {{flexDirection:'row',width:wp('82%'),height:hp('7%'), }}>
          <Image style={{width:25, height:25, resizeMode:'contain'}}
          source={require('./resources/back.png')}/>
         <Text style = {{width:wp('75%'),color:'#000000',fontSize: 20,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginLeft:wp(2)}}>
         Back
          </Text>
          </View>
         </TouchableOpacity>

          <Text style = {{color:'#222222',fontSize: 22,fontFamily:'AvenirLTStd-Heavy',textAlign:'left', lineHeight:35,marginTop:hp(3), marginLeft:wp(8)}}>
          Verification Code</Text>

         <Text style = {{width:wp('75%'),color:'#757575',fontSize: 15,
         fontFamily:'AvenirLTStd-Medium',textAlign:'left', lineHeight:23,
          marginLeft:wp('8%'),marginTop:wp('3%')}}>
          Enter the OTP sent to {GLOBAL.loginmobile} {`\n`}for authentication
          </Text>

       <CodeInput
           containerStyle={{alignSelf:'flex-start', marginLeft:wp('3%'), marginTop:hp('4%'),}}
           ref="codeInputRef1"
           keyboardType="numeric"
           secureTextEntry={false}
           className={'border-box'}
           space={6}
           codeInputStyle={{width:wp(15), height:hp(8), marginLeft:wp(6.2),marginTop:hp(5), borderRadius:12,color:'black', fontSize:26, alignSelf:'center'}}
           size={30}
           codeLength={4}
           inputPosition='center'
           activeColor = 'black'
           inactiveColor =  '#BDBDBD'
           onFulfill={(code) => this._onFulfill(code)}
         />

{/*
           <TextInput style = {{width:wp('80%'),color:'#909090', height:hp('7%'),
            fontSize:18, fontFamily:'Nunito-Regular', paddingLeft:wp(1),
            borderBottomColor:'#909090', borderBottomWidth:1, alignSelf:'center'}}
                         placeholder = {'OTP'}
                         placeholderTextColor = "#909090"
                         autoCapitalize = "none"
                         keyboardType={'numeric'}
                         editable={true}
                         maxLength={6}
                         onChangeText={(text) => this.setState({otp:text})}
                         value={this.state.otp}
              />

<OTPInputView
    style={{width: '80%', height: 200,marginLeft:wp('3%'),}}
    pinCount={6}
    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
    // onCodeChanged = {code => { this.setState({code})}}
    autoFocusOnLoad
    codeInputFieldStyle={styles.underlineStyleBase}
    codeInputHighlightStyle={styles.underlineStyleHighLighted}
    onCodeFilled = {(code => {
//        console.log(`Code is ${code}, you are good to go!`)
          this._onFulfill(code)
    })}
/>


          <OTPInput
          containerStyle={{alignSelf:'flex-start', marginLeft:wp('3%'), marginTop:hp('2%'),}}
          value={this.state.otp}
          onChange={this.handleOTPChange}
          tintColor="#E60000"
          cellStyle={{width:wp(11), height:hp(7), marginLeft:wp(3), color:'#909090', fontSize:26, alignSelf:'center'}}
          offTintColor="#EAECEF"
          otpLength={6}
          />
*/}

         <Text style = {{width:wp('75%'),color:'#757575',fontSize: 16,
         fontFamily:'AvenirLTStd-Medium',textAlign:'center',alignSelf:'center',
          marginTop:wp('19%')}}>
          Didn’t receive an OTP?
          </Text>

          <View style={{width:wp('80%'), backgroundColor:'transparent', justifyContent:'space-between', alignSelf:'center', flexDirection:'column', alignItems:'center'}}>
          <TouchableOpacity>
          <Text style = {{width:wp('35%'),color:'#1976D2',fontSize: 16,fontFamily:'AvenirLTStd-Medium',textAlign:'center', marginTop:hp(3), textDecorationLine:'underline'}}>
          Resend OTP?
          </Text>
          </TouchableOpacity>
          </View>




         </View>

         </View>
        <TouchableOpacity style={{width:wp('100%'),alignSelf:'center', alignItems:'center',marginTop:hp('37%'), marginBottom:hp('5%')}}
        onPress={()=> this.props.navigation.navigate('LoginViaEmail')}>
        <View style={{width:wp('100%'),  alignSelf:'center', alignItems:'center',}}>
        <Text style = {{width:wp('90%'),color:'#1976D2',fontSize: 18,textAlign:'center',fontFamily:'AvenirLTStd-Medium', textDecorationLine:'underline'}}>
        Trouble signing in?
        <Text style = {{width:wp('90%'),color:'#1976D2',fontSize: 18,textAlign:'center',fontFamily:'AvenirLTStd-Medium', textDecorationLine:'underline'}}>
        </Text>
        </Text>
        </View>
        </TouchableOpacity>


         </KeyboardAwareScrollView>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fafafa'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#E60000",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    fontSize:20,
    color:'black',
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#E60000",
  },
});
