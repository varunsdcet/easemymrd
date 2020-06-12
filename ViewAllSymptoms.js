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

export default class ViewAllSymptoms extends Component {
    constructor(props) {
        super(props);
        this.state = {
          moviesList:[],
          limit:0
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
        this.getAllSymptoms()
        // this.props.navigation.addListener('focus',this._handleStateChange);

    }


    getAllSymptoms=()=>{
        const url = GLOBAL.BASE_URL +  'symptoms_list'
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
                  var resu = this.state.moviesList
                  this.setState({moviesList : [...resu ,...responseJson.symp_list]})


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
          this.getAllSymptoms();
        });

    }

    consult=(item, index)=>{
        this.props.navigation.navigate('Summary')
    }
    selectedFirst = (item, index) =>{
      // this.setModalVisible(true)
      this.props.navigation.navigate('ConsultNow')
    }
    _renderItemproducts = ({item, index}) => {
        return (
            <TouchableOpacity style={{width:window.width/3 -20, margin:10,marginTop:40,marginBottom:30, height:window.width/3 -20,elevation:4}}
            onPress={() => this.selectedFirst(item, index)}
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
              <Image source={{uri : item.image}}
                     style  = {{width:60, height:60,alignSelf:'center',resizeMode:'contain'}}/>
                </View>

              <Text style = {{fontSize:12,marginTop:10,fontFamily:'AvenirLTStd-Heavy',color:'#293440',textAlign:'justify',}}
              numberOfLines={3}>
                  {item.name}
              </Text>

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
         <CustomBack headTitle={'Symptoms'}
         navigation={this.props.navigation}/>

        <View style={{width:wp('100%'), backgroundColor:'transparent',flexDirection:'column',
        alignSelf:'center'}}>


                    <FlatList style= {{flexGrow:0,marginTop:hp('0%'),marginBottom:hp(10)}}
                              data={this.state.moviesList}
                              numColumns={3}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItemproducts}
                              extraData={this.state}
                              onEndReached={this.handleLoadMore}
                              onEndReachedThreshold={0.01}
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
