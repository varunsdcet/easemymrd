import React, {Component} from 'react';
import { StyleSheet, Text, View,FlatList, Image,TouchableOpacity ,Alert,Container, Dimensions} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import moment from 'moment';
import CustomBack from './CustomBack'
import IndicatorCustom from './IndicatorCustom'

export default class Notification extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
               header: () => null,
        }
    }

  constructor(props){
    super(props)
    const { navigation } = this.props;
    this.state = {
       notificationslist:[
       {
          title: 'You have appointment with Sarah Connor at 8:00',
          notification:''
       },
       {
          title: 'You have appointment with Sarah Connor at 8:00',
          notification:''

       }

       ],
       limitStart:0
    }
}


  renderRowItem = ({item, index}) => {
    var dt = moment(item.added_on).format('DD-MM-YY, hh:mm A')
    return (
      <View style={{flexDirection: 'row',
    flex : 1, backgroundColor:'transparent',borderRadius:5,  width : window.width-20 ,marginLeft : 10,marginRight:10,marginTop:15,marginBottom:5,elevation:0}}>

    <View style={{backgroundColor:'red', borderRadius:5, height:10, width:10, marginTop:20,}}/>
    <Image style={{width:35, height:35, resizeMode:'contain', margin:10}} source={require('./resources/notification.png')}/>
    <View style={{flexDirection:'column', margin:10, width: '82%'}}>
     <Text style={{fontSize:17,lineHeight:25, color:'black', fontFamily: 'AvenirLTStd-Medium'}}>{item.title}</Text>
{/*    <Text style={{fontSize:13, marginRight:10,fontFamily: 'AvenirLTStd-Medium'}}>{item.notification}</Text>
*/}
     <View style={{flexDirection:'row', width: '100%', alignItems:'flex-start', justifyContent: 'flex-start'}}>

      <Text style={{fontSize:13,marginTop: 10,marginLeft: 0,marginRight:10,  color:'#7E7E7E'}}>{dt}</Text>
         </View>

</View>
</View>



    )
  }

showLoading() {
       this.setState({loading: true})
    }

    hideLoading() {
       this.setState({loading: false})
    }

 loadMoreData = () => {
      const url = GLOBAL.BASE_URL +  'user_notification'
//      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id: GLOBAL.user_id,
    limit_from: this.state.limitStart+25

  }),
}).then((response) => response.json())
    .then((responseJson) => {

   //   console.log(JSON.stringify(responseJson))
     //  this.hideLoading()
       if (responseJson.status == true) {


       this.setState({notificationslist : responseJson.list})

       }

    })
    .catch((error) => {
      console.error(error);
       //this.hideLoading()
    });

  }


componentDidMount(){
  // this.getReviews()
}

   getReviews= () =>{
//      this.showLoading();
      const url = GLOBAL.BASE_URL +  'user_notification'
//      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id: GLOBAL.user_id,
    limit_from:this.state.limitStart

  }),
}).then((response) => response.json())
    .then((responseJson) => {

      console.log(JSON.stringify(responseJson))
     //  this.hideLoading()
       if (responseJson.status == true) {


       this.setState({notificationslist : responseJson.list})

       }

    })
    .catch((error) => {
      console.error(error);
     //  this.hideLoading()
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

         <CustomBack headTitle={'Notification'}
         navigation={this.props.navigation}/>


    <KeyboardAwareScrollView style={{backgroundColor:'transparent'}}
    keyboardShouldPersistTaps='always'>
{this.state.notificationslist.length == 0 &&(
    <Text style={{fontSize:20, margin:10,alignSelf:'center', fontFamily: 'AvenirLTStd-Medium'}}>No new notifications!</Text>
  )}

  {this.state.notificationslist.length !=0 &&(
      <FlatList style= {{backgroundColor:'transparent',flexGrow:0, marginBottom:10}}
          data={this.state.notificationslist}
          numColumns={1}
          keyExtractor = { (item, index) => index.toString() }
          renderItem={this.renderRowItem}
          onEndReached={() => {
          //  this.loadMoreData()
          }
          }
          extraData={this.state}
        />

    )}
     </KeyboardAwareScrollView>
     </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'#FAFAFA'
  },
});

