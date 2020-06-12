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
    ScrollView
} from 'react-native';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import Button from 'react-native-button';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment'
import IndicatorCustom from './IndicatorCustom'
import CustomBack from './CustomBack'

export default class ConsultationDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            list_im:[
            {
              id:1,
              img: require('./resources/splash.png')
            },
            {
              id:2,
              img: require('./resources/splash.png')
            },
            {
              id:3,
              img: require('./resources/splash.png')
            },
            ]
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

    }


    _renderItems = ({item,index}) => {
        return (
            <TouchableOpacity onPress={() => this.selectedFirst(item, index)
            }
            activeOpacity={0.99}>

      <View style={{flexDirection: 'row', marginRight: 12}}>
        <Image
          style={{
            width: 120,
            height: 120,
            borderRadius: 15,
            borderColor: 'black',
            borderWidth: 1.5,
            marginTop: 20,
          }}
          source={item.img}
        />
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

         <CustomBack headTitle={'Consultation Details'}
         navigation={this.props.navigation}/>
         <ScrollView>
          <View style={{width:wp('93%'),backgroundColor:'transparent', flex:1, alignItems:'center', alignSelf:'center'}}>

          <View style = {{flexDirection:'row',width:wp('93%'),alignSelf:'center',height:hp('11%'),
          borderRadius:8 ,elevation: 3, backgroundColor:'white',
          marginVertical:hp(1.5)}}>

          <Image style={{width:60, height:60, borderRadius:30, margin:10}}
          source={require('./resources/doc.png')}/>

          <View style={{flexDirection:'column', margin:15, marginLeft:10, backgroundColor:'white', width:'62%'}}>
          <Text style = {{color:'#1976D2',fontSize: 17,fontFamily:'AvenirLTStd-Heavy', }}>
          Dr. John Singleton</Text>
          <Text style = {{color:'black',fontSize: 15,fontFamily:'AvenirLTStd-Heavy', marginTop:hp(1) }}>
          Physician</Text>
          </View>
          </View>


          <View style = {{flexDirection:'column',width:wp('93%'),alignSelf:'center',height:hp('16%'),
          borderRadius:8 ,elevation: 3, backgroundColor:'white',padding:10,
          marginVertical:hp(1)}}>
          <Text style = {{color:'#757575',fontSize: 15,fontFamily:'AvenirLTStd-Medium', marginTop:hp(1)}}>
          Procedure</Text>
          <Text style = {{color:'black',fontSize: 16,fontFamily:'AvenirLTStd-Heavy', marginTop:hp(0.5) }}>
          Consult</Text>
          <Text style = {{color:'#757575',fontSize: 15,fontFamily:'AvenirLTStd-Medium', marginTop:hp(1.5)}}>
          Date and Time</Text>
          <Text style = {{color:'black',fontSize: 16,fontFamily:'AvenirLTStd-Heavy', marginTop:hp(0.5) }}>
          16 May 2020, 11:21 PM</Text>
          </View>

          <View style = {{flexDirection:'column',width:wp('93%'),alignSelf:'center',height:hp('16%'),
          borderRadius:8 ,elevation: 3, backgroundColor:'white',padding:10,
          marginVertical:hp(1)}}>
          <Text style = {{color:'#757575',fontSize: 15,fontFamily:'AvenirLTStd-Medium', marginTop:hp(1)}}>
          Booked For</Text>
          <Text style = {{color:'black',fontSize: 16,fontFamily:'AvenirLTStd-Heavy', marginTop:hp(0.5) }}>
          Rahul Roy</Text>
          <Text style = {{color:'#757575',fontSize: 15,fontFamily:'AvenirLTStd-Medium', marginTop:hp(1.5)}}>
          Booking ID</Text>
          <Text style = {{color:'black',fontSize: 16,fontFamily:'AvenirLTStd-Heavy', marginTop:hp(0.5) }}>
          #12</Text>
          </View>


          <View style = {{flexDirection:'column',width:wp('93%'),alignSelf:'center',height:hp('25%'),
          borderRadius:8 ,elevation: 3, backgroundColor:'white',padding:10,
          marginVertical:hp(1)}}>
          <Text style = {{color:'black',fontSize: 16,fontFamily:'AvenirLTStd-Heavy', marginTop:hp(0.5) }}>
          Prescription</Text>
          <FlatList style={{marginTop:0}}
          data={this.state.list_im}
          renderItem={this._renderItems}
          horizontal= {true}

          keyExtractor = { (item, index) => index.toString() }
          />

          </View>

          <TouchableOpacity style={{width:wp(93),borderRadius:5, marginTop:hp('2%'),marginBottom:hp(4),
           backgroundColor:'#1976D2',height:hp('7%'),alignSelf:'center',}}
           onPress={this.login}>
          <View style={{width:'100%', height:hp('7%'), justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
          <Text style = {{color:'white',fontSize: 17,fontFamily:'AvenirLTStd-Heavy', marginLeft:wp(4)}}>
          View Chat History
          </Text>

          <Image style={{width:25, height:25, resizeMode:'contain', marginRight:wp(1)}}
          source={require('./resources/right.png')}/>
          </View>
          
          </TouchableOpacity>


          </View>

          </ScrollView>
        </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor :'#FAFAFA',
    },
})
