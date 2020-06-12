import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    AsyncStorage,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native';


const GLOBAL = require('./Global');
const windowW= Dimensions.get('window').width
const windowH = Dimensions.get('window').height
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
type props={};
export default class Home extends Component<Props>{
    state = {
        location: '',

    };
    onPressFemale(){
        //   this.props.navigation.navigate('Duration')
    }

    render(){
        return(

            <View style={{ flex: 1 }}>
            <View style = {{height:70,backgroundColor:'#1976D2',flexDirection:'row',width:'100%'}}>
                <View>
                <TouchableOpacity onPress= {()=>this.props.navigation.goBack()}>
                <Image style={{width:20, height:20,marginTop:24,marginLeft:10, resizeMode:'contain'}}
                source={require('./resources/cross.png')}/>
                </TouchableOpacity>
                </View>


                <Text style = {{alignSelf:'center',textAlign:'center',color:'white',fontSize: 20,paddingRight:30,marginLeft:20}}>
                  Select Address
                </Text>


                <Text style = {{alignSelf:'center',textAlign:'center',color:'white',fontSize: 18,paddingRight: 10}}>

                </Text>

            </View>
                <GooglePlacesAutocomplete
                    placeholder="Search"
                    minLength={1} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={"search"}
                    listViewDisplayed="false"
                    fetchDetails={true}
                    renderDescription={row =>
                        row.description || row.formatted_address || row.name

                    }
                    onPress={(data, details = null) => {
                      GLOBAL.location = details.vicinity
                      this.props.navigation.goBack()

//alert(JSON.stringify(data.vicinity))

                      //
                      // const url = GLOBAL.BASE_URL + 'location_check'
                      //
                      //        fetch(url, {
                      //            method: 'POST',
                      //            headers: {
                      //                'x-api-key':'c3a3cf7c211b7c07b2495d8aef9761fc',
                      //                'Content-Type': 'application/json',
                      //
                      //            },
                      //            body: JSON.stringify({
                      //                longitude:  details.geometry.location.lng,
                      //                 latitude: details.geometry.location.lat,
                      //                  phone_no: this.state.mobile,
                      //                   device_id: '',
                      //                    device_type: Platform.OS,
                      //                       device_token: GLOBAL.firebaseToken,
                      //                          model_name: '',
                      //                          profile_pic :GLOBAL.profile
                      //
                      //
                      //
                      //            }),
                      //        }).then((response) => response.json())
                      //            .then((responseJson) => {
                      //
                      //
                      //                if (responseJson.status == true){
                      //
                      //                  GLOBAL.lat =  details.geometry.location.lat
                      //                  GLOBAL.long =  details.geometry.location.lng
                      //                  GLOBAL.currLoc =  data.description
                      //
                      //                  this.props.navigation.goBack()
                      //                }else{
                      //
                      //                    alert('We are not providing service in this area.Please choose other')
                      //                }
                      //
                      //            })
                      //            .catch((error) => {
                      //                console.error(error);
                      //            });






                    }}
                    getDefaultValue={() => {
                        return ""; // text input default value
                    }}
                    query={{
                        key: "AIzaSyBWX-QNm_gVzt6U2K6xeU4cmF5dkX8XUQ0",
                        language: "en", // language of the results
                        types: "(cities)" // default: 'geocode'
                    }}
                    styles={{
                        description: {
                            fontWeight: "bold"
                        },
                        predefinedPlacesDescription: {
                            color: "#1faadb"
                        }
                    }}
                    enablePoweredByContainer={true}
                    nearbyPlacesAPI="GoogleReverseGeocoding"
                    GooglePlacesSearchQuery={{
                        rankby: "distance",
                        types: ""
                    }}
                    filterReverseGeocodingByTypes={[
                        "locality",
                        "administrative_area_level_3"
                    ]}
                    debounce={200}
                />
            </View>
        );
    }
}
