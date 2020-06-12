import React, {Component} from 'react';
import { StyleSheet,TextInput,Text, View,Image,ImageBackground ,Alert,Dimensions ,TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';
var randomString = require('random-string');
var validator = require("email-validator");
import AsyncStorage from '@react-native-community/async-storage';
export default class Signup extends Component {
   static navigationOptions = ({ navigation }) => {
    return {
       header: () => null,
    }
}

 constructor(props) {
    super(props)
    this.state = {
      elevations:0,
      name:'',
      email:'',
      date:'',
      dob:'Date of Birth',
      tob:'Time of Birth',
      pob:'',
      gender:'',
      refercode:'',
      isverifyrefer: "0",
      applied:'',
    }

     this._handlePressSignup = this._handlePressSignup.bind(this);

  }



  componentDidMount(){

  }



    _handlePressSignup=()=>{

      if(this.state.name==''){
        alert('Please enter name')
      }else if(validator.validate(this.state.email)==false){
        alert('Please enter valid emailId')
      }else if(this.state.date ==''){
        alert('Please select date of birth')
      }else if(this.state.gender ==''){
        alert('Please select your gender')
      }else{

        GLOBAL.signupName = this.state.name
        GLOBAL.signupEmail= this.state.email
        GLOBAL.signupGender = this.state.gender
        GLOBAL.signupDob = this.state.date




        const url = GLOBAL.BASE_URL +  'Signup'
     //            console.log(GLOBAL.myname+'--' + GLOBAL.myemail+'--'+GLOBAL.mymobile+'--' +DeviceInfo.getUniqueId())
       //  this.showLoading()
         const body= {
             name: GLOBAL.signupName,
             mobile: GLOBAL.signupMobile,
             email: GLOBAL.signupEmail,
             gender: GLOBAL.signupGender,
             terms: '1',
             dob: GLOBAL.signupDob,
             deviceID: "",
             deviceType: Platform.OS,
             deviceToken: "",
             voip_token:'',
             model_name: "",
             carrier_name: "",
             device_country: 'India',
             device_memory: '',
             has_notch: "",
             manufacture:"",
             ip_address: "",
           }
         console.log(JSON.stringify(body))
          fetch(url, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(body),
         }).then((response) => response.json())
             .then((responseJson) => {
               console.log(JSON.stringify(responseJson))
               //this.hideLoading()
              if (responseJson.status == true) {

               this.setState({ results: responseJson.user_detail })

                 GLOBAL.user_id = responseJson.user_detail.user_id


                  AsyncStorage.setItem('userID', this.state.results.user_id);
                  AsyncStorage.setItem('image', this.state.results.image);
                  AsyncStorage.setItem('name', this.state.results.name);
                  AsyncStorage.setItem('email', this.state.results.email);
                  AsyncStorage.setItem('mobile', this.state.results.mobile);
                  this.props.navigation.navigate('Tab')
                }else{
                 alert(responseJson.msg)
               }
             })
             .catch((error) => {
               console.error(error);
                //this.hideLoading()
             });



      //  this.props.navigation.navigate('Agreement')
      }
  }


  verifyReferralCode=()=>{
    if(this.state.email == ''){
      alert('Please enter email')
    }else if(this.phone.isValidNumber() ==false){
      alert('Invalid mobile number')
    }else if (this.state.refercode == ''){
      alert('Please enter referral code')
    }else{
    const countryCode = this.phone.getCountryCode()
    let phoneNumber = this.phone.getValue()
    phoneNumber = phoneNumber.replace('+','')
    phoneNumber = phoneNumber.replace(countryCode, '')

     const url = GLOBAL.BASE_URL + "verify_referral";
    //  this.showLoading()
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        mobile: phoneNumber,
        referral_code: this.state.refercode,
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson));
        //       this.hideLoading()
        if (responseJson.status == true) {
          this.setState({isverifyrefer : '1',
            applied : responseJson.apply_to
        })
  //        GLOBAL.signupVerifyRefer = this.state.isverifyrefer
          alert('Referral code applied successfully!')
        } else {
          this.setState({isverifyrefer : '0'})
//          GLOBAL.signupVerifyRefer = this.state.isverifyrefer

          alert("Invalid referral code");
        }
      })
      .catch(error => {
        console.error(error);
      });

    }
  }



  render() {
    return (
      <View style={styles.container}>


    <KeyboardAwareScrollView keyboardShouldPersistTaps='handled'>


         <View style={{flexDirection:'column',flex:1, alignItems:'center',}}>


         <View style={{width:wp('100%'), marginTop:hp('5%'),}}>

         <TouchableOpacity style={{marginLeft:wp(4)}} onPress={()=> this.props.navigation.replace('Login')}>
          <View style = {{flexDirection:'row',width:wp('82%'),height:hp('7%'), }}>
          <Image style={{width:25, height:25, resizeMode:'contain'}}
          source={require('./resources/back.png')}/>
         <Text style = {{width:wp('75%'),color:'#212121',fontSize: 19,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginLeft:wp(2)}}>
         Back
          </Text>
          </View>
         </TouchableOpacity>

          <Text style = {{color:'#262626',fontSize: 27,fontFamily:'AvenirLTStd-Heavy',textAlign:'left', lineHeight:35,marginTop:hp(3), marginLeft:wp(8)}}>
          Please enter your details</Text>

         <Text style = {{width:wp('75%'),color:'#909090',fontSize: 16,
         fontFamily:'AvenirLTStd-Medium',textAlign:'left', lineHeight:23,
          marginLeft:wp('8%'),marginTop:wp('3%')}}>
         Let us quickly get to know you so that we can get you the best help
          </Text>

          <View style = {{flexDirection:'row',marginTop:hp('2%'),width:wp('82%'),height:hp('7%'),  marginLeft:wp('8%')}}>
          <Image style={{width:17, height:17, resizeMode:'contain'}}
          source={require('./resources/ic_info.png')}/>
         <Text style = {{width:wp('75%'),color:'#212121',fontSize: 14,fontFamily:'AvenirLTStd-Medium',textAlign:'left',marginLeft:wp(1.5)}}>
          Your information is safe & secure with us.
          </Text>
          </View>

          <Text style = {{width:wp('70%'),color:'black',fontSize: 15,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginTop:hp('-2.5%'), marginLeft:wp('8%'), lineHeight:35}}>
          Full Name
          <Text style = {{color:'#FF0000',fontSize: 15,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',}}>*
          </Text></Text>

          <View style = {{flexDirection:'row',marginTop:hp('0%'),width:wp('82%'),height:hp('7%'), borderColor:'#F0F0F0',borderRadius:5, borderWidth:2, elevation: this.state.elevations, backgroundColor:'white', marginLeft:wp('8%')}}>
              <TextInput style = {{width:wp('78%'),color:'#909090', height:hp('7%'), fontSize:16, fontFamily:'Avenir Roman', paddingLeft:wp(3)}}
                         placeholder = {'Name'}
                         placeholderTextColor = "#909090"
                         onChangeText={(text) => this.setState({name:text})}
                         value={this.state.name}
              />
          </View>

          <Text style = {{width:wp('70%'),color:'black',fontSize: 15,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginTop:hp('1%'), marginLeft:wp('8%'), lineHeight:35}}>
          Email
          <Text style = {{color:'#FF0000',fontSize: 15,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',}}>*
          </Text></Text>

          <View style = {{flexDirection:'row',marginTop:hp('0%'),width:wp('82%'),height:hp('7%'), borderColor:'#F0F0F0',borderRadius:5, borderWidth:2, elevation: this.state.elevations, backgroundColor:'white', marginLeft:wp('8%')}}>
              <TextInput style = {{width:wp('78%'),color:'#909090', height:hp('7%'), fontSize:16, fontFamily:'Avenir Roman', paddingLeft:wp(3)}}
                         placeholder = {'Email'}
                         placeholderTextColor = "#909090"
                         autoCapitalize = "none"
                         onChangeText={(text) => this.setState({email:text})}
                         value={this.state.email}
              />
          </View>

          <Text style = {{width:wp('70%'),color:'black',fontSize: 15,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginTop:hp('1%'), marginLeft:wp('8%'), lineHeight:35}}>
          Date of Birth
          <Text style = {{color:'#FF0000',fontSize: 15,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',}}>*
          </Text></Text>
          <View style = {{flexDirection:'row',marginTop:hp('0%'),width:wp('82%'),height:hp('7%'), borderColor:'#F0F0F0',borderRadius:5, borderWidth:2, elevation: this.state.elevations, backgroundColor:'white', marginLeft:wp('8%')}}>
          <DatePicker
            style={{width: 200,}}
            date={this.state.date}
            mode="date"
            showIcon={false}
            placeholder={this.state.dob}
            format="DD-MM-YYYY"
            minDate="01-01-1950"
            maxDate= {moment().format('DD-MM-YYYY')}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                marginLeft:-85, borderWidth:0, color:'#909090', alignSelf:'center', marginTop:15
              },
              dateText:{
                  fontFamily:'AvenirLTStd-Medium', fontSize:15, alignSelf:'center',color:'#909090',
              },
              placeholderText:{
                  fontFamily:'AvenirLTStd-Medium', fontSize:15, alignSelf:'center',color:'#909090',
              }
            }}
            onDateChange={(date) => {
              this.setState({date: date})
            }}
          />


          </View>



          <Text style = {{width:wp('70%'),color:'black',fontSize: 15,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginTop:hp('1%'), marginLeft:wp('8%'), lineHeight:35}}>
          Gender
          <Text style = {{color:'#FF0000',fontSize: 15,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',}}>*
          </Text></Text>

          <View style = {{flexDirection:'column',marginTop:hp('0%'),width:wp('82%'),height:hp('7%'), borderColor:'#F0F0F0',borderRadius:5, borderWidth:2, elevation: this.state.elevations, backgroundColor:'white', marginLeft:wp('8%')}}>
        <RNPickerSelect style = {{width:wp('75%'),color:'#909090', height:hp('7%'), marginLeft:30}}
            onValueChange={(value) => {console.log(value);this.setState({gender : value})}}
            placeholder={{
            label: 'Select Gender',
            value: null,
            fontFamily: 'AvenirLTStd-Medium',
            color: '#909090',
        }}
            items={[
                { label: 'Male', value: 'male', color: '#909090' },
                { label: 'Female', value: 'female', color: '#909090' },
            ]}
            useNativeAndroidPickerStyle={true}
           />

          </View>


{/*
          <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:hp('4%'),width:wp('82%'),height:hp('7%'), borderColor:'white',borderRadius:5, borderWidth:2, elevation: this.state.elevations, backgroundColor:'#f5f5f5', marginLeft:wp('8%')}}>
              <TextInput style = {{width:wp('60%'),color:'#909090', height:hp('7%'), fontSize:18, fontFamily:'AvenirLTStd-Medium', paddingLeft:wp(5),}}
                         placeholder = {'Referral Code (if any)'}
                         placeholderTextColor = "#909090"
                         autoCapitalize = "none"
                         editable={true}
                         onChangeText={(text) => this.setState({refercode:text})}
                         value={this.state.refercode}
              />

          <TouchableOpacity onPress={()=> this.verifyReferralCode()}>
          <Text style = {{color:'#E60000',fontSize: 18,fontFamily:'AvenirLTStd-Medium',textAlign:'left', marginRight:wp('3%'),marginTop:wp('3%')}}>
          Verify
          </Text>
          </TouchableOpacity>

          </View>
*/}



          <TouchableOpacity style={{width:wp('82%'),borderRadius:5, marginVertical:hp('4%'),
           backgroundColor:'#1976D2',height:hp('7%'),alignSelf:'center',marginRight:wp('2%')}}
           onPress={this._handlePressSignup}>

          <View style={{width:'100%', height:hp('7%'), justifyContent:'center',alignItems:'center'}}>
          <Text style = {{color:'white',fontSize: 18,fontFamily:'AvenirLTStd-Heavy',
          alignSelf:'center'}}>
          Submit
          </Text>
          </View>
          </TouchableOpacity>


         </View>

{/*        <TouchableOpacity style={{width:wp('100%'),alignSelf:'center', alignItems:'center',marginTop:hp('18%'), marginBottom:hp('2%')}}
        onPress={()=> this.props.navigation.navigate('Login')}>
        <View style={{width:wp('100%'),  alignSelf:'center', alignItems:'center',}}>
        <Text style = {{width:wp('90%'),color:'black',fontSize: 18,textAlign:'center',fontFamily:'AvenirLTStd-Medium'}}>
        Already have an account?
        <Text style = {{color:'#E60000',fontSize: 18,textAlign:'center',fontFamily:'AvenirLTStd-Medium', textDecorationLine:'underline'}}>
        {' '}Login Now
        </Text>
        </Text>

        </View>
        </TouchableOpacity>
*/}

         </View>


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

});
