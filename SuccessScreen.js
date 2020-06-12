import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    Alert,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
const window = Dimensions.get('window');
import { CommonActions } from '@react-navigation/native';

export default class SuccessScreen extends Component {
    state = {

    };

  static navigationOptions = ({navigation}) => {
    return {
      header: () => null,
    };
  };



    componentDidMount(){
        this.timeoutCheck = setTimeout(() => {
        this._handlePress()
   }, 1100);

    }
    _handlePress() {

        this.props
            .navigation
            .dispatch(CommonActions.reset({
                index: 0,
                routes: [
                        {name: 'Tab',
                        params: { someParams: 'parameters goes here...' },
                      },
                ],
            }))
//     this.props
//             .navigation
//             .dispatch(StackActions.reset({
//                 index: 0,
//                 actions: [
//                     NavigationActions.navigate({
//                         routeName: 'Tab',
//                         params: { someParams: 'parameters goes here...' },
//                     }),
//                 ],


//             }))        
// //        this.props.navigation.replace('DrawerNavigator')
    }


    render() {  
        
        return (

                <View style={styles.container}>
                    <ImageBackground style = {{width :'100%' ,height: '100%',}}
                           source={require('./resources/success_bg.png')}>

                    <Image style={{width:100, height:100, resizeMode:'contain', alignSelf:'center',marginTop:'60%'}}
                    source={require('./resources/green_tick.png')}
                    />
                    <Text style={{marginTop:15,fontSize : 40,color :'white',fontFamily:'AvenirLTStd-Medium',alignSelf:'center'}}>
                    Success!
                    </Text>

                    <Text style={{marginTop:15,width:'70%',fontSize : 20,color :'white',fontFamily:'Avenir Roman',alignSelf:'center', textAlign:'center'}}>
                    Thanks you for choosing our service and trust our doctor’s to take care your health
                    </Text>

                    </ImageBackground>
                </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor :'#f1f1f1',
        height: window.height,
        flexDirection:'column',
    },
})