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
    ScrollView,
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import CustomBack from './CustomBack'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom'

export default class ViewAllHospitals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hospitals:[],
            limit:0,
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

    }

    componentDidMount(){
        this.getHospitals()
        // this.props.navigation.addListener('focus',this._handleStateChange);
    }

    getHospitals=()=>{
        const url = GLOBAL.BASE_URL +  'hospital_list'
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
                      var resu = this.state.hospitals
                      this.setState({hospitals : [...resu ,...responseJson.hospital_list]})              

                }
            })
            .catch((error) => {
                console.error(error);
              //   this.hideLoading()
            });      
    }

    handleLoadMore=()=>{
     this.setState({
          limit: this.state.limit + 30
        }, () => {
          this.getHospitals();
        });

    }


    onSelect=(item, index)=>{

    }



  _renderItemHospitalImageList=({item, index})=>{
    return(
            <TouchableOpacity style={{width:wp('28.5%'), margin:15,marginLeft:10,marginRight:5,marginTop:10,marginBottom:10, height:hp('15%')}}
            onPress={() => this.openHospital(item, index)}
            activeOpacity={0.99}>
                <View   style  = {{width:'100%', height:'100%',backgroundColor:'white',shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,borderRadius:18,
                    shadowRadius: 3.84,elevation:4, flexDirection:'column',alignItems:'center', justifyContent:'center'
                }}
                >
              <Image source={{uri: item.image}}
                     style  = {{width:'80%', height:'80%',alignSelf:'center',resizeMode:'contain'}}/>
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
         <CustomBack headTitle={'Hospitals'}
         navigation={this.props.navigation}/>

        <ScrollView style={{width:wp('100%'), backgroundColor:'transparent',flexDirection:'column',
        alignSelf:'center'}}>

        <View style={{width:'100%', height:hp(4), backgroundColor:'#f5f5f5', paddingLeft:15, padding:15}}>
          <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20'}}>Showing Top Hospitals</Text>
        </View>

                    <FlatList style={{flexGrow:0,marginTop:10, marginLeft:5, marginRight:5, marginBottom:hp(1.5)}}
                              data={this.state.hospitals}
                              nestedScrollEnabled={false}
                              horizontal={false}
                              numColumns={3}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItemHospitalImageList}
                              extraData={this.state}
                              onEndReached={this.handleLoadMore}
                              onEndReachedThreshold={0.01}

                    />
        
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
