import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    Modal,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import CustomBack from './CustomBack'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom'


export default class MemberList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            recognized: '',
            started: '',
            text :'',
            results: [],
            img_url:''
        };

    }

    componentWillUnmount() {

    }

    showLoading() {
        this.setState({loading: true})
    }


    hideLoading() {
        this.setState({loading: false})
    }

    _handleStateChange = (state) => {
        this.getMembers()
    }

    getMembers=()=>{
//        alert(GLOBAL.user_id)
        const url = GLOBAL.BASE_URL +  'list_member'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": GLOBAL.user_id,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson))

                if (responseJson.status == true) {
                    this.setState({results:responseJson.member_list,
                      img_url: responseJson.image_path
                    })

                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }
    _saveDetails = () => {
        this.props.navigation.navigate('AddMember')
    }

    


    componentDidMount(){
        this.getMembers()
         this.props.navigation.addListener('focus',this._handleStateChange);
        // this.props.navigation.setParams({ handleSave: this._saveDetails });


    }

    _handlePressContinue=()=>{
        if(GLOBAL.callType == '1'){
            GLOBAL.isBooking ='0'

           Linking.openURL('tel:1111111111')

        }else if(GLOBAL.callType=='2'){
            GLOBAL.isBooking ='0'

           this.props.navigation.navigate("VideoCall", {
                        channelName: '123',
                        onCancel: (message) => {
                            this.setState({
                                visible: true,
                                message
                            });
            }                            
        })


        }else if(GLOBAL.callType=='3'){
            GLOBAL.isBooking ='0'
           this.props.navigation.navigate('Chat')

        }else if(GLOBAL.callType=='4'){
            GLOBAL.isBooking ='0'

            this.props.navigation.navigate('AskQuery')
        }

    }

    _handlePress=()=> {
        console.log('Pressed!');
         this.props.navigation.navigate('AddMember')

        // if(this.state.atleast==0){
        //     alert('Please select atleast 1 member')
        // }else{
        //  this.props.navigation.navigate('AddMember')

        // }

    }

    login = (s,item) => {
        GLOBAL.appointmentArray = item
        GLOBAL.speciality = s

        this.props.navigation.navigate('BookingAppointmentDetail')
    }

    check = () => {
        this.setState({isSecure :!this.state.isSecure})
    }

    selectedFirst = (item, index, imgPath) => {
        if(GLOBAL.typelist==''){
          GLOBAL.mymember = item
          GLOBAL.showMemDetails = 1
          this.props.navigation.goBack()

        }else{
          GLOBAL.memDetails = item
          GLOBAL.imgPath = imgPath
          this.props.navigation.navigate('ShowMember')

        }
    }

    getIndex = (index) => {

        this.setState({email:this.state.data[index].id})
    }

    _confDelete=(item)=>{
      //  alert(JSON.stringify(item))
         const url = GLOBAL.BASE_URL +  'delete_member'

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id":GLOBAL.user_id,
                "member_id": item.id
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson))


                if (responseJson.status == true) {
                    this.setState({results:responseJson.member_list,
                    })

                }else{
                    this.setState({results:[]})
                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
            });

    }

    askDelete=(item)=>{
        Alert.alert('Remove Member!','Are you sure you want to remove this member?',
            [{text:"Cancel"},
                {text:"Confirm", onPress:()=>this._confDelete(item)
                },
            ],
            {cancelable:false}
        )

    }

    _renderItems = ({item,index}) => {
        var img_path= this.state.img_url + item.image

        return (

            <TouchableOpacity onPress={() => this.selectedFirst(item, index, img_path)
            } activeOpacity={0.99}>
                <View style={{ flex: 1 ,marginLeft : 10,width:window.width - 20,height:hp(15), borderRadius:8,backgroundColor: 'white',marginTop: 10,marginBottom:10,flexDirection:'row', alignItems:'center'}}>

                <Image style={{width:70, height:70,  marginLeft:10, borderRadius:35, borderColor:'white', borderWidth:2, marginTop:-10}}
                source={{uri: img_path}}/>

                <View style={{flexDirection:'column', width:'80%', margin:10}}>
                    <Text style={{marginLeft : 5,fontSize : 18,color :'#1976D2',fontFamily:'AvenirLTStd-Heavy',}}>
                        {item.member_name}
                    </Text>
                     <Text style={{marginLeft : 5,fontSize : 15,color :'black',fontFamily:'AvenirLTStd-Medium',}}>
                        {item.member_gender}
                    </Text>
                    <Text style={{marginLeft : 5,fontSize : 14,color :'black',fontFamily:'AvenirLTStd-Medium',}}>
                        D.O.B: {item.member_dob}
                    </Text>                   

                      <Text style={{marginLeft : 5,fontSize : 13,color :'#555755',fontFamily:'AvenirLTStd-Medium',}}>
                        Email: {item.email}
                    </Text>

                      <Text style={{marginLeft : 5,fontSize : 13,color :'#555755',fontFamily:'AvenirLTStd-Medium',}}>
                        Mobile: {item.mobile}
                    </Text>

                </View>                    
                </View>
                <TouchableOpacity style={{position:'absolute', right:10, top:17}}
                onPress={()=> this.askDelete(item)}>
                <Image style={{width:25, height:22 , resizeMode:'contain'}}
                source={require('./resources/three_dots.png')}/>
                </TouchableOpacity>
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
         <CustomBack headTitle={'Member List'}
         navigation={this.props.navigation}/>
                
                {this.state.results.length == 0 && (

            <Text style={{fontSize : 13,marginTop:15,color :'black',fontFamily:'AvenirLTStd-Medium',alignSelf:'center', textAlign:'center'}}>
            No Members added yet!{`\n`}Click `Add Member` button to add members
            </Text>

                )}

                {this.state.results.length!=0 &&(

                    <FlatList style= {{flexGrow:0,height:window.height - 160}}
                              data={this.state.results}
                              numColumns={1}
                              keyExtractor = { (item, index) => index.toString() }
                              renderItem={this._renderItems}
                    />

)}

                {GLOBAL.isBooking == '1' && (

                    <Button
                        style={{padding:5,marginTop:18,fontSize: 20, color: 'black',backgroundColor:'#7CC576',
                        width:'60%',alignSelf:'center',height:40,fontFamily:'AvenirLTStd-Heavy',borderRadius:4}}
                        styleDisabled={{color: 'red'}}
                        onPress={() => this._handlePressContinue()}>
                        CONTINUE
                    </Button>

                )}
                {GLOBAL.isBooking !='1' && (
                <Button
                containerStyle={{width:wp('90%'),padding:15, height:hp(7), overflow:'hidden', borderRadius:5,
                 backgroundColor: '#1976D2', alignSelf:'center', marginTop:hp(3), marginBottom:hp(2)}}
                style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'AvenirLTStd-Heavy'}}
                onPress={this._handlePress}
                >
                Add Member
                </Button>



                )}

                </View>

        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    container: {
        flex:1,
        backgroundColor :'#f5f5f5',
    },
 
})
