import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    Modal,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import CustomBack from './CustomBack'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom'
import {
  PulseIndicator,
} from 'react-native-indicators';

export default class ViewAllDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topDoctor:[]
        };

    }

    componentWillUnmount() {

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

    _handleStateChange = (state) => {
        // this.getDoctors()
    }

    componentDidMount(){
        this.getDoctors()
         // this.props.navigation.addListener('focus',this._handleStateChange);

    }


    consult=(item, index)=>{
        this.props.navigation.navigate('Summary')
    }

_renderItemTopDoctor=({item, index})=>{
  return(
    <TouchableOpacity style={{width:wp('44.5%'), height:hp(35), margin:15,marginLeft:10,marginRight:5,marginTop:10,marginBottom:10,backgroundColor:'white',}}
    activeOpacity={0.99}
    onPress={()=> this.openDoctorDetails(item, index)}>
      <View style  = {{width:'100%',height:'100%', backgroundColor:'white',shadowColor: "#000",
          elevation:4, flexDirection:'column',borderRadius:5,
      }}>
    <Image style={{width:'93%',backgroundColor:'transparent', height:hp(18), resizeMode:'cover',margin:7}} source={item.artwork}/>

    <View style={{width:wp(14), borderRadius:5,height:hp(3), backgroundColor:'#1976D2',
     justifyContent:'center', position:'absolute', right:10, top:hp(15.5)}}>
    <Text style = {{fontSize:13,fontFamily:'Avenir Roman',color:'white',alignSelf:'center'}}>
    ₹ 700
    </Text>
    </View>
    <Text style = {{fontSize:17,fontFamily:'AvenirLTStd-Heavy',color:'#1976D2',marginLeft:7, marginTop:5, marginRight:7}}
    numberOfLines={1}>
        {item.title}
    </Text>

    <Text style = {{fontSize:15,fontFamily:'AvenirLTStd-Heavy',color:'black',marginLeft:7, marginTop:3, marginRight:7}}
    numberOfLines={1}>
        {item.exp}
    </Text>

    <Text style = {{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'gray',marginLeft:7, marginTop:3, marginRight:7}}
    numberOfLines={1}>
        {item.degree}
    </Text>

    <Text style = {{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'black',marginLeft:7, marginTop:3, marginRight:7}}
    numberOfLines={1}>
        {item.cat}
    </Text>

    <Text style = {{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'gray',marginLeft:7, marginTop:3, marginRight:7}}
    numberOfLines={1}>
        {item.speaks}
    </Text>

      </View>
    </TouchableOpacity>
  )
}

    render() {

        if(this.state.loading){
            return(
                <IndicatorCustom/>
            )
        }
        return (

      <View style={styles.container}>
         <CustomBack headTitle={'Available Doctors'}
         navigation={this.props.navigation}/>

        <View style={{width:wp('100%'), backgroundColor:'transparent',flexDirection:'column',
        alignSelf:'center'}}>

        <View style={{width:'100%', height:hp(4), backgroundColor:'#f5f5f5', paddingLeft:15, padding:15}}>
          <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20'}}>Showing Doctors Available Now</Text>
        </View>

        <FlatList style= {{flexGrow:0,marginTop:10, marginLeft:5,marginRight:5}}
                  data={this.state.topDoctor}
                  horizontal={false}
                  numColumns={2}
                  keyExtractor = { (item, index) => index.toString() }
                  renderItem={this._renderItemTopDoctor}
                  extraData ={this.state}
        />

        </View>


        </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor :'#f5f5f5',
    },

})
