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

export default class HelpCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues:[
            {
                name:'Booking a new appointment'
            },
            {
                name:'Existing Appointment'
            },
            {
                name:'Online consultations'
            },
            {
                name:'Feedbacks'
            },
            {
                name:'Medicine Orders'
            },
            {
                name:'Diagnostic Tests'
            },
            {
                name:'Health Plans'
            },
            {
                name:'My Account'
            },
            {
                name:'Have a feature in mind'
            },
            {
                name:'Other issues'
            },
            ]
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
        // this.getMembers()
    }

    componentDidMount(){
        // this.getMembers()
         this.props.navigation.addListener('willFocus',this._handleStateChange);

    }

    _renderItems=({item, index})=>{
        return(
        <TouchableOpacity>
        <View style={{width:wp('100%'),backgroundColor:'white',marginTop:hp(1.2),flexDirection:'row', height:hp(4.5),
        alignItems:'center', justifyContent:'space-between',alignSelf:'center', flexDirection:'row', marginBottom:hp(1.4)}}>

        <Text style={{fontSize:15,color:'black',marginLeft:wp(4),fontFamily:'AvenirLTStd-Medium', alignSelf:'center'}}>{item.name}</Text>

        <Image style={{marginRight:wp(4), width:15, height:15, resizeMode:'contain'}} source={require('./resources/right.png')}/>
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
         <CustomBack headTitle={'Help Center'}
         navigation={this.props.navigation}/>
        <View style={{width:wp('100%'), backgroundColor:'transparent',flexDirection:'column',
        alignSelf:'center'}}>

        <View style={{width:'100%', height:hp(4), backgroundColor:'#f5f5f5', paddingLeft:15, padding:15}}>
          <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'gray'}}>I have an issue with</Text>
        </View>
        
        <View style={{backgroundColor:'white', marginTop:hp(2)}}>
        <FlatList style= {{flexGrow:0,}}
                  data={this.state.issues}
                  numColumns={1}
                  keyExtractor = { (item, index) => index.toString() }
                  renderItem={this._renderItems}
        />
        </View>

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
