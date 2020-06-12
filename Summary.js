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
    ScrollView
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import CustomBack from './CustomBack'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom'
import CheckBox from 'react-native-check-box'

export default class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked:false,
            categs:[
              {
                id: '1',
                title: 'Fever',    
                artwork: require('./resources/sone.png'),
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
         this.props.navigation.addListener('focus',this._handleStateChange);

    }

    onSelect=(item, index)=>{
      this.props.navigation.navigate('ChooseDoctor')
    }

    _renderItems=({item, index})=>{

        return(
      <TouchableOpacity style={{width:'45%', margin:10,marginRight:5,marginTop:10,marginBottom:10, height:hp('9%')}}
            onPress={() => this.selectedFirst(item.id)}
            activeOpacity={0.99}>
                <View   style  = {{width:'100%', height:'100%',backgroundColor:'white',shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,borderRadius:15,
                    shadowRadius: 3.84,elevation:4, flexDirection:'row',alignItems:'center',
                }}
                >

              <Image source={item.artwork}
                     style  = {{width:30, height:30,resizeMode:'contain', marginLeft:wp(4)}}/>
              <Text style = {{fontSize:15,marginTop:0,fontFamily:'AvenirLTStd-Heavy',color:'#293440',marginLeft:10}}>
                  {item.title}
              </Text>
      <Image style={{width:25, height:25, resizeMode:'contain', alignSelf:'center', position:'absolute', right:10}} source={require('./resources/check.png')}/>

                </View>
            </TouchableOpacity>
        )
    }

    _handlePress=()=>{

        const url = GLOBAL.BASE_URL +  'request_sent'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": GLOBAL.user_id,
                "doctor_id": GLOBAL.doc_item.id,
                "booking_for": "self",
                "member_id":"0",
                "name": GLOBAL.userDetails.name,
                "gender": GLOBAL.userDetails.gender,
                "dob": GLOBAL.userDetails.dob,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {

                console.log(JSON.stringify(responseJson))

                // this.props.navigation.navigate('Payment')

                if (responseJson.status == true) {
                  alert('Request has been sent to our doctor. Our doctor will be with you in few moments.')
                  this.dynamicsRequestCheck(responseJson.id)
                }else{
                  alert('Currently doctor is busy!')
                  this.props.navigation.navigate('ChooseDoctor')
                }
            })
            .catch((error) => {
                console.error(error);
              //   this.hideLoading()
            });        



    }


    dynamicsRequestCheck=(getId)=>{
      this.showLoading()
        const url = GLOBAL.BASE_URL +  'request_check_dynamics'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": GLOBAL.user_id,
                "id": getId
            }),
        }).then((response) => response.json())
            .then((responseJson) => {


                console.log(JSON.stringify(responseJson))

                // this.props.navigation.navigate('Payment')

                if (responseJson.status == true) {
                    if(responseJson.booking_status==2){
                      this.hideLoading()
                      this.props.navigation.navigate('ChooseDoctor')                      
                    }else if(responseJson.booking_status == 1){
                      this.hideLoading()
                      this.permanentBooking()
                    }else if(responseJson.booking_status == 0){
                      this.dynamicsRequestCheck(getId)
                    }
                    // this.setState({ doctorsList : responseJson.doctor_list_s})
                }else{
                  this.props.navigation.navigate('ChooseDoctor')
                }
            })
            .catch((error) => {
                console.error(error);
              //   this.hideLoading()
            });        


    }


    permanentBooking=()=>{
            const url = GLOBAL.BASE_URL + "add_permanent_booking";

              var body={
                for: "1",
                booking_type: "4",
                user_id: GLOBAL.user_id,
                module: 'chat',
                doctor_id: GLOBAL.doc_item.id,
                booking_for: 'self',
                member_id: "0",
                name: GLOBAL.userDetails.name,
                gender: GLOBAL.userDetails.gender,
                dob: GLOBAL.userDetails.dob,
                coupan_code:'0',
                coupan_code_id:'0',
                from_payment_gateway:'0',
                total_amount: parseInt(GLOBAL.doc_item.online_consult_price),
                tax_amount: '0',
                wallet_amount: '0',
                referral_amount: '0',
                discount_amount: '0',
                trxn_mode:'normal'
              } 

                  console.log(JSON.stringify(body))
                  fetch(url, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },

                  body: JSON.stringify(body)
                })
                  .then(response => response.json())
                  .then(responseJson => {
                    console.log(JSON.stringify(responseJson))
                    if (responseJson.status == true) {
                      GLOBAL.chat_g_id = responseJson.bridge_id
                      this.props.navigation.navigate("Chat");
                    } else {
                    }
                  })
                  .catch(error => {
                    console.error(error);
                    this.hideLoading();
                  });

    }

    render() {

        if(this.state.loading){
            return(
                <IndicatorCustom/>
            )
        }
        return (

      <View style={styles.container}>
         <CustomBack headTitle={'Summary'}
         navigation={this.props.navigation}/>
         <ScrollView>
        <View style={{width:wp('100%'), backgroundColor:'transparent',flexDirection:'column',
        alignSelf:'center'}}>


          <View style = {{flexDirection:'row',width:wp('93%'),alignSelf:'center',
          borderRadius:8 ,elevation: 3, backgroundColor:'white',
          marginBottom:hp(1.5), marginTop:hp(2)}}>

          <Image style={{width:60, height:60, borderRadius:30, margin:10}}
          source={{uri: GLOBAL.doc_item.image}}/>

          <View style={{flexDirection:'column', margin:15, marginLeft:10, backgroundColor:'white', width:'75%'}}>
          <Text style = {{color:'#1976D2',fontSize: 17,fontFamily:'AvenirLTStd-Heavy', }}>
          {GLOBAL.doc_item.name}</Text>
          <Text style = {{color:'black',fontSize: 15,fontFamily:'AvenirLTStd-Heavy' }}>
          {GLOBAL.doc_item.experience} years exp</Text>
          <Text style = {{color:'#757575',fontSize: 15,fontFamily:'AvenirLTStd-Medium', marginTop:hp(2)}}
          >
          {GLOBAL.doc_item.speciality_detail}</Text>
          </View>
          </View>

        
      <Text style = {{color:'#1E1F20',fontSize: 17,fontFamily:'AvenirLTStd-Heavy',textAlign:'left', margin:15, marginBottom:5}}>
      Selected Speciality</Text>

        <FlatList style= {{flexGrow:0,}}
                  data={this.state.categs}
                  horizontal={false}
                  keyExtractor = { (item, index) => index.toString() }
                  renderItem={this._renderItems}
        />



      <Text style = {{color:'#1E1F20',fontSize: 17,fontFamily:'AvenirLTStd-Heavy',textAlign:'left', margin:15, marginBottom:5, marginTop:hp(10)}}>
      Apply Coupon</Text>

      <View style = {{flexDirection:'row',justifyContent:'space-between',marginTop:hp('1%'),
      width:wp('92%'),height:hp('7%'), borderColor:'white',borderRadius:5, borderWidth:2,borderColor:'#F0F0F0',  backgroundColor:'white', marginLeft:wp('4%')}}>
          <TextInput style = {{width:wp('70%'),color:'#909090', height:hp('7%'), fontSize:16, fontFamily:'AvenirLTStd-Medium', paddingLeft:wp(5),}}
                     placeholder = {'Enter Coupon Code'}
                     placeholderTextColor = "#909090"
                     autoCapitalize = "none"
                     editable={true}
                     onChangeText={(text) => this.setState({refercode:text})}
                     value={this.state.refercode}
          />

      <TouchableOpacity style={{alignSelf:'center'}}onPress={()=> this.applyReferralCode()}>
      <Text style = {{color:'#1976d2',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',textAlign:'left', marginRight:wp('4%')}}>
      APPLY
      </Text>
      </TouchableOpacity>
      </View>

      <Text style = {{color:'#1E1F20',fontSize: 17,fontFamily:'AvenirLTStd-Heavy',textAlign:'left', margin:15,marginTop:25, marginBottom:5}}>
      Payment Details</Text>


        <View style={{width:'92%',backgroundColor:'white',marginTop:hp(2),flexDirection:'row', height:hp(8),
        borderTopLeftRadius:8, borderTopRightRadius:8,elevation:5,
        alignItems:'center', justifyContent:'space-between',alignSelf:'center', flexDirection:'row',}}>

        <Text style={{fontSize:16,color:'black',marginLeft:wp(4),fontFamily:'AvenirLTStd-Medium', alignSelf:'center'}}>Consultation Fee</Text>
        <Text style={{fontSize:16,color:'black',marginLeft:wp(4),fontFamily:'AvenirLTStd-Medium', alignSelf:'center', marginRight:wp(4)}}>₹ {parseInt(GLOBAL.doc_item.online_consult_price)}</Text>
        </View>
        <View
        style={{borderBottomColor: '#F5F5F5',borderBottomWidth: 0.5, marginTop:0, width:'70%', alignSelf:'center'}}>
        </View>

        <View style={{width:'92%',backgroundColor:'white',flexDirection:'row', height:hp(8),
        borderBottomLeftRadius:8, borderBottomRightRadius:8,elevation:5,
        alignItems:'center', justifyContent:'space-between',alignSelf:'center', flexDirection:'row',}}>

        <Text style={{fontSize:16,color:'black',marginLeft:wp(4),fontFamily:'AvenirLTStd-Heavy', alignSelf:'center'}}>Amount Payable</Text>
        <Text style={{fontSize:16,color:'black',marginLeft:wp(4),fontFamily:'AvenirLTStd-Heavy', alignSelf:'center', marginRight:wp(4)}}>₹ {parseInt(GLOBAL.doc_item.online_consult_price)}</Text>
        </View>
        <View
        style={{borderBottomColor: '#F5F5F5',borderBottomWidth: 1, marginTop:12, width:'80%', alignSelf:'center'}}>
        </View>


      <View style={{width: wp(95), flexDirection: 'row', alignItems: 'center' , alignSelf:'center',marginTop: 10}}>

        <CheckBox
            style={{padding: 10, marginTop:0,}}
            onClick={()=>{
                 this.setState({
                     isChecked:!this.state.isChecked
                 })
               }}
            isChecked={this.state.isChecked}
            checkedImage={<Image source={require('./resources/ic_tick.png')} style={{width:20, height:20, resizeMode:'contain'}}/>}
            unCheckedImage={<Image source={require('./resources/ic_untick.png')} style={{width:20, height:20, resizeMode:'contain'}}/>}
        />

       <Text style={{fontSize: 13, color:'#1976D2', fontFamily: 'AvenirLTStd-Medium',width:'95%', backgroundColor:'transparent'}}>
       Donate ₹ 5 to Feed India Charitable Trust
        </Text>
      </View>

        <Button
        containerStyle={{width:wp('90%'),padding:15, height:hp(7), overflow:'hidden', borderRadius:5,
         backgroundColor: '#1976D2', alignSelf:'center',marginVertical: hp(2)}}
        style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'AvenirLTStd-Heavy'}}
        onPress={this._handlePress}
        >
        Pay
        </Button>

        </View>

        </ScrollView>

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
