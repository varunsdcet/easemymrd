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
    TextInput
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
 
export default class ChooseHospital extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height:'',
            weight:'',
            doctorsList:[
      {
        id: '1',
        title: 'Dr. Jordan',
        exp: '5 years exp',
        degree: 'MBBS, MD',
        cat: 'Physician',
        speaks: 'English, Hindi',    
        artwork: require('./resources/doc.png'),
        loc: 'Rohini, New Delhi',
        fee: 'Rs. 200',
      },
      {
        id: '1',
        title: 'Dr. Jordan',
        exp: '5 years exp',
        degree: 'MBBS, MD',
        cat: 'Physician',
        speaks: 'English, Hindi',    
        artwork: require('./resources/doc.png'),
        loc: 'Rohini, New Delhi',
        fee: 'Rs. 200',
      },
      {
        id: '1',
        title: 'Dr. Jordan',
        exp: '5 years exp',
        degree: 'MBBS, MD',
        cat: 'Physician',
        speaks: 'English, Hindi',    
        artwork: require('./resources/doc.png'),
        loc: 'Rohini, New Delhi',
        fee: 'Rs. 200',
      },
      {
        id: '1',
        title: 'Dr. Jordan',
        exp: '5 years exp',
        degree: 'MBBS, MD',
        cat: 'Physician',
        speaks: 'English, Hindi',    
        artwork: require('./resources/doc.png'),
        loc: 'Rohini, New Delhi',
        fee: 'Rs. 200',
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
        // this.getDoctors()
    }

    componentDidMount(){
        // this.getDoctors()
         this.props.navigation.addListener('willFocus',this._handleStateChange);

    }

    onSelect=(item, index)=>{

    }

    _renderItems=({item, index})=>{

        return(
    <TouchableOpacity style={{width:wp('93%'), height:hp(36.5), margin:15,marginLeft:10,marginRight:5,
    marginTop:10,marginBottom:10,backgroundColor:'white',borderRadius:15}}
    activeOpacity={0.99}
    onPress={()=> this.onSelect(item, index)}>
      <View style  = {{width:'100%',height:'100%', backgroundColor:'white',shadowColor: "#000",
          elevation:4, flexDirection:'row',borderRadius:15, 
      }}>
    <Image style={{width:'28%',backgroundColor:'transparent', height:hp(18), resizeMode:'cover',margin:10}} source={item.artwork}/>
      <PulseIndicator
      style={{position:'absolute', left:wp(25)}}
      color='#00D65B' 
      size={25} />

    <View style={{flexDirection:'column', marginTop:hp(2)}}>
    <Text style = {{fontSize:17,fontFamily:'AvenirLTStd-Heavy',color:'#1976D2',marginLeft:7, marginTop:5, marginRight:7}}
    numberOfLines={1}>
        {item.title}
    </Text>

    <Text style = {{fontSize:15,fontFamily:'AvenirLTStd-Heavy',color:'black',marginLeft:7, marginTop:5, marginRight:7}}
    numberOfLines={1}>
        {item.exp}
    </Text>

    <Text style = {{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'gray',marginLeft:7, marginTop:5, marginRight:7}}
    numberOfLines={1}>
        {item.degree}
    </Text>

    <Text style = {{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'black',marginLeft:7, marginTop:5, marginRight:7}}
    numberOfLines={1}>
        {item.cat}
    </Text>

    <Text style = {{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#1E1F20',marginLeft:7, marginTop:5, marginRight:7}}
    numberOfLines={1}>
       Speaks: {item.speaks}
    </Text>
    </View>

    <View style={{flexDirection:'column', width:'97%',position:'absolute', left:5, top:hp(20), backgroundColor:'transparent',}}>
    <Text style = {{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'gray',marginLeft:7, marginTop:5, marginRight:7}}>
       Location: {item.loc}
    </Text>
    <Text style = {{fontSize:15,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',marginLeft:7, marginTop:5, marginRight:7}}
    numberOfLines={1}>
       Fee: {item.fee}
    </Text>
    <Text style = {{fontSize:15,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',marginLeft:7, marginTop:5, marginRight:7}}
    numberOfLines={1}>
    Other information goes here...
    </Text>

    <View style={{flexDirection:'row', margin:10, justifyContent:'space-between', width:'95%', }}>

    <TouchableOpacity style={{width:'40%', height:hp(4.5)}}>
    <View style={{width:'100%', borderRadius:8, borderColor:'#979797', borderWidth:1, height:hp(4.5), justifyContent:'center'}}>
    <Text style = {{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'gray',alignSelf:'center'}}>
    Know More
    </Text>    
    </View>
    </TouchableOpacity>

    <TouchableOpacity style={{width:'40%', height:hp(4.5)}}>
    <View style={{width:'100%', borderRadius:8, borderColor:'#1976D2', backgroundColor:'#1976D2',borderWidth:1, height:hp(4.5), justifyContent:'center'}}>
    <Text style = {{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'white',alignSelf:'center'}}>
    Consult Now
    </Text>    
    </View>
    </TouchableOpacity>

    </View>

    </View>

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

         <CustomBack headTitle={'Apollo Hospital'}
         navigation={this.props.navigation}/>

         <TouchableOpacity style={{position:'absolute', top:18, right:15}}>
         <Image style={{width:25, height:28, resizeMode:'contain',}}
         source={require('./resources/filter.png')}/>
         </TouchableOpacity>

        <View style={{width:wp('100%'), backgroundColor:'transparent',flexDirection:'column',
        alignSelf:'center'}}>

        <View style={{width:'100%', height:hp(4), backgroundColor:'#f5f5f5', paddingLeft:15, padding:15}}>
          <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20'}}>Showing Doctors from Apollo Hospital</Text>
        </View>

        


        <FlatList style= {{flexGrow:0,marginTop:hp(1), marginBottom:hp(14)}}
                  data={this.state.doctorsList}
                  horizontal={false}
                  keyExtractor = { (item, index) => index.toString() }
                  renderItem={this._renderItems}
                  extraData={this.state}
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
