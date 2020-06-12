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

export default class ChooseDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.getDoctors()
    }

    componentDidMount(){
        this.props.navigation.addListener('focus',this._handleStateChange);

    }

    getDoctors=()=>{
        const url = GLOBAL.BASE_URL +  'fetch_nearest_doctor'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": GLOBAL.user_id,
                "doctor_condition":"online",
                "type":"",
                "departments_filter":"",
                "specialty":"",
                "symptoms":"",
                "hospital_filter":"",
                "price_range_min":"",
                "price_range_max":"",
                "is_favrouite":""
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson))

                if (responseJson.status == true) {
                    this.setState({ doctorsList : responseJson.doctor_list_s})
                }
            })
            .catch((error) => {
                console.error(error);
              //   this.hideLoading()
            });
    }

    onSelect=(item, index)=>{

    }

    consult=(item, index)=>{
        GLOBAL.doc_item = item
        this.props.navigation.navigate('Summary')
    }

     capitalizeFirstLetter=(string)=> {
       return string.charAt(0).toUpperCase() + string.slice(1);
    }

    _renderItems=({item, index})=>{

      // var docName = this.capitalizeFirstLetter(item.name)
      // var speName = this.capitalizeFirstLetter(item.speciality_detail)
      // var langName = this.capitalizeFirstLetter(item.languages)
      var degrees = item.degree.toString()
      var price = parseInt(item.online_consult_price)

        return(
    <TouchableOpacity style={{width:wp('93%'), height:hp(43), margin:15,marginLeft:10,marginRight:5,
    marginTop:10,marginBottom:10,backgroundColor:'white',borderRadius:15}}
    activeOpacity={0.99}
    onPress={()=> this.onSelect(item, index)}>
      <View style  = {{width:'100%',height:'100%', backgroundColor:'white',shadowColor: "#000",
          elevation:4, flexDirection:'row',borderRadius:15,
      }}>
    <Image style={{width:'29%',backgroundColor:'transparent', height:hp(20), resizeMode:'cover',margin:10}} source={{uri : item.image}}/>
      <PulseIndicator
      style={{position:'absolute', left:wp(25)}}
      color='#00D65B'
      size={25} />

    <View style={{flexDirection:'column', marginTop:hp(1), width:wp(60)}}>
    <Text style = {{fontSize:18,fontFamily:'AvenirLTStd-Heavy',color:'#1976D2',marginLeft:5, marginTop:5, marginRight:7}}
    numberOfLines={1}>
        {item.name}
    </Text>

    <Text style = {{fontSize:16,fontWeight:'bold',fontFamily:'AvenirLTStd-Heavy',color:'black',marginLeft:5, marginTop:5, marginRight:7}}
    numberOfLines={1}>
        {item.experience} years exp
    </Text>


    <Text style = {{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#757575',marginLeft:5, marginTop:5, marginRight:7}}
    numberOfLines={1}>
        {degrees}
    </Text>

    <Text style = {{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#1E1F20',marginLeft:5, marginTop:5, marginRight:7, lineHeight:18}}
    numberOfLines={1}>
        {item.speciality_detail}
    </Text>



    <Text style = {{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#1E1F20',marginLeft:5, marginTop:5, marginRight:7}}
    numberOfLines={1}>
       Speaks: {item.languages}
    </Text>
    </View>

    <View style={{flexDirection:'column', width:'97%',position:'absolute', left:5, top:hp(24), backgroundColor:'transparent',}}>
    <Text style = {{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#757575',marginLeft:5, marginTop:3, marginRight:7}}>
       Location: {item.location}
    </Text>
    <Text style = {{fontSize:14,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',marginLeft:5, marginTop:5, marginRight:7}}
    numberOfLines={1}>
       Fee: ₹ {price}
    </Text>
    <Text style = {{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#212121',marginLeft:5, marginTop:5, marginRight:7}}
    numberOfLines={1}>
    Other information goes here...
    </Text>

    <View style={{flexDirection:'row', margin:10, justifyContent:'space-between', width:'95%', }}>

    <TouchableOpacity style={{width:'40%', height:hp(4.5)}}
    onPress={()=> {
        GLOBAL.doc_id = item.id
        this.props.navigation.navigate('DoctorDetails')}
    }>
    <View style={{width:'100%', borderRadius:8, borderColor:'#979797', borderWidth:1, height:hp(4.5), justifyContent:'center'}}>
    <Text style = {{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'gray',alignSelf:'center'}}>
    Know More
    </Text>
    </View>
    </TouchableOpacity>

    <TouchableOpacity style={{width:'40%', height:hp(4.5)}}
    onPress={()=> this.consult(item, index)}>
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
         <CustomBack headTitle={'Choose your Doctor'}
         navigation={this.props.navigation}/>

        <View style={{width:wp('100%'), backgroundColor:'transparent',flexDirection:'column',
        alignSelf:'center'}}>

        <View style={{width:'100%', height:hp(4), backgroundColor:'#f5f5f5', paddingLeft:15, padding:15}}>
          <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20'}}>Showing Doctors Available Now</Text>
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
