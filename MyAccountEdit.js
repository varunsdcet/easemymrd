import React, {Component} from 'react';
import { StyleSheet,Text, View,Animated,Easing,TextInput,Image,TouchableOpacity,Dimensions} from 'react-native';
const window = Dimensions.get('window');
import Button from 'react-native-button';
const GLOBAL = require('./Global');
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import CustomBack from './CustomBack'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const options = {
    title: 'Select Avatar',
    maxWidth : 500,
    maxHeight : 500,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class MyAccountEdit extends Component {
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
            data.append('flag',this.state.flag);
            data.append('address', this.state.location);
            // you can append anyone.
            data.append('image', {
                uri: this.state.avatarSource,
                type: 'image/jpeg', // or photo.type
                name: 'image.png'
            });
//            console.log(data)
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
                })
          .catch((error) => {
          // this.hideLoading()
          console.error(error);

        });

        }

    }


  changeImage=()=>{
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
    this.setState({
      flag: 1,
    });

  }
});
}

  componentDidMount(){

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

            this.setState({avatarSource : responseJson.user_details.image,
              name : responseJson.user_details.name,
              email : responseJson.user_details.email,
              phone : responseJson.user_details.mobile,
              dob : responseJson.user_details.dob,
              gender: responseJson.user_details.gender,
              location : responseJson.user_details.address
            })



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

     UNSAFE_componentWillReceiveProps(){
      alert(this.state.value)
      this.setState({value : this.state.value})
     }


  render() {
    var radio_props = [
      {label: 'Male', value: 0 },
      {label: 'Female', value: 1 },
     ];

    return (
      <View style={styles.container}>
         <CustomBack headTitle={'Edit Profile'}
         navigation={this.props.navigation}/>

      <KeyboardAwareScrollView style={{flex:1}}>


      <View style={styles.containers}>


      {this.state.avatarSource=='' && (
      <Image  style = {{width:140, height:140,borderRadius:70 ,borderWidth:1, borderColor:'#1976D2',alignSelf:'center',marginTop:'10%', }}
      source={require('./resources/image_edit.png')}/>
        )}
      {this.state.avatarSource!='' && (
      <Image  style = {{width:140, height:140,borderRadius:70,borderWidth:1, borderColor:'#1976D2', alignSelf:'center',marginTop:'10%', }}
      source={{uri: this.state.avatarSource}}/>
        )}      


      <TouchableOpacity style = {{position:'absolute', alignSelf:'center', top:hp(5), right:wp(35.5), zIndex:1}}
      onPress={()=> this.changeImage()}>
      <Image style={{width:30, height:30, resizeMode:'contain'}}
      source={require('./resources/edit.png')}/>
      </TouchableOpacity>

    <View style={{color :'white',flexDirection:'row' ,borderColor:'transparent', height: 5,borderRadius :6,width : '20%',alignSelf:'center', shadowColor: 'black',
       shadowOffset: { width: 5, height: 100 },marginTop:2,marginBottom:'10%',
       shadowOpacity: 100,
       shadowRadius: 20,
       elevation: 10}}>
      </View>

      </View>


      

      <View style={{flexDirection:'column', width:'85%', alignSelf:'center', backgroundColor:'transparent',marginTop:'5%'}}>

      <View style={{flexDirection:'column', width:'100%'}}>
      <Text style={{color:'#bfbfbf', fontFamily:'AvenirLTStd-Medium'}}>Name</Text>
              <TextInput style = {{width:'100%',color:'black', height:45, fontSize:16,paddingLeft:-10, fontFamily:'Avenir Roman', borderBottomColor:'rgba(0,0,0,0.05)', borderBottomWidth:1}}
                         placeholder = 'Name'
                         placeholderTextColor = "black"
                         onChangeText={(text) => this.setState({name: text})}
                         value={this.state.name}

              />
      </View>

      <View style={{flexDirection:'column', width:'100%', marginTop:'7%'}}>
      <Text style={{color:'#bfbfbf', fontFamily:'AvenirLTStd-Medium'}}>Email</Text>
              <TextInput style = {{width:'100%',color:'black', height:45, fontSize:16,paddingLeft:-10, fontFamily:'Avenir Roman', borderBottomColor:'rgba(0,0,0,0.05)', borderBottomWidth:1}}
                         placeholder = 'Email'
                         placeholderTextColor = "black"
                         editable={false}
                         onChangeText={(text) => this.setState({email: text})}
                         value={this.state.email}

              />
      </View>

      <View style={{flexDirection:'column', width:'100%', marginTop:'7%'}}>
      <Text style={{color:'#bfbfbf',fontFamily:'AvenirLTStd-Medium'}}>Mobile Number</Text>
              <TextInput style = {{width:'100%',color:'black', height:45, fontSize:16,paddingLeft:-10, fontFamily:'Avenir Roman', borderBottomColor:'rgba(0,0,0,0.05)', borderBottomWidth:1}}
                         placeholder = 'Phone'
                         placeholderTextColor = "black"
                         maxLength={10}
                         editable={false}
                         keyboardType='numeric'
                         onChangeText={(text) => this.setState({phone: text})}
                         value={this.state.phone}

              />
      </View>

      <View style={{flexDirection:'column', width:'100%', marginTop:'7%'}}>
      <Text style={{color:'#bfbfbf',fontFamily:'AvenirLTStd-Medium'}}>Gender</Text>
              <RadioForm style={{marginTop:10}}
                  radio_props={radio_props}
                  initial={this.state.value}
                  buttonSize={10}
                  buttonColor={'#1976D2'}
                  formHorizontal={true}
                  buttonOuterColor = {'#1976D2'}
                  selectedButtonColor = {'#1976D2'}
                  animation={false}
                  labelColor={'black'}
                  buttonStyle={{marginTop:20}}
                  buttonWrapStyle={{marginTop:20}}
                  labelStyle = {{fontSize:16,fontFamily:'AvenirLTStd-Medium',paddingLeft:10, paddingRight:10,color:'black',}}
                  onPress={(value) => {this.setState({value:value})}}
              />

      <View style={{width:'100%', backgroundColor:'rgba(0,0,0,0.05)', height:1, marginTop:10}}/>
      </View>

      <View style={{flexDirection:'column', width:'100%', marginTop:'7%'}}>
      <Text style={{color:'#bfbfbf',fontFamily:'AvenirLTStd-Medium'}}>Date of Birth</Text>
              <DatePicker
                style={{width: 200,}}
                date={this.state.dob}
                mode="date"
                showIcon={false}
                placeholder={this.state.dob}
                format="DD-MM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: {
                    marginLeft: -120, borderWidth:0, color:'black',
                  }
                }}
                onDateChange={(date) => {
                  this.setState({dob: date})
                }}
              />


      <View style={{width:'100%', backgroundColor:'rgba(0,0,0,0.05)', height:1, marginTop:5}}/>
      </View>


      <View style={{flexDirection:'column', width:'100%', marginTop:'7%', marginBottom:'10%'}}>
      <Text style={{color:'#bfbfbf',fontFamily:'AvenirLTStd-Medium'}}>Address</Text>
              <TextInput style = {{width:'100%',color:'black', height:45, fontSize:17,paddingLeft:-10, fontFamily:'Avenir Roman', borderBottomColor:'rgba(0,0,0,0.05)', borderBottomWidth:1}}
                         placeholder = 'Address'
                         placeholderTextColor = "black"
                         autoCapitalize = "none"
                         onChangeText={(text) => this.setState({location: text})}
                         value={this.state.location}

              />
      </View>

      </View>

        <Button
        containerStyle={{width:wp('88%'),padding:16, height:hp(7), overflow:'hidden', borderRadius:8,
         backgroundColor: '#1976D2', elevation: 0, alignSelf:'center',  marginVertical:hp(4),}}
        style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'AvenirLTStd-Heavy'}}
        onPress={this.buttonClickListeners}
        >
        Save
        </Button>


      </KeyboardAwareScrollView>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column'
  },
  containers: {
    backgroundColor:'#efefef'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

});
