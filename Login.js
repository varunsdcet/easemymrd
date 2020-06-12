import React, {Component} from 'react';
import { StyleSheet,TextInput,Text, View,Image,ImageBackground ,Alert,Dimensions ,TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
var randomString = require('random-string');
import CheckBox from 'react-native-check-box'
import IndicatorCustom from './IndicatorCustom'

export default class Login extends Component {
   static navigationOptions = ({ navigation }) => {
    return {
       header: () => null,
    }
}

 constructor(props) {
    super(props)
    this.state = {
      mobile:'',
      elevations:0,
      isChecked:false,
      isCheckeds:false,
    }
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

    if(this.state.mobile.length < 10 || this.state.mobile==''){
      alert('Invalid mobile number!')
    }else{
      var genOtp = randomString({
          length: 4,
          numeric: true,
          letters: false,
          special: false,
      });

      this.showLoading()

      GLOBAL.signupMobile= this.state.mobile
      GLOBAL.loginmobile= this.state.mobile
      GLOBAL.loginOTP = genOtp
      const url = GLOBAL.BASE_URL +  'otp'
    //  this.showLoading()
      fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'mobile',
        otp: genOtp,
        reciever: this.state.mobile

      }),
    }).then((response) => response.json())
        .then((responseJson) => {

            console.log(JSON.stringify(responseJson))
             this.hideLoading()
           if (responseJson.status == true) {

    //      this.setState({ results: responseJson.user_detail })
            GLOBAL.isReg = responseJson.condition

            this.props.navigation.navigate('Otp', {params: {login_Type: 'mobile', condition: responseJson.condition}})
           }
           else{
            // alert('It seems you are not registered with us. Please signup to continue.')
           }
        })
        .catch((error) => {
          this.hideLoading()
          console.error(error);

    });

    }


    // }else{

    //   alert('Invalid Mobile Number')
    // }

  }

  componentDidMount(){
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

  render() {

    if(this.state.loading){
      return(
        <IndicatorCustom/>
      )
    }

    return (
      <View style={styles.container}>


    <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'
    >

         <View style={{flexDirection:'column',alignItems:'center',}}>


         <View style={{width:wp('100%'), marginTop:hp('0%'),}}>


         <Image style = {{width:80, height:80, marginLeft:wp(7),resizeMode:'contain', marginTop:hp('5%'),}} source={require('./resources/logo.png')}/>
          <Text style = {{width:wp('80%'),color:'black',fontSize: 22,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginTop:hp('5%'), marginLeft:wp('8%'), lineHeight:35,}}>
          Welcome to easeMymed!</Text>

          <Text style = {{width:wp('75%'),color:'#757575',fontSize: 15,fontFamily:'AvenirLTStd-Medium',textAlign:'left', marginLeft:wp('8%'),marginTop:wp('2%'), lineHeight:25}}>
          Please enter your mobile number for verification
          </Text>

          <Text style = {{width:wp('70%'),color:'black',fontSize: 14,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginTop:hp('5%'), marginLeft:wp('8%'), lineHeight:40}}>
          Mobile No.</Text>

          <View style = {{flexDirection:'row',marginTop:hp('0%'),width:wp('82%'),height:hp('7%'),
           borderColor:'#F0F0F0',borderRadius:5, borderWidth:3, elevation: this.state.elevations, backgroundColor:'white', marginLeft:wp('8%')}}>

        <TextInput style={{width:wp('78%'), height:hp('7%'), color:'black',marginLeft:wp('2%'), fontFamily:'Avenir Roman',fontSize:16}}
          keyboardType={'numeric'}
          maxLength = {10}
          autoFocus={true}
          // blurOnSubmit={true}
          // onBlur={()=> {
          //   if(this.state.mobile.length<10 || this.state.mobile==''){
          //     alert('Invalid mobile number!')
          //   }
          // }}
          // autoCompleteType ={'cc-number'}
          // onSubmitEditing ={()=> {
          //   if(this.state.mobile.length<10 || this.state.mobile==''){
          //     alert('Invalid mobile number!')
          //   }
          // }}
          onChangeText={(text) => this.setState({mobile:text})}
          value={this.state.mobile}
        />
          </View>

          <Text style = {{width:wp('75%'),color:'#BDBDBD',fontSize: 15,fontFamily:'AvenirLTStd-Medium',textAlign:'left', marginLeft:wp('8%'),marginTop:wp('5%')}}>
          An OTP will be sent to this number
          </Text>

{/*      <View style={{width: '90%', flexDirection: 'row', alignItems: 'center' ,marginLeft:wp(5), marginTop: 15}}>

        <CheckBox
            style={{padding: 10}}
            onClick={()=>{
                 this.setState({
                     isChecked:!this.state.isChecked
                 })
               }}
            isChecked={this.state.isChecked}
            checkedImage={<Image source={require('./resources/ic_tick.png')} style={{width:22, height:22, resizeMode:'contain'}}/>}
            unCheckedImage={<Image source={require('./resources/ic_untick.png')} style={{width:22, height:22, resizeMode:'contain'}}/>}
        />

       <TouchableOpacity style={{width:'80%', }}
       onPress={()=>this.setModalVisible(true)}>
       <Text style={{fontSize: 13, color:'#757575', fontFamily: 'Avenir Roman',}}>By continuing you agree to the
        <Text style={{fontSize: 13, color:'#1976D2', fontFamily: 'Avenir Roman',textDecorationLine: 'underline',}}>
        {' '}Terms and Conditions</Text>
      <Text style={{fontSize: 13, color:'#757575', fontFamily: 'Avenir Roman',}}> and
        <Text style={{fontSize: 13, color:'#1976D2', fontFamily: 'Avenir Roman',textDecorationLine: 'underline',}}>
        {' '}Privacy Policy
        </Text>
        </Text></Text></TouchableOpacity>

      </View>


      <View style={{width: '90%', flexDirection: 'row', alignItems: 'center' ,marginLeft:wp(5), marginTop: 10}}>

        <CheckBox
            style={{padding: 10}}
            onClick={()=>{
                 this.setState({
                     isCheckeds:!this.state.isCheckeds
                 })
               }}
            isChecked={this.state.isCheckeds}
            checkedImage={<Image source={require('./resources/ic_tick.png')} style={{width:22, height:22, resizeMode:'contain'}}/>}
            unCheckedImage={<Image source={require('./resources/ic_untick.png')} style={{width:22, height:22, resizeMode:'contain'}}/>}
        />

       <TouchableOpacity style={{width:'80%', }}
       onPress={()=>this.setModalVisible(true)}>
       <Text style={{fontSize: 13, color:'#757575', fontFamily: 'Avenir Roman',}}>By continuing you agree to the
        <Text style={{fontSize: 13, color:'#1976D2', fontFamily: 'Avenir Roman',textDecorationLine: 'underline',}}>
        {' '}Terms and Conditions</Text>
      <Text style={{fontSize: 13, color:'#757575', fontFamily: 'Avenir Roman',}}> and
        <Text style={{fontSize: 13, color:'#1976D2', fontFamily: 'Avenir Roman',textDecorationLine: 'underline',}}>
        {' '}Privacy Policy
        </Text>
        </Text></Text></TouchableOpacity>

      </View>
    */}

          <TouchableOpacity style={{width:wp('82%'),borderRadius:5, marginTop:hp('5.5%'),
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
         </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FAFAFA'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

});
