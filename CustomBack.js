import React, {Component} from 'react'
import {TouchableOpacity, View, Image, Text } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class CustomBack extends Component{
	render(){
	return(
    <View style={{width:wp(100), backgroundColor:'white'}}>
     <TouchableOpacity style={{marginLeft:wp(3),width:'60%',marginTop:hp(3) }} onPress={()=> this.props.navigation.goBack()}>
      <View style = {{flexDirection:'row',width:'100%',height:hp('5.5%'), }}>
      <Image style={{width:22, height:22, resizeMode:'contain'}}
      source={require('./resources/back.png')}/>
     <Text style = {{color:'#212121',fontSize: 19,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginLeft:wp(2.5)}}>
     {this.props.headTitle}
      </Text>
      </View>         
     </TouchableOpacity>
      <View style={{width:wp(100), backgroundColor:'rgba(0,0,0,0.09)', elevation:6,height:0.5}}/>
     </View>
	)
	}

}