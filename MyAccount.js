import React, {Component} from 'react';
import { StyleSheet,Text,NativeModules, View,Animated,Easing, Image,Alert,ImageBackground,TouchableOpacity,ScrollView,Dimensions} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import moment from 'moment';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
let {AgeFromDateString, AgeFromDate} = require('age-calculator');
let ageFromString 

const {Agora} = NativeModules
console.log(Agora)

const {
    FPS30,
    AudioProfileDefault,
    AudioScenarioDefault,
    Host,
    Adaptative
} = Agora

export default class MyAccount extends Component {
   static navigationOptions = ({ navigation }) => {
    return {
       header: () => null,
    }
}

 constructor(props) {
    super(props)
    this.state = {
      avatarSource:'',
      name:'',
      email:'',
      phone:'',
      gender:'',
      value:0,
      dob:'',
      pob:'',
      tob:'',
      location:'',
      flag:0,
      calcu_age:0,
      edituserDetails:''
    }
  }


    buttonClickListeners = () =>{


        var gender =''
          if(this.state.value==0){
            gender ='Male'
          }else if (this.state.value==1) {
            gender ='Female'
          }
        if (this.state.name == ''){
            alert('Please Enter Name')
        }
        else {
//            this.showLoading()
            const url = GLOBAL.BASE_URL + "update_profile";
            const data = new FormData();
            data.append('user_id', GLOBAL.user_id);
            data.append('name', this.state.name);
            data.append('gender', gender);
            data.append('dob', this.state.dob);
            data.append('birth_time', this.state.tob);
            data.append('place_of_birth', this.state.pob);
            data.append('flag',this.state.flag);
            data.append('address', this.state.location);
//            console.log(data)
            // you can append anyone.
            data.append('image', {
                uri: this.state.avatarSource,
                type: 'image/jpeg', // or photo.type
                name: 'image.png'
            });
            fetch(url, {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }

            }).then((response) => response.json())
                .then((responseJson) => {
//                           this.hideLoading()
//                    alert(JSON.stringify(responseJson))
                    // const { navigation } = this.props;
                    // navigation.goBack();
                    alert('Profile Updated Successfully.')
                    this.props.navigation.goBack();
                });
        }

    }


  componentDidMount(){
       this.props.navigation.addListener('focus',this._handleStateChange);

  }

  _handleStateChange = (state) => {
     this.getProfile()
  }


       getProfile(){
        const url = GLOBAL.BASE_URL + "get_profile";
      //  this.showLoading()
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: GLOBAL.user_id,

        })
      })
        .then(response => response.json())
        .then(responseJson => {
          //       this.hideLoading()        
        //Color in logs
        console.log("\x1b[36m%s\x1b[0m" ,"Background Color Is Blue");
    
        console.log("\x1b[36m",JSON.stringify(responseJson))
          if (responseJson.status == true) {

//            this.setState({edituserDetails : responseJson.user_details})
            this.setState({avatarSource : responseJson.user_details.image,
              name : responseJson.user_details.name,
              email : responseJson.user_details.email,
              phone : responseJson.user_details.mobile,
              dob : responseJson.user_details.dob,
              gender: responseJson.user_details.gender,
              location : responseJson.user_details.address
            })
            var getDob = responseJson.user_details.dob

            var momentObj = moment(getDob, 'DD-MM-YYYY')
            var momentString = momentObj.format('YYYY-MM-DD'); // 2016-07-15
            // alert(momentString)


            ageFromString = new AgeFromDateString(momentString).age;
            console.log("value from ageFromString", ageFromString);
            this.setState({ calcu_age : ageFromString})
            if(this.state.gender=='male'){

              this.setState({ value: 1 }, () => {
                console.log(this.state.value, 'dealersOverallTotal1');
              });               
              this.setState({value:1})
            }else{

            }

          } else {
            alert('Something went wrong!')
          }
        })
        .catch(error => {
          console.error(error);
        });

     }

     openScreen=(screenName)=>{
      this.props.navigation.navigate(screenName)
     }

    navigateToScreen1 = (route) =>{

        Alert.alert('Logout!','Are you sure you want to Logout?',
            [{text:"Cancel"},
                {text:"Yes", onPress:()=>this._YesLogout()
                },
            ],
            {cancelable:false}
        )

    }

    _YesLogout=()=>{

       const url = GLOBAL.BASE_URL +  'logout'
//      this.showLoading()
      fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id : GLOBAL.user_id,
      }),
    }).then((response) => response.json())
        .then((responseJson) => {

    //    alert(JSON.stringify(responseJson))
      //     this.hideLoading()
           if (responseJson.status == true) {

                 AsyncStorage.removeItem('userID');

                this.props
                    .navigation
                    .dispatch(CommonActions.reset({
                        index: 0,
                        routes: [
                                {name: 'Login',
                                params: { someParams: 'parameters goes here...' },
                              },
                        ],
                    }))
               }else {
                   alert('Something Went Wrong.')
               }
            })
            .catch((error) => {
              console.error(error);
            });
    }




  render() {

    return (
      <View style={{flex:1}}>
      <ScrollView contentContainerStyle={{paddingBottom:hp(25)}}>
      <ImageBackground style={{width:'100%', height:'62.5%',}}
      source={require('./resources/profile_bg.png')}>

      <View style={{height:hp(30),width:'90%',alignSelf:'center',backgroundColor:'white',
      marginTop:hp('15%'),shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,shadowRadius: 3,
      elevation: 4, borderRadius:10}}>
      <Text style={{fontSize:22,color:'black',fontFamily:'AvenirLTStd-Heavy',alignSelf:'center',marginTop:'20%'}}>{this.state.name}</Text>
      <Text style={{fontSize:17,color:'gray',fontFamily:'AvenirLTStd-Medium',alignSelf:'center',marginTop:5}}>{this.state.email}</Text>
      <Text style={{fontSize:15,color:'gray',fontFamily:'AvenirLTStd-Medium',alignSelf:'center',marginTop:5}}>{this.state.phone}</Text>

      <View style={{width:'100%',marginTop:15, flexDirection:'row', height:hp(8.6),}}>
      <View style={{flexDirection:'column',width:'50%', borderWidth:1, borderColor:'#f7f7f7',borderBottomLeftRadius:10, height:'100%', justifyContent:'center'}}>
      <Text style={{fontSize:15,color:'gray',fontFamily:'AvenirLTStd-Medium',alignSelf:'center',marginTop:0}}>Gender</Text>      
      <Text style={{fontSize:20,color:'black',fontFamily:'AvenirLTStd-Heavy',alignSelf:'center',}}>{this.state.gender}</Text>
      </View>
      <View style={{flexDirection:'column',width:'50%', borderWidth:1, borderColor:'#f7f7f7',borderBottomRightRadius:10, height:'100%', justifyContent:'center'}}>
      <Text style={{fontSize:15,color:'gray',fontFamily:'AvenirLTStd-Medium',alignSelf:'center',marginTop:0}}>Age</Text>      
      <Text style={{fontSize:20,color:'black',fontFamily:'AvenirLTStd-Heavy',alignSelf:'center',}}>{this.state.calcu_age}</Text>
      </View>
      </View>

       </View>
       <Image source={{uri: this.state.avatarSource}}
        style={{width:130, height:130,borderRadius:65,alignSelf:'center',borderWidth:4,borderColor:'white',
        position:'absolute',top:hp('7%'),shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.6,
        shadowRadius: 3,elevation:4}} />

        <TouchableOpacity style={{position:'absolute',right:15, top:20, }}
        hitSlop={{top:20, right:50, left:50, bottom:20}}
        onPress={()=> this.props.navigation.navigate('MyAccountEdit')}>
       <Image source={require('./resources/user_edit.png')}
        style={{width:28, height:28, resizeMode:'contain',
        }} />
        </TouchableOpacity>

      </ImageBackground>

      <View style={{width:wp(92), height:hp(41), backgroundColor:'white', alignSelf:'center', marginTop:hp(-20.5), borderRadius:8,}}>
      <TouchableOpacity onPress={()=> this.openScreen('MemberList')}>
      <DataLine
      navigation={this.props.navigation}
      imageName={require('./resources/member.png')}
      title={'Member List'}
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> this.openScreen('MyConsultations')}>
      <DataLine
      navigation={this.props.navigation}
      imageName={require('./resources/consultation.png')}
      title={'Consultations'}
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> this.openScreen('MyMedReports')}>
      <DataLine
      navigation={this.props.navigation}
      imageName={require('./resources/medical.png')}
      title={'My Med Reports'}
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> this.openScreen('AddHealthProfile')}>
      <DataLine
      navigation={this.props.navigation}
      imageName={require('./resources/consultation.png')}
      title={'Health Profile'}
      />
      </TouchableOpacity>


      <TouchableOpacity onPress={()=> this.openScreen('ViewPdf')}>
      <DataLine
      navigation={this.props.navigation}
      imageName={require('./resources/consultation.png')}
      title={'My Invoice'}
      />
      </TouchableOpacity>

      </View>      



      <View style={{width:wp(92), height:hp(41), backgroundColor:'white', alignSelf:'center', marginTop:hp(3), borderRadius:8,}}>
      <TouchableOpacity onPress={()=> this.openScreen('')}>
      <DataLine
      navigation={this.props.navigation}
      imageName={require('./resources/terms.png')}
      title={'Terms and Conditions'}
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> this.openScreen('Chat')}>
      <DataLine
      navigation={this.props.navigation}
      imageName={require('./resources/privacy.png')}
      title={'Privacy Policy'}
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>           this.props.navigation.navigate("VideoCall", {
                        uid: Math.floor(Math.random() * 100),
                        clientRole: Host,
                        channelName: '124421',
                        onCancel: (message) => {
                            this.setState({
                                visible: true,
                                message
                            });
            }})           
}>
      <DataLine
      navigation={this.props.navigation}
      imageName={require('./resources/about.png')}
      title={'About'}
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> this.openScreen('HelpCenter')}>
      <DataLine
      navigation={this.props.navigation}
      imageName={require('./resources/help.png')}
      title={'Help'}
      />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> this.navigateToScreen1('Login')}>
      <DataLine
      navigation={this.props.navigation}
      imageName={require('./resources/logout.png')}
      title={'Logout'}
      />
      </TouchableOpacity>

      </View>      

      </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column'
  },
});

class DataLine extends Component{

  render(){
    return(
        <>
        <View style={{width:'92%',backgroundColor:'white',marginTop:hp(2),flexDirection:'row', height:hp(4.5),
        alignItems:'center', justifyContent:'space-between',alignSelf:'center', flexDirection:'row', marginTop:hp(2)}}>
        <View style={{flexDirection:'row',}}>
        <Image style={{width:30, height:30, resizeMode:'contain'}}
        source={this.props.imageName}/>
        <Text style={{fontSize:15,color:'black',marginLeft:wp(4),fontFamily:'AvenirLTStd-Medium', alignSelf:'center'}}>{this.props.title}</Text>
        </View>
        <Image style={{marginRight:wp(1), width:15, height:15, resizeMode:'contain'}} source={require('./resources/right.png')}/>
        </View>
        <View
        style={{borderBottomColor: '#F5F5F5',borderBottomWidth: 1, marginTop:12, width:'100%', alignSelf:'center'}}>
        </View>
        </>


      )
  }
}