import React, {Component} from 'react';
import { StyleSheet, Text, View,FlatList,TouchableNativeFeedback,Image,TouchableOpacity ,Alert,Container,Linking ,TextInput , Dimensions} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import CustomBack from './CustomBack'
import IndicatorCustom from './IndicatorCustom'

export default class ViewAllNews extends Component {
  static navigationOptions = {
          title: 'Video Detail',
          header: null
      };

  constructor(props){
    super(props)
    const { navigation } = this.props;
    this.state = {
       status :'' ,
       limit: 0,
       newslist:[],
    }
}

openVideo=(itemData)=>{
//  alert(JSON.stringify(itemData))
  GLOBAL.videoDetails = itemData.item
  this.props.navigation.navigate('ViewVideo')
}

    getAllNews=()=>{
        const url = GLOBAL.BASE_URL +  'news_list'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": GLOBAL.user_id,
                "limit_from": this.state.limit,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson))
                if (responseJson.status == true) {

                      var resu = this.state.newslist
                      this.setState({newslist : [...resu ,...responseJson.news_list]})              

                }
            })
            .catch((error) => {
                console.error(error);
              //   this.hideLoading()
            });      
    }

    handleLoadMore=()=>{
     this.setState({
          limit: this.state.limit + 10
        }, () => {
          this.getAllNews();
        });

    }





      renderRowItem = ({item, index}) => {
    //    alert(JSON.stringify(item))
    var helloMessage = false;
    if (item.is_bookmarked == "N"){
    helloMessage = true;
    }

        return (
          <TouchableOpacity onPress={()=> this.openVideo(item, index)}
          activeOpacity={0.8}>
          <View style={{ shadowColor: '#f7f7f7',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 0.5,flexDirection:'row',height: 'auto',
        shadowOpacity: 0.5,flex : 1, backgroundColor:'white',borderRadius:8,  width : wp(96) ,marginLeft : hp(1),marginRight:hp(1),marginTop:hp(1.5),marginBottom:1, elevation:0}}>

        <Image style={{width:125, height:125, borderColor: 'transparent', borderWidth: 1, borderRadius: 8}} source={{uri: item.image}}/>

        <View style={{flexDirection:'column', width:'65%', }}>
        <Text style = {{fontSize:12,fontFamily:'AvenirLTStd-Medium',color:'gray',marginLeft:10, marginTop:10,}}
        numberOfLines={1}>
            {item.published_date}
        </Text>

        <Text style = {{fontSize:17,fontFamily:'AvenirLTStd-Heavy',color:'black',marginLeft:10, marginTop:5, marginRight:7}}
        numberOfLines={2}>
            {item.title}
        </Text>

        <Text style = {{fontSize:14,fontFamily:'Avenir Roman',color:'gray',marginLeft:10, marginTop:5, marginRight:7}}
        numberOfLines={2}>
            {item.subhead}
        </Text>
    </View>


    </View>

    </TouchableOpacity>

        )
      }

    showLoading = () => {
      this.setState({ loading: true });
    };

    hideLoading = () => {
      this.setState({ loading: false });
    };


    addtoFav =()=>{
      console.log('jj')
    }

    componentDidMount(){
       this.getAllNews()
    }





  render() {
    if(this.state.loading){
      return(
        <IndicatorCustom/>
      )
    }
    return (

      <View style={styles.container}>    
         <CustomBack headTitle={'News'}
         navigation={this.props.navigation}/>

        {this.state.newslist.length == 0 &&(
            <Text style={{fontSize:20, margin:10,alignSelf:'center', fontFamily:'AvenirLTStd-Medium'}}>No news for today!</Text>
          )}

          {this.state.newslist.length !=0 &&(
              <FlatList style= {{flexGrow:0, marginBottom:10}}
                  data={this.state.newslist}
                  numColumns={1}
                  keyExtractor = { (item, index) => index.toString() }
                  renderItem={this.renderRowItem}
                  extraData={this.state}
                  onEndReached={this.handleLoadMore}
                  onEndReachedThreshold={0.01}
                />

            )}




     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
 loading: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center'
      },

});
