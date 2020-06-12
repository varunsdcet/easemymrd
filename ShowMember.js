import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
const GLOBAL = require('./Global');
import CustomBack from './CustomBack.js';
import Button from 'react-native-button';
const window = Dimensions.get('window');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class ShowMember extends React.Component {


    static navigationOptions = ({ navigation }) => {
        return {
               header: () => null,

        }
    }

  render() {
    var yeah = GLOBAL.memDetails

    return (
      <View  style={{backgroundColor:'#FAFAFA', flex:1}}>
         <CustomBack headTitle={'Member Details'}
         navigation={this.props.navigation}/>

        <ScrollView>
           <View style={{flexDirection:'column'}}>

             <View style={{height:'auto',width:'94%',backgroundColor:'white',borderColor:'#F0F0F0',borderRadius:5, borderWidth:2,marginTop:'20%',alignSelf:'center',borderRadius:6}}>
             <Image source={{uri : GLOBAL.imgPath}}
                style={{alignSelf:'center', height:130,width:130, borderRadius:65,borderWidth:8,borderColor:'#e3e3e3',marginTop:'-20%'}}/>


              <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#0000004D',marginLeft:'5%'}}>Name:-</Text>

              <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Medium',color:'#000000',marginLeft:'5%',marginTop:5}}>{yeah.member_name}</Text>



              <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#0000004D',marginLeft:'5%',marginTop:10}}>Email:-</Text>
              <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Medium',color:'#000000',marginLeft:'5%',marginTop:5}}>{yeah.email}</Text>



              <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#0000004D',marginLeft:'5%',marginTop:10}}>Phone:-</Text>
              <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Medium',color:'#000000',marginLeft:'5%',marginTop:5}}>{yeah.mobile}</Text>



              <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#0000004D',marginLeft:'5%',marginTop:10}}>Gender:-</Text>
              <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Medium',color:'#000000',marginLeft:'5%',marginTop:5}}>{yeah.member_gender}</Text>



              <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'#0000004D',marginLeft:'5%',marginTop:10}}>Relation:-</Text>
              <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Medium',color:'#000000',marginLeft:'5%',marginTop:5,marginBottom:'5%'}}>{yeah.relation}</Text>



             </View>

           </View>
        </ScrollView>
        </View>
    );
  }
}

export default ShowMember;