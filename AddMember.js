import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
const GLOBAL = require('./Global');
import Button from 'react-native-button';
const window = Dimensions.get('window');
import Header from 'react-native-custom-headers';
import DatePicker from 'react-native-datepicker';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment'
import ImagePicker from 'react-native-image-picker';
import IndicatorCustom from './IndicatorCustom'
import CustomBack from './CustomBack'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'react-native-check-box'
import RNPickerSelect from 'react-native-picker-select';

const options = {
    title: 'Select Avatar',
    maxWidth : 500,
    maxHeight : 500,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class AddMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            started: '',
            results: [],
            name:'',
            email:'',
            mobile:'',
            relation:'',
            gender:'',
            isChecked:false,
            sel_gender_name:'Male',
            dob:'Select Date of Birth',
            value:1,
            flag:0,
            rdata:[],
            genders:[
            {
              id:1,
              name: 'Male',
              is_sel: 1
            },
            {
              id:2,
              name: 'Female',
              is_sel: 0
            },
            {
              id:3,
              name: 'Others',
              is_sel: 0
            },
            ],
            avatarSource:'',
            date:''
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }


    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }

    componentDidMount(){
        this.getRelations()
    }


    getRelations(){
        const url = GLOBAL.BASE_URL + "master_relationship";
      //  this.showLoading()
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          config: 'relation',

        })
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(JSON.stringify(responseJson));
//          this.hideLoading();
          if (responseJson.status == true) {

              var rece = responseJson.response
              const transformed = rece.map(({ id, name }) => ({ label: name, value: id }));
              // console.log(transformed)

              this.setState({rdata : transformed})
          }else {
            alert(
              "Something went wrong!"
            );
          }
        })
        .catch(error => {
  //        this.hideLoading();
          console.error(error);
        });    
    }


    _handlePress=()=> {
       if(this.state.avatarSource==''){
            alert('Please select member image')
            
       }else if(this.state.name==''){
            alert('Please Enter Member Name')

        }else if(this.state.date == ''){
            alert('Please select Date of Birth')
        
        }else if(this.state.relation==''){
            alert('Please select relation')

        }else if(this.state.mobile==''){
            alert('Please Enter Mobile Number')

        }else if(this.state.email==''){
            alert('Please Enter Member EmailId')

        }else if(this.state.isChecked==false){
            alert('Please Accept declaration')

        }else{

            const url = GLOBAL.BASE_URL + "add_member";
            const data = new FormData();
            data.append('user_id', GLOBAL.user_id);
            data.append('member_name', this.state.name);
            data.append('member_gender', this.state.sel_gender_name);
            data.append('member_dob', this.state.date);
            data.append('flag',this.state.flag);
            data.append('relation', this.state.relation);
            data.append('mobile', this.state.mobile);
            data.append('email', this.state.email);
            data.append('condition', this.state.value);
            // you can append anyone.
            data.append('image', {
                uri: this.state.avatarSource,
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
                if (responseJson.status == true) {
                    this.props.navigation.goBack()
                   alert('Member Added Successfully!')
                }else{
                    this.props.navigation.goBack()
                    alert('Members limit reached!')
                }
                })
          .catch((error) => {
          // this.hideLoading()
          console.error(error);

        });
      }
    }


    // _handlePress=()=>{
    //   // var convDate= this.state.date
    //   // convDate = moment(convDate).format('YYYY-MM-DD')
    //         const data = new FormData();

    //         data.append('user_id', GLOBAL.user_id);
    //         data.append('member_name', this.state.name);
    //         data.append('member_gender', this.state.sel_gender_name);
    //         data.append('member_dob', this.state.date);
    //         data.append('flag',this.state.flag);
    //         data.append('relation', this.state.relation);
    //         data.append('mobile', this.state.mobile);
    //         data.append('email', this.state.email);
    //         data.append('condition', this.state.value);
    //         // you can append anyone.
    //         data.append('image', {
    //             uri: this.state.avatarSource,
    //             type: 'image/jpeg', // or photo.type
    //             name: 'image.png'
    //         });
    //       console.log(JSON.stringify(data))
    // }


    getIndex = (index) => {

        this.setState({relation:this.state.rdata[index].label})

    }

    selectGender=(item, index)=>{
       var a = this.state.genders
        for (var i = 0; i<this.state.genders.length ;i ++){

            this.state.genders[i].is_sel = 0
        }
        var index = a[index]
        if (index.is_sel == 0){
            index.is_sel = 1
            this.setState({sel_gender_name : item.name})

        }else{
            index.is_sel = 0
        }
        this.state.genders[index] = index
        this.setState({genders:this.state.genders,
          sel_gender: item})
    }


    _renderGenders=({item, index})=>{
      return(
        <TouchableOpacity onPress={()=> this.selectGender(item, index)}>
        {item.is_sel==0 && (

          <View style = {{flexDirection:'row',width:wp('27.5%'),height:hp('6%'), borderColor:'#F0F0F0',borderRadius:5,
           borderWidth:2, elevation: this.state.elevations, backgroundColor:'white',justifyContent:'center',
            marginLeft:wp('3%')}}>

          <Text style = {{color:'black',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',
          alignSelf:'center'}}>
          {item.name}
          </Text>
          </View>

          )}

        {item.is_sel==1 && (
          <View style = {{flexDirection:'row',width:wp('27.5%'),height:hp('6%'), borderColor:'#F0F0F0',borderRadius:5,
           borderWidth:2, elevation: this.state.elevations, backgroundColor:'#1976D2',justifyContent:'center',
            marginLeft:wp('3%')}}>

          <Text style = {{color:'white',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',
          alignSelf:'center'}}>
          {item.name}
          </Text>
          </View>
          )}
          </TouchableOpacity>
        
        )
    }


  changeImage=()=>{
  ImagePicker.showImagePicker(options, (response) => {
//  console.log('Response = ', response);
 
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

    render() {

        var radio_props_one = [
            {label: 'Permanently', value: 1 },
            {label: 'One time addition', value: 2 }
        ];

        if(this.state.loading){
            return(
               
               <IndicatorCustom/>
            )
        }
        return (

        <View style={styles.container}>

         <CustomBack headTitle={'Add Member'}
         navigation={this.props.navigation}/>

        <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>

        <View style={{width:wp('95%'), backgroundColor:'transparent',flexDirection:'column',
        alignSelf:'center'}}>


      <TouchableOpacity style = {{position:'absolute', alignSelf:'center', top:hp(5.5), right:wp(31.5), zIndex:1}}
      onPress={()=> this.changeImage()}>
      <Image style={{width:30, height:30, resizeMode:'contain'}}
      source={require('./resources/edit.png')}/>
      </TouchableOpacity>


      {this.state.avatarSource=='' && (
      <Image  style = {{width:120, height:120,borderRadius:60 ,borderWidth:2, borderColor:'white',alignSelf:'center', marginTop:hp(4)}}
      source={require('./resources/image_edit.png')}/>
        )}
      {this.state.avatarSource!='' && (
      <Image  style = {{width:120, height:120,borderRadius:60,borderWidth:2, borderColor:'white', alignSelf:'center',  marginTop:hp(4)}}
      source={{uri: this.state.avatarSource}}/>
        )}



      <Text style = {{color:'black',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginTop:hp('4%'), marginLeft:wp('3%'), lineHeight:45}}>
      Full Name
      <Text style = {{color:'#FF0000',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',}}>*
      </Text></Text>

      <View style = {{flexDirection:'row',marginTop:hp('0%'),width:wp('88.5%'),height:hp('7%'), borderColor:'#F0F0F0',borderRadius:5, borderWidth:2, elevation: this.state.elevations, backgroundColor:'white', marginLeft:wp('3%')}}>
          <TextInput style = {{width:wp('78%'),color:'#909090', height:hp('7%'), fontSize:16, fontFamily:'Avenir Roman', paddingLeft:wp(3)}}
                     placeholder = {'Name'}
                     placeholderTextColor = "#909090"
                     onChangeText={(text) => this.setState({name:text})}
                     value={this.state.name}
          />
      </View>

      <Text style = {{color:'black',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginTop:hp('0.5%'), marginLeft:wp('3%'), lineHeight:45}}>
      Date of Birth
      <Text style = {{color:'#FF0000',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',}}>*
      </Text></Text>
          <View style = {{flexDirection:'row',marginTop:hp('0%'),width:wp('88.5%'),height:hp('7%'), borderColor:'#F0F0F0',borderRadius:5, borderWidth:2, elevation: this.state.elevations, backgroundColor:'white', marginLeft:wp('3%')}}>

          <DatePicker
            style={{width: 200,}}
            date={this.state.date}
            mode="date"
            showIcon={false}
            placeholder={this.state.dob}
            format="YYYY-MM-DD"
            minDate="01-01-1950"
            maxDate= {moment().format('YYYY-MM-DD')}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                marginLeft: -83, borderWidth:0, color:'black', marginTop:10
              },
              dateText:{
                  fontFamily:'Nunito-Regular', fontSize:16, marginLeft:-10,color:'#909090'
              },
              placeholderText: {
                    fontFamily:'Avenir Roman', fontSize:16, marginLeft:55, color:'#909090'
              }                                         
            }}
            onDateChange={(date) => {
              this.setState({date: date})
            }}
          />

          </View>



      <Text style = {{color:'black',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginTop:hp('0.5%'), marginLeft:wp('3%'), lineHeight:45}}>
      Gender
      <Text style = {{color:'#FF0000',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',}}>*
      </Text></Text>

          <FlatList style= {{flexGrow:0,marginTop:hp('0%'),}}
              data={this.state.genders}
              numColumns={3}
              extraData={this.state}
              keyExtractor = { (item, index) => index.toString() }
              renderItem={this._renderGenders}
    />

      <Text style = {{color:'black',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginTop:hp('0.5%'), marginLeft:wp('3%'), lineHeight:45}}>
      Relation
      <Text style = {{color:'#FF0000',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',}}>*
      </Text></Text>
       <View style = {{flexDirection:'column',marginTop:hp('0%'),width:wp('88.5%'),height:hp('7%'), borderColor:'#F0F0F0',borderRadius:5, borderWidth:2, justifyContent:'center', backgroundColor:'white', marginLeft:wp('3%')}}>

            <Dropdown containerStyle={{width:'93%', height:hp(6.3),backgroundColor:'transparent', marginTop:hp(-3), alignSelf:'center'}}
                                      fontSize={16}
                                      textColor={'#909090'}
                                      labelFontSize={13}
                                      placeholderTextColor ={'red'}
                                      dropdownPosition = {-4.2}
                                      onChangeText ={ (value,index) => this.getIndex(index) }
                                      label={''}
                                      value={'Who is this to you?'}
                                      data={this.state.rdata}
            />


{/*        <RNPickerSelect style = {{width:wp('75%'),color:'#909090', height:hp('7%'), marginLeft:3}}
            onValueChange={(value) => {console.log(label);this.setState({relation : label})}}
            placeholder={{
            label: 'Who is this to you?',
            value: null,
            color: '#909090',
        }}
            items={this.state.rdata}
            useNativeAndroidPickerStyle={true}
           />
*/}
          </View>

      <Text style = {{color:'black',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginTop:hp('0.5%'), marginLeft:wp('3%'), lineHeight:45}}>
      Mobile No.
      </Text>

       <View style = {{flexDirection:'row',marginTop:hp('0%'),width:wp('88.5%'),height:hp('7%'), borderColor:'#F0F0F0',borderRadius:5, borderWidth:2, elevation: this.state.elevations, backgroundColor:'white', marginLeft:wp('3%')}}>
              <TextInput style = {{width:wp('78%'),color:'#909090', height:hp('7%'), fontSize:16, fontFamily:'Avenir Roman', paddingLeft:wp(3)}}
                         placeholder = {'9876xxxxx'}
                         placeholderTextColor = "#909090"
                         autoCapitalize = "none"
                         keyboardType="numeric"
                         maxLength={10}
                         onChangeText={(text) => this.setState({mobile:text})}
                         value={this.state.mobile}
              />

       </View>

   
      <Text style = {{color:'black',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginTop:hp('0.5%'), marginLeft:wp('3%'), lineHeight:45}}>
      Email Address
      </Text>

      <View style = {{flexDirection:'row',marginTop:hp('0%'),width:wp('88.5%'),height:hp('7%'), borderColor:'#F0F0F0',borderRadius:5, borderWidth:2, elevation: this.state.elevations, backgroundColor:'white', marginLeft:wp('3%')}}>
          <TextInput style = {{width:wp('78%'),color:'#909090', height:hp('7%'), fontSize:16, fontFamily:'Avenir Roman', paddingLeft:wp(3)}}
                     placeholder = {'abc@gmail.com'}
                     placeholderTextColor = "#909090"
                     onChangeText={(text) => this.setState({email:text})}
                     value={this.state.email}
          />
      </View>

      <Text style = {{color:'black',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginTop:hp('0.5%'), marginLeft:wp('3%'), lineHeight:45}}>
      Add Account
      </Text>

         <RadioForm style={{ marginTop:10, marginLeft:wp(3)}}
                       labelStyle={{paddingRight:20}}
                       radio_props={radio_props_one}
                       initial={0}
                       buttonSize={13}
                       formHorizontal={true}
                       buttonColor={'gray'}
                       labelHorizontal={true}
                       animation={false}
                       labelColor={'#1E1F20'}
                       selectedButtonColor={'#1976D2'}
                       onPress={(value) => {this.setState({value:value})}}
            />



    <TouchableOpacity
    onPress={()=>{
                 this.setState({
                     isChecked:!this.state.isChecked
                 })
               }}>
      <View style={{width: '100%', flexDirection: 'row', alignItems: 'center' , marginTop: 18, backgroundColor:'transparent'}}>

        <CheckBox
            style={{padding: 10, marginTop:-20,}}
            onClick={()=>{
                 this.setState({
                     isChecked:!this.state.isChecked
                 })
               }}
            isChecked={this.state.isChecked}
            checkedImage={<Image source={require('./resources/ic_tick.png')} style={{width:20, height:20, resizeMode:'contain'}}/>}
            unCheckedImage={<Image source={require('./resources/ic_untick.png')} style={{width:20, height:20, resizeMode:'contain'}}/>}
        />

       <Text style={{fontSize: 13, color:'#757575', fontFamily: 'Avenir Roman',width:'90%', backgroundColor:'transparent'}}>
       I hereby declare that I am lawfully authorised to provide the above information on behalf of the owner
        of the information.
        </Text>
      </View>
      </TouchableOpacity>

          </View>


            <Button
            containerStyle={{width:wp('90%'),padding:16, height:hp(7.5), overflow:'hidden', borderRadius:5,
             backgroundColor: '#1976D2', alignSelf:'center', marginTop:hp(3), marginBottom:hp(2)}}
            style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'AvenirLTStd-Heavy'}}
            onPress={this._handlePress}
            >
            Add Member
            </Button>

          </KeyboardAwareScrollView>

                </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor :'#FAFAFA',
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,
        top: window.height/2,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
  

})
