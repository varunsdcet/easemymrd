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
    TextInput,
    ImageBackground,
    ScrollView,
    Linking
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
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
// import StarRating from 'react-native-star-rating';
import { Rating, AirbnbRating } from 'react-native-ratings';
import * as Progress from 'react-native-progress';


export default class DoctorDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating_list:[{
                name:'Rahul Sharma',
                review:'Dr. Varinder Kumar explains exactly what is wrong and how we are going to repair. I sincerely trust him, his medical',
                rating: 5
            },
            {
                name:'Rahul Sharma',
                review:'Dr. Varinder Kumar explains exactly what is wrong and how we are going to repair. I sincerely trust him, his medical',
                rating: 5
            },
            {
                name:'Rahul Sharma',
                review:'Dr. Varinder Kumar explains exactly what is wrong and how we are going to repair. I sincerely trust him, his medical',
                rating: 5
            },
            {
                name:'Rahul Sharma',
                review:'Dr. Varinder Kumar explains exactly what is wrong and how we are going to repair. I sincerely trust him, his medical',
                rating: 5
            },

            ],
            index:0,
            routes: [
              { key: 'first', title: 'About' },
              { key: 'second', title: 'Location' },
              { key: 'third', title: 'Experience' },
              { key: 'fourth', title: 'Education' },
              { key: 'fifth', title: 'Rating' },

            ],
            doctor_details: {}
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
         this.getDoctorDetails()
         // this.props.navigation.addListener('focus',this._handleStateChange);

    }

    getDoctorDetails=()=>{
        this.showLoading()
        const url = GLOBAL.BASE_URL +  'full_dr_detail'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": GLOBAL.user_id,
                "id": GLOBAL.doc_id,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson))
                this.hideLoading()
                if (responseJson.status == true) {
                    this.setState({ doctor_details : responseJson.doctor_detail})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });
    }

    getDirections=(lat , long)=>{

            var url = `https://www.google.com/maps?saddr=My+Location&daddr=`+lat+','+long;
            Linking.openURL(url);

    }

    consultNow=()=>{
        this.props.navigation.navigate('Summary')
    }


    _renderScene = ({ route }) => {

        var yeah = this.state.doctor_details

        switch (route.key) {
            case 'first':
            return <View style={{width:wp(100), backgroundColor:'#f6f6f6',}}>
            <View style={{width:wp(93), flexDirection:'column',alignSelf:'center', marginBottom:hp(3), backgroundColor:'white', borderRadius:10, marginTop:15,}}>
        <View style={{width:'92%',backgroundColor:'white',marginTop:hp(2),flexDirection:'row', height:hp(4.5),
        alignItems:'center', justifyContent:'space-between',alignSelf:'center', flexDirection:'row', marginTop:hp(2)}}>
        <View style={{flexDirection:'row',}}>
        <Image style={{width:35, height:35, resizeMode:'contain',}}
        source={require('./resources/abouts.png')}/>
        <Text style={{fontSize:15,color:'black',marginLeft:wp(4),fontFamily:'AvenirLTStd-Heavy', alignSelf:'center'}}>About Me</Text>
        </View>
        </View>
        <View
        style={{borderBottomColor: '#F5F5F5',borderBottomWidth: 1, marginTop:15, width:'100%', alignSelf:'center'}}>
        </View>
        <Text style={{fontSize:15,color:'black',lineHeight:25,marginLeft:wp(4),
        fontFamily:'AvenirLTStd-Heavy', margin:10}}>{yeah.bio}</Text>

            </View>
            </View>;
            break;

            case 'second': return <View style={{width:wp(100), backgroundColor:'#f6f6f6',}}>
            <View style={{width:wp(93), flexDirection:'column',alignSelf:'center', height:hp(39),marginBottom:hp(3), backgroundColor:'white', borderRadius:10, marginTop:15,}}>
            <Image style={{width:'100%', height:'68%'}} source={require('./resources/mapss.png')}/>
        <Text style={{fontSize:17,color:'black',marginLeft:wp(5),fontFamily:'AvenirLTStd-Heavy', margin:10}}>
        {yeah.address}
        </Text>
        <Text style={{fontSize:14,color:'grey',marginLeft:wp(5),fontFamily:'AvenirLTStd-Medium', }}>
        {yeah.locality}
        </Text>
        <Button style={{fontSize:15,color:'#1976D2',fontFamily:'AvenirLTStd-Heavy'}}
        containerStyle={{backgroundColor:'white',  marginVertical:10, width:150, marginLeft:8, height:20}}
        onPress={()=> this.getDirections(yeah.lat, yeah.lon)}>
         GET DIRECTIONS
        </Button>

            </View>
            </View>;
            break;

            case 'third': return <View style={{width:wp(100), backgroundColor:'#f6f6f6',}}>
              <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20', margin:15}}>My Work Experience</Text>

            <View style={{width:wp(93), flexDirection:'column',alignSelf:'center', height:hp(25.7),marginBottom:hp(3), backgroundColor:'white', borderRadius:10, marginTop:0,}}>
        <View style={{width:'92%',backgroundColor:'white',marginTop:hp(2),flexDirection:'row', height:hp(4.5),
        alignItems:'center', justifyContent:'space-between',alignSelf:'center', flexDirection:'row', marginTop:hp(2)}}>
        <View style={{flexDirection:'row',}}>
        <Image style={{width:38, height:38, resizeMode:'contain',}}
        source={require('./resources/spec.png')}/>
        <Text style={{fontSize:16,color:'black',marginLeft:wp(4),fontFamily:'AvenirLTStd-Heavy', alignSelf:'center'}}>Specialities</Text>
        </View>
        </View>
        <View
        style={{borderBottomColor: '#F5F5F5',borderBottomWidth: 1, marginTop:15, width:'100%', alignSelf:'center'}}>
        </View>

        <View style={{width:'92%',backgroundColor:'white',marginTop:hp(2),flexDirection:'row', height:hp(4.5),
        alignItems:'center', justifyContent:'space-between',alignSelf:'center', flexDirection:'row', marginTop:hp(2)}}>
        <View style={{flexDirection:'row',}}>
        <Image style={{width:38, height:38, resizeMode:'contain',}}
        source={require('./resources/ic_med.png')}/>
        <Text style={{fontSize:16,color:'black',marginLeft:wp(4),fontFamily:'AvenirLTStd-Heavy', alignSelf:'center'}}>Family Medicine</Text>
        </View>
        </View>
        <View
        style={{borderBottomColor: '#F5F5F5',borderBottomWidth: 1, marginTop:15, width:'100%', alignSelf:'center'}}>
        </View>



        <View style={{width:'92%',backgroundColor:'white',marginTop:hp(2),flexDirection:'row', height:hp(4.5),
        alignItems:'center', justifyContent:'space-between',alignSelf:'center', flexDirection:'row', marginTop:hp(2)}}>
        <View style={{flexDirection:'row',}}>
        <Image style={{width:38, height:38, resizeMode:'contain',}}
        source={require('./resources/ic_heart.png')}/>
        <Text style={{fontSize:16,color:'black',marginLeft:wp(4),fontFamily:'AvenirLTStd-Heavy', alignSelf:'center'}}>Cardiology</Text>
        </View>
        </View>
        <View
        style={{borderBottomColor: '#F5F5F5',borderBottomWidth: 1, marginTop:15, width:'100%', alignSelf:'center'}}>
        </View>
            </View>

            <View style={{width:wp(93), flexDirection:'column',alignSelf:'center', height:hp(35),marginBottom:hp(3), backgroundColor:'white', borderRadius:10, marginTop:0,}}>
        <View style={{width:'92%',backgroundColor:'white',marginTop:hp(2),flexDirection:'row', height:hp(4.5),
        alignItems:'center', justifyContent:'space-between',alignSelf:'center', flexDirection:'row', marginTop:hp(2)}}>
        <View style={{flexDirection:'row',}}>
        <Image style={{width:35, height:35, resizeMode:'contain',}}
        source={require('./resources/exp.png')}/>
        <Text style={{fontSize:15,color:'black',marginLeft:wp(4),fontFamily:'AvenirLTStd-Heavy', alignSelf:'center'}}>Experience</Text>
        </View>
        </View>
        <View
        style={{borderBottomColor: '#F5F5F5',borderBottomWidth: 1, marginTop:15, width:'100%', alignSelf:'center'}}>
        </View>
        <Text style={{fontSize:15,color:'black',marginLeft:wp(5),fontFamily:'AvenirLTStd-Medium', margin:10}}>
        I am licensed to see patients from
        </Text>
        <Text style={{fontSize:16,color:'black',marginLeft:wp(5),fontFamily:'AvenirLTStd-Heavy', }}>
        Florida
        </Text>
        <Text style={{fontSize:15,color:'black',marginLeft:wp(5),fontFamily:'AvenirLTStd-Medium', margin:10, marginTop:15}}>
        Work Experience
        </Text>
        <Text style={{fontSize:16,color:'black',marginLeft:wp(5),fontFamily:'AvenirLTStd-Heavy', }}>
        14 years
        </Text>
        <Text style={{fontSize:15,color:'black',marginLeft:wp(5),fontFamily:'AvenirLTStd-Medium', margin:10, marginTop:15}}>
        Language
        </Text>
        <Text style={{fontSize:16,color:'black',marginLeft:wp(5),fontFamily:'AvenirLTStd-Heavy', }}>
        English, Spanish
        </Text>
            </View>

            </View>;
            break;

        case 'fourth': return <View style={{width:wp(100), backgroundColor:'#f6f6f6',}}>
              <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20', margin:15}}>Education & Certifications</Text>

            <View style={{width:wp(93), flexDirection:'column',alignSelf:'center', height:hp(45),marginBottom:hp(3), backgroundColor:'white', borderRadius:10, marginTop:0,}}>
        <View style={{width:'92%',backgroundColor:'white',marginTop:hp(2),flexDirection:'row', height:hp(4.5),
        alignItems:'center', justifyContent:'space-between',alignSelf:'center', flexDirection:'row', marginTop:hp(2)}}>
        <View style={{flexDirection:'row',}}>
        <Image style={{width:35, height:35, resizeMode:'contain',}}
        source={require('./resources/educa.png')}/>
        <Text style={{fontSize:15,color:'black',marginLeft:wp(4),fontFamily:'AvenirLTStd-Heavy', alignSelf:'center'}}>Education</Text>
        </View>
        </View>
        <View
        style={{borderBottomColor: '#F5F5F5',borderBottomWidth: 1, marginTop:15, width:'100%', alignSelf:'center'}}>
        </View>
        <Text style={{fontSize:14,color:'black',marginLeft:wp(5),fontFamily:'AvenirLTStd-Medium', margin:10, marginTop:20}}>
        Medical School
        </Text>
        <Text style={{fontSize:16,color:'black',marginLeft:wp(5),fontFamily:'AvenirLTStd-Heavy', }}>
        Boston University School of Medicine
        </Text>
        <Text style={{fontSize:14,color:'black',marginLeft:wp(5),fontFamily:'AvenirLTStd-Medium', margin:10, marginTop:20}}>
        Education
        </Text>
        <Text style={{fontSize:16,color:'black',marginLeft:wp(5),fontFamily:'AvenirLTStd-Heavy', }}>
        MBBS, Clinical Medicine
        </Text>
        <Text style={{fontSize:14,color:'black',marginLeft:wp(5),fontFamily:'AvenirLTStd-Medium', margin:10, marginTop:20}}>
        Certification
        </Text>
        <Text style={{fontSize:16,color:'black',marginLeft:wp(5),fontFamily:'AvenirLTStd-Heavy', }}>
        MD '06
        </Text>
            </View>

            <View style={{width:wp(93), flexDirection:'column',alignSelf:'center', height:hp(45),marginBottom:hp(3), backgroundColor:'white', borderRadius:10, marginTop:0,}}>
        <View style={{width:'92%',backgroundColor:'white',marginTop:hp(2),flexDirection:'row', height:hp(4.5),
        alignItems:'center', justifyContent:'space-between',alignSelf:'center', flexDirection:'row', marginTop:hp(2)}}>
        <View style={{flexDirection:'row',}}>
        <Image style={{width:35, height:35, resizeMode:'contain',}}
        source={require('./resources/certi.png')}/>
        <Text style={{fontSize:15,color:'black',marginLeft:wp(4),fontFamily:'AvenirLTStd-Heavy', alignSelf:'center'}}>Certifications & Awards</Text>
        </View>
        </View>
        <View
        style={{borderBottomColor: '#F5F5F5',borderBottomWidth: 1, marginTop:15, width:'100%', alignSelf:'center'}}>
        </View>
        <Text style={{fontSize:16,color:'black',marginLeft:wp(5),fontFamily:'AvenirLTStd-Heavy', margin:10, marginTop:20}}>
        Top Doctor, Fort Myers Region
        </Text>
        <Text style={{fontSize:13,color:'grey',marginLeft:wp(5),fontFamily:'AvenirLTStd-Medium', }}>
        1990
        </Text>
        <Text style={{fontSize:16,color:'black',marginLeft:wp(5),fontFamily:'AvenirLTStd-Heavy', margin:10, marginTop:20}}>
        Top Family Physician, Fort Myers Region
        </Text>
        <Text style={{fontSize:13,color:'grey',marginLeft:wp(5),fontFamily:'AvenirLTStd-Medium', }}>
        2001
        </Text>
        <Text style={{fontSize:16,color:'black',marginLeft:wp(5),fontFamily:'AvenirLTStd-Heavy', margin:10, marginTop:20}}>
        Top Doctor, Fort Myers Region
        </Text>
        <Text style={{fontSize:13,color:'grey',marginLeft:wp(5),fontFamily:'AvenirLTStd-Medium', }}>
        2016
        </Text>
            </View>

            </View>;
            break;

            case 'fifth':
            return <View style={{width:wp(100), backgroundColor:'white',}}>
              <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20', margin:20, marginTop:15}}>Feedback (5)</Text>

              <View style={{flexDirection:'row', height:hp(19),width:wp(90),marginBottom:15, borderRadius:5, borderColor:'#EAECEF', borderWidth:1.5, alignSelf:'center',
                backgroundColor:'#F7F8FA'}}>
              <View style={{flexDirection:'column', width:'40%', alignSelf:'center', justifyContent:'center', alignItems:'center',
                borderRightWidth:1.5, borderRightColor:'#EAECEF'}}>
              <Text style={{fontSize:28,fontFamily:'AvenirLTStd-Heavy',color:'#1976D2' }}>{yeah.rating}
             <Text style={{fontSize:18,fontFamily:'AvenirLTStd-Heavy',color:'#1976D2' }}>/5</Text>
             </Text>
             <Text style={{fontSize:17,fontFamily:'AvenirLTStd-Heavy',color:'#1E2432' }}>Excellent</Text>
             <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Heavy',color:'gray', marginTop:5 }}>{yeah.total_reviews} reviews</Text>
              </View>

              <View style={{flexDirection:'column', backgroundColor:'transparent',width:'60%',
              alignSelf:'center', justifyContent:'center', alignItems:'center',}}>

              <View style={{flexDirection:'row',}}>
             <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Heavy',color:'#1E2432' }}>Excellent</Text>
             <View style={{height:7, marginLeft:5, alignSelf:'center'}}>
             <Progress.Bar progress={0.7} width={100} height={7} />
             </View>
             <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Heavy',color:'#1E2432', marginLeft:5 }}>20</Text>
              </View>

              <View style={{flexDirection:'row',marginLeft:-10, marginTop:10}}>
             <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Heavy',color:'#1E2432' }}>Very Good</Text>
             <View style={{height:7, marginLeft:5, alignSelf:'center'}}>
             <Progress.Bar progress={0.9} width={100} height={7} />
             </View>
             <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Heavy',color:'#1E2432', marginLeft:5 }}>20</Text>
              </View>

              <View style={{flexDirection:'row',marginLeft:3, marginTop:10}}>
             <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Heavy',color:'#1E2432' }}>Average</Text>
             <View style={{height:7, marginLeft:5, alignSelf:'center'}}>
             <Progress.Bar progress={0.5} width={100} height={7} />
             </View>
             <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Heavy',color:'#1E2432', marginLeft:5 }}>20</Text>
              </View>

              <View style={{flexDirection:'row',marginLeft:25, marginTop:10}}>
             <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Heavy',color:'#1E2432' }}>Poor</Text>
             <View style={{height:7, marginLeft:5, alignSelf:'center'}}>
             <Progress.Bar progress={0.4} width={100} height={7} />
             </View>
             <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Heavy',color:'#1E2432', marginLeft:5 }}>20</Text>
              </View>


              <View style={{flexDirection:'row',marginLeft:8, marginTop:10}}>
             <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Heavy',color:'#1E2432' }}>Terrible</Text>
             <View style={{height:7, marginLeft:5, alignSelf:'center'}}>
             <Progress.Bar progress={0.0} width={100} height={7}
               unfilledColor={''}/>
             </View>
             <Text style={{fontSize:14,fontFamily:'AvenirLTStd-Heavy',color:'#1E2432', marginLeft:5 }}>20</Text>
              </View>
                </View>
              </View>

            <FlatList
            data={this.state.rating_list}
            keyExtractor = { (item, index) => index.toString() }
            renderItem={this._renderRatings}
            extraData={this.state}/>


            </View>;
            break;

            default:
                return null;
        }
    };


 renderTabBar(props) {
        return (<TabBar
                style={{backgroundColor: 'white', elevation: 0, borderColor: 'transparent', height:50,}}
                labelStyle={{color: 'rgba(0,0,0,0.5)', fontSize: 13, fontFamily:'AvenirLTStd-Medium', textAlign:'left',}}

                {...props}

               renderLabel={({ route, focused, color }) => {
                var decide
                if(focused)
                  decide='#1976D2'
                else
                  decide= '#757575'
                return(
                  <Text style={{color: decide, fontSize: 15, fontFamily:'AvenirLTStd-Heavy', textAlign:'left',}}>
                    {route.title}
                  </Text>
                )}}
                scrollEnabled ={true}
                tabStyle={{width:'auto'}}
                pressColor={'white'}
                indicatorStyle={{backgroundColor: '#1976D2', height: 3, borderRadius:5, width:'8%', marginLeft:10}}
            />
        );
    }

    _renderRatings=({item, index})=>{
      return(

          <View style={{flexDirection:'row', justifyContent:'space-between',marginVertical:hp(2),width:wp(93),alignSelf:'center',marginTop:hp(2),backgroundColor:'transparent'}}>
          <Image style={{width:60, height:60, borderRadius:30}}
          source={require('./resources/rahul.png')}/>

              <View style={{flexDirection:'column', marginLeft:hp(1), width:'80%',}}>
                  <Text style={{fontSize:17, color:'black',fontFamily:'AvenirLTStd-Heavy'}}>{item.name}</Text>

                  <View style={{flexDirection:'row'}}>
                    <Rating starContainerStyle={{backgroundColor:'white'}}
                      style={{ backgroundColor:'white', width:wp(27),marginVertical:5}}
                      type='star'
                      ratingBackgroundColor={'white'}
                      ratingCount={5}
                      imageSize={21}
                      isDisabled={true}
                      showRating={false}
                      onFinishRating={this.ratingCompleted}
                    />
                  <Text style={{fontSize:15, color:'black',alignSelf:'center', fontFamily:'AvenirLTStd-Heavy', marginLeft:5, marginTop:3}}
                  >5.0</Text>
                  </View>

                  <View style={{flexDirection:'row'}}>
                  <Text style={{fontSize:15, color:'#1E2432', marginTop:hp(0.5), fontFamily:'AvenirLTStd-Medium'}}
                  >{item.review}</Text>
              </View>
              </View>

          </View>

      )
    }

    render() {

        var yea = this.state.doctor_details
        var price = parseInt(yea.online_consultation_price)
//        var degrees = yea.doctor_degree.toString()


        if(this.state.loading){
            return(
                <IndicatorCustom/>
            )
        }
        return (

      <View style={styles.container}>
      <ScrollView>

      <ImageBackground style={{width:'100%', height:hp(30), }}
      source={require('./resources/doc-bg.png')}>
        <TouchableOpacity hitSlope={{left:50, right:50, top:50, bottom:50}}
        style={{position:'absolute', top:20, left:10}}
        onPress={()=> this.props.navigation.goBack()}>
        <Image style={{width:25, height:25, resizeMode:'contain'}}
        source={require('./resources/back-white.png')}/>
        </TouchableOpacity>


      <View style  = {{width:'90%',height:hp('25%'), backgroundColor:'white',shadowColor: "#000",
          elevation:4, flexDirection:'row',borderRadius:15, alignSelf:'center', marginTop:hp(14)
      }}>

    <Image style={{width:'28%',backgroundColor:'transparent', height:hp(16), resizeMode:'cover',margin:15, borderRadius:8}} source={{uri: yea.doctor_image}}/>
      <PulseIndicator
      style={{position:'absolute', left:wp(25)}}
      color='#00D65B'
      size={25} />

    <View style={{flexDirection:'column', marginTop:hp(2), width:wp(56),}}>
    <Text style = {{fontSize:15,fontFamily:'AvenirLTStd-Heavy',color:'#1976D2',marginLeft:7, marginTop:5, marginRight:7}}
    numberOfLines={1}>
    {yea.doctor_name}
    </Text>

    <Text style = {{fontSize:14,fontWeight:'bold',fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',marginLeft:7, marginTop:5, marginRight:7}}
    numberOfLines={1}>
        {yea.doctor_experience} years exp
    </Text>

    <Text style = {{fontSize:14,fontFamily:'AvenirLTStd-Medium',color:'#757575',marginLeft:7, marginTop:5, marginRight:7}}
    numberOfLines={1}>
        {yea.speciality_detail_array}
    </Text>

    <Text style = {{fontSize:13,fontFamily:'AvenirLTStd-Medium',color:'#1E1F20',marginLeft:7, marginTop:5, marginRight:7}}
    numberOfLines={1}>
        Speaks: {yea.languages}
    </Text>

    <Text style = {{fontSize:15,fontFamily:'AvenirLTStd-Medium',color:'#1E1F20',marginLeft:7, marginTop:5, marginRight:7}}
    numberOfLines={1}>
        Fee: ₹{price}
    </Text>
    </View>
    </View>


      </ImageBackground>

    <TouchableOpacity style={{width:'65%', height:hp(7), alignSelf:'center', marginTop:hp(12)}}
    onPress={()=> this.consultNow()}>
    <View style={{flexDirection:'row',width:'100%',height:hp(7), borderRadius:8,
    backgroundColor:'#1976D2',justifyContent:'center', alignItems:'center'}}>
    <Image style={{width: 70, height:28, resizeMode:'contain',marginLeft:-14}}
    source={require('./resources/beat_ic.png')}/>
    <Text style = {{fontSize:17,fontFamily:'AvenirLTStd-Heavy',color:'white',marginLeft:-5}}>
    Consult Now
    </Text>
    </View>
    </TouchableOpacity>

          <View style={{width:wp('100%'),backgroundColor:'transparent', marginTop:hp(2)}}>
                <TabView
                    navigationState={this.state}
                    indicatorStyle={{ backgroundColor: '#800000' }}
                    style={{ backgroundColor: 'white', flexGrow:0 }}
                    renderTabBar={this.renderTabBar}
                    renderScene={this._renderScene}
                    pressColor={'#1976D2'}
                    // onSwipeStart ={(index)=> this.setState({ index })}
                    // onSwipeEnd ={()=> this.hideLoading()}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />


          </View>


        </ScrollView>
        </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        backgroundColor :'white',
    },

})
