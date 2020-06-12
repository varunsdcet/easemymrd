import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import CustomBack from './CustomBack'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom'

export default class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
// alert('hi')
    }

    componentDidMount(){
        // this.getMembers()
         this.props.navigation.addListener('focus',this._handleStateChange);

    }

    onSelect=(item, index)=>{

    }

    _renderItems=({item, index})=>{

        return(
        <TouchableOpacity
        onPress={()=> this.onSelect(item, index)}>
        <View style={{width:'100%',backgroundColor:'white',marginTop:hp(0),flexDirection:'row', height:hp(7),
        alignItems:'center', justifyContent:'space-between',alignSelf:'center', flexDirection:'row',}}>

        <Text style={{fontSize:15,color:'black',marginLeft:wp(4),fontFamily:'AvenirLTStd-Medium', alignSelf:'center'}}>{item.name}</Text>

        <Text style={{fontSize:13,color:'#bfbfbf',marginRight:wp(4),fontFamily:'AvenirLTStd-Medium', alignSelf:'center'}}>SPECIALITY</Text>
        </View>
        <View
        style={{backgroundColor: '#F5F5F5',  width:'100%',height:1}}/>


        </TouchableOpacity>
        )
    }

    buttonPress=()=>{
        this.props.navigation.navigate('SuccessScreen')
    }

    render() {

        if(this.state.loading){
            return(
                <IndicatorCustom/>
            )
        }
        return (

      <View style={styles.container}>
        <View style={{width:wp('100%'), backgroundColor:'transparent',flexDirection:'column',
        alignSelf:'center'}}>

        <ScrollView>

        <View style={{width:'100%', height:130, backgroundColor:'#1976D2', flexDirection:'column'}}>

        <View style={{width:'100%', flexDirection:'row', margin:15, marginTop:25,}}>
        <TouchableOpacity hitSlope={{left:50, right:50, top:50, bottom:50}}
        onPress={()=> this.props.navigation.goBack()}>
        <Image style={{width:25, height:25, resizeMode:'contain'}}
        source={require('./resources/back-white.png')}/>
        </TouchableOpacity>
        <Text style = {{fontSize:20,fontFamily:'AvenirLTStd-Medium',color:'white',marginLeft:wp(23.5)}}>
        Amount to Pay
        </Text>
        </View>
        <Text style = {{fontSize:30,fontFamily:'AvenirLTStd-Heavy',color:'white',alignSelf:'center'}}>
        ₹ 200
        </Text>
        </View>

        <TouchableOpacity>
        <Text style = {{fontSize:17,margin:20,fontFamily:'AvenirLTStd-Medium',color:'#1E1F20',textAlign:'left',}}>
        Debit / Credit Card
        </Text>
        <View style={{backgroundColor:'#bfbfbf', height:1, width:'100%'}}/>
        </TouchableOpacity>

        <TouchableOpacity>
        <Text style = {{fontSize:17,margin:20,fontFamily:'AvenirLTStd-Medium',color:'#1E1F20',textAlign:'left',}}>
        Net Banking
        </Text>
        <View style={{backgroundColor:'#bfbfbf', height:1, width:'100%'}}/>
        </TouchableOpacity>

        <TouchableOpacity>
        <Text style = {{fontSize:17,margin:20,fontFamily:'AvenirLTStd-Medium',color:'#1E1F20',textAlign:'left',}}>
        Paytm Wallet
        </Text>
        <View style={{backgroundColor:'#bfbfbf', height:1, width:'100%'}}/>
        </TouchableOpacity>

        <TouchableOpacity>
        <Text style = {{fontSize:17,margin:20,fontFamily:'AvenirLTStd-Medium',color:'#1E1F20',textAlign:'left',}}>
        UPI
        </Text>
        <View style={{backgroundColor:'#bfbfbf', height:1, width:'100%'}}/>
        </TouchableOpacity>

        <TouchableOpacity>
        <Text style = {{fontSize:17,margin:20,fontFamily:'AvenirLTStd-Medium',color:'#1E1F20',textAlign:'left',}}>
        PayPal
        </Text>
        <View style={{backgroundColor:'#bfbfbf', height:1, width:'100%'}}/>
        </TouchableOpacity>


        </ScrollView>


    
        </View>
          <TouchableOpacity style={{width:wp('90%'),borderRadius:5, position:'absolute',bottom:hp(3),
           backgroundColor:'#1976D2',height:hp('6.5%'),alignSelf:'center',}}
           onPress={this.buttonPress}>
          <View style={{width:'100%', height:hp('6.5%'), justifyContent:'center',alignItems:'center'}}>
          <Text style = {{color:'white',fontSize: 18,fontFamily:'AvenirLTStd-Heavy',
          alignSelf:'center'}}>
          Pay ₹ 200
          </Text>
          </View>
          
          </TouchableOpacity>


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
