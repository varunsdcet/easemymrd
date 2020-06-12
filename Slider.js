import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
const GLOBAL = require('./Global');
import Button from 'react-native-button';
import Swiper from 'react-native-swiper';
import PageControl from 'react-native-page-control';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

var array = [
  'Get consultation from the top doctors.',
  'Access to the best health services from anywhere',
  'Keep your medical records handy',
  'Choose top doctors from all major specialties.'
];
var arrays = [
  'easeMymed',
  'easeMymed',
  'easeMymed',
  'easeMymed'
];
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const window = Dimensions.get('window');
type Props = {};
export default class Slider extends Component<Props> {
  state = {
    value: '',
    index: '',
    values: '',
  };
  static navigationOptions = ({navigation}) => {
    return {
      swipeEnabled: false,
      gesturesEnabled: false,
      header: () => null,
    };
  };

  buttonClickListener = () => {
    GLOBAL.user_id='0'
    this.props.navigation.replace('DrawerNavigator');
  };

  renders = index => {
    this.setState({value: array[index],
        values: arrays[index],
        index: index
    });
  };

  _handlePress = () => {
    this.props.navigation.replace('Login');
  };

  buttonClickListenersLogin=()=>{

    this.props.navigation.navigate('Login');

  }

  buttonClickListenersSignup=()=>{

    this.props.navigation.navigate('Signup');

  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'white',
        }}>
       <StatusBar backgroundColor={'black'}/>

        <View style={{width: window.width, height: window.height}}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              width: '100%',
              height: window.height,
            }}>
            <SwiperFlatList


              index={0}
              showPagination={false}
              onChangeIndex={index => this.renders(index.index)}>
              <View style={[styles.child, {backgroundColor: 'transparent'}]}>
                <Image style={styles.text} source={require('./resources/slideOne.png')} />
              </View>
              <View style={[styles.child, {backgroundColor: 'transparent'}]}>
                <Image style={styles.text} source={require('./resources/slideTwo.png')} />
              </View>
              <View style={[styles.child, {backgroundColor: 'transparent'}]}>
                <Image style={styles.text} source={require('./resources/slideThree.png')} />
              </View>
              <View style={[styles.child, {backgroundColor: 'transparent'}]}>
                <Image style={styles.text} source={require('./resources/slideFour.png')} />
              </View>
            </SwiperFlatList>
          </View>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: '14%',
            height: 200,
            width: '100%',
            backgroundColor: 'white',
            borderRadius: 20,
          }}>

          <Text
            style={{
              color: '#1976d2',
              fontFamily: 'AvenirLTStd-Heavy',
              fontSize: 28,
              alignSelf: 'center',
            }}>
            {this.state.values}
          </Text>

          <Text
            style={{
              color: 'grey',
              width:'80%',
              alignSelf:'center',
              lineHeight:25,
              fontFamily: 'AvenirLTStd-Medium',
              fontSize: 19,
              marginTop: 15,
              textAlign: 'center',
            }}>
            {this.state.value}
          </Text>


            <PageControl
              style={{width: 100, marginVertical:50, alignSelf:'center'}}
              numberOfPages={4}
              currentPage={this.state.index}
              hidesForSinglePage
              pageIndicatorTintColor="#E1E4E8"
              currentPageIndicatorTintColor="#1976d2"
              indicatorStyle={{borderRadius: 5.5, marginLeft: -0.5}}
              currentIndicatorStyle={{borderRadius: 5.5, marginLeft: -0.5}}
              indicatorSize={{width: 11, height: 11}}
              onPageIndicatorPress={this.onItemTap}
            />


        </View>
          <Button
          containerStyle={{width:wp('80%'),padding:15, height:hp(7), borderRadius:5,position:'absolute',
           backgroundColor: '#1976d2', elevation: 5, alignSelf:'center', bottom:hp(4) }}
          style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'AvenirLTStd-Heavy'}}
          onPress={this.buttonClickListenersLogin}
          >
          Get Started
          </Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {},
  child: {
    height: window.height,
    width: window.width,
    alignSelf:'center',
  },
  text: {
    resizeMode: 'contain',
    height: 250,
    width: 250,
    alignSelf:'center',
    marginTop: '20%',
  },
});
