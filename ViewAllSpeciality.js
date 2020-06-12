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
    ImageBackground
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import CustomBack from './CustomBack'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom'

export default class ViewAllSpeciality extends Component {
    constructor(props) {
        super(props);
        this.state = {
            speciality:[],
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
        this.getSpeciality()
    }

    componentDidMount(){
        // this.getDoctors()
         this.props.navigation.addListener('focus',this._handleStateChange);
    }

    onSelect=(item, index)=>{

    }


    selectedFirst = (item, index) =>{
      // this.setModalVisible(true)
      this.props.navigation.navigate('ConsultNow')
    }
    getSpeciality=()=>{
        const url = GLOBAL.BASE_URL +  'specialty_list'
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
                      var resu = this.state.speciality
                      this.setState({speciality : [...resu ,...responseJson.specialty_list]})



                }
            })
            .catch((error) => {
                console.error(error);
              //   this.hideLoading()
            });
    }

  _renderSpeciality=({item, index})=>{
    return(
      <TouchableOpacity style={{width:wp('29%'), margin:10,marginRight:5,marginTop:10,marginBottom:10, height:hp('16%')}}
      onPress={() => this.selectedFirst(item, index)}
      activeOpacity={0.99}>
          <View   style  = {{width:'100%', height:'100%',backgroundColor:'white',shadowColor: "#000",
              shadowOffset: {
                  width: 0,
                  height: 2,
              },
              shadowOpacity: 0.25,borderRadius:18,padding:0,
              shadowRadius: 3.84,elevation:4, flexDirection:'column', justifyContent:'center'
          }}
          >

      <ImageBackground style={{width:'100%', height:'100%'}} source={require('./resources/sp_bg.png')}>
        <Image source={{uri : item.image}}
               style  = {{width:42, height:42,resizeMode:'contain', margin:10}}/>

              <Text style = {{fontSize:15,margin:10,fontFamily:'AvenirLTStd-Heavy',color:'#293440',textAlign:'left',}}
              numberOfLines={3}>
                  {item.name}
              </Text>

          </ImageBackground>
          </View>
      </TouchableOpacity>
    )
  }

    handleLoadMore=()=>{
     this.setState({
          limit: this.state.limit + 30
        }, () => {
          this.getSpeciality();
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
         <CustomBack headTitle={'Specialities'}
         navigation={this.props.navigation}/>

        <View style={{width:wp('100%'), backgroundColor:'transparent',flexDirection:'column',
        alignSelf:'center'}}>


                    <FlatList style={{flexGrow:0,marginTop:10, marginBottom:hp(9)}}
                              data={this.state.speciality}
                              nestedScrollEnabled={true}
                              numColumns={3}
                              ref={ref => { this.flatList_Ref = ref;}}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderSpeciality}
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
