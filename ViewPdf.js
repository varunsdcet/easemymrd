import React, {Component} from 'react';
import {StyleSheet,ScrollView,PermissionsAndroid,ToastAndroid,Animated, Easing,Alert, Text, View,Image,TouchableOpacity,Container} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from 'react-native-button';
import Header from 'react-native-custom-headers';
const GLOBAL = require('./Global');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Pdf from 'react-native-pdf';
import * as Animatable from 'react-native-animatable';
import RNFetchBlob from 'rn-fetch-blob';
import IndicatorCustom from './IndicatorCustom'
import CustomBack from './CustomBack'

export default class ViewPdf extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
           header: () => null,
        }
    }

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            istoggle:false,
            data:'',
            totalpages:0,
            component:<></>,
            currentpages:0,
            getPdf:'http://samples.leanpub.com/thereactnativebook-sample.pdf',
            opacity: new Animated.Value(1)

        }
    }

    showLoading() {
        this.setState({loading: true})
    }

    hideLoading() {
        this.setState({loading: false})
    }


    getFreePdf= () =>{
        // this.showLoading()
        const url = GLOBAL.BASE_URL + "sample_pdf_for_free";

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mode:'pdffree'

        })
      })
        .then(response => response.json())
        .then(responseJson => {
           // this.hideLoading()
       
          console.log(JSON.stringify(responseJson))

          if (responseJson.status == true) {
            this.setState({getPdf: responseJson.sample_link})
          } else {
            alert('No PDF for now!')
          }
        })
        .catch(error => {
          console.error(error);
          // this.hideLoading()
        });


    }


    componentDidMount(){
//      this.getFreePdf()
      this.displayTime()
    }



    actualDownload=()=>{
            const { dirs } = RNFetchBlob.fs;
        //    alert(JSON.stringify(dirs))
          RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: `easeMyMed.pdf`,
            path: `${dirs.DownloadDir}/easeMyMed.pdf`,
            },
          })
            .fetch('GET', this.state.getPdf, {})
            .then((res) => {
            ToastAndroid.show('The file saved to '+ res.path(), ToastAndroid.SHORT)
              console.log('The file saved to ', res.path());
            })
            .catch((e) => {
              console.log(e)
            });
    }

   async downloadFile(){
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.actualDownload();
      } else {
        Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
      }
    } catch (err) {
      console.warn(err);
    } 

// Animated.loop(
//       Animated.sequence([
//         Animated.timing(this.state.opacity, {
//           toValue: 0,
//           duration: 1000,
//           ease: Easing.linear,
//           useNativeDriver: true
//         }),
//         Animated.timing(this.state.opacity, {
//           toValue: 1,
//           duration: 1000,
//           ease: Easing.linear,
//           useNativeDriver: true
//         })
//       ])
//     ).start();
    }


    displayTime(){
    this.timeoutHandle = setTimeout(()=>{
              // Add your logic for the transition
              var renderComp = this.renderPagesCount
              this.setState({ component: renderComp },()=>{

              })
         }, 500);
    }

    get renderPagesCount(){
      return(
        <Animatable.View style={{backgroundColor:'grey', borderRadius:5, padding:8, position:'absolute', right:5, top:73}}
        animation={'bounceIn'}
        duration={2500}>
          <Text style={{color:'white', fontFamily:'Nunito-SemiBold'}}>{this.state.currentpages} / {this.state.totalpages}</Text>
        </Animatable.View>
        )
    }

    render() {
        if(this.state.loading){
            return(
                <IndicatorCustom/>
            )
        }

        // console.log('render')
      const source = {uri: this.state.getPdf,cache:true};

        return (

        <View style={{flex:1, flexDirection:'column'}}>

         <CustomBack headTitle={'Prescription'}
         navigation={this.props.navigation}/>


                 <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                        this.displayTime()
                        this.setState({
                          currentpages: page,
                          totalpages: numberOfPages
                        })
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={{width:'100%', height:'80%', borderRadius:0,}}/>

         {this.state.component}

          <TouchableOpacity style={{width:wp('90%'),borderRadius:5, position:'absolute',bottom:hp(2),
           backgroundColor:'#1976D2',height:hp('6.5%'),alignSelf:'center',}}
           onPress={()=> this.downloadFile()}>
          <View style={{width:'100%', height:hp('6.5%'), justifyContent:'center',alignItems:'center'}}>
          <Text style = {{color:'white',fontSize: 18,fontFamily:'AvenirLTStd-Heavy',
          alignSelf:'center'}}>
          Download
          </Text>
          </View>
          
          </TouchableOpacity>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
});

