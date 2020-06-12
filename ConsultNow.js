import React, {Component} from 'react';
import { StyleSheet,TextInput,Text, View,FlatList,Image, Modal, Dimensions ,TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment';
import CustomBack from './CustomBack'
import CheckBox from 'react-native-check-box'

export default class ConsultNow extends Component {
   static navigationOptions = ({ navigation }) => {
    return {
       header: () => null,
    }
}

 constructor(props) {
    super(props)
    this.state = {
      elevations:0,
      name:'',
      modalVisible:false,
      isChecked:false,
      speciality:[],
      avatarSource:'',
      moviesList:[],
      status :'',
      img_url:'',
      membersList:[]
      }
  }

   setModalVisible=(visible)=> {
        this.setState({modalVisible: visible});
    }


  componentDidMount(){
    console.log(this.props.navigation)
    this.getMembers()
   this.getSymptoms()
   this.getSpeciality()
   this.props.navigation.addListener('focus',this._handleStateChange);
  }

    _handleStateChange = (state) => {
      this.getProfile()
      this.setModalVisible(true)
      this.getMembers()
     this.getSymptoms()
     this.getSpeciality()
    }


           getProfile(){
            const url = GLOBAL.BASE_URL + "get_profile";
          //  this.showLoading()
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              user_id: GLOBAL.user_id,

            })
          })
            .then(response => response.json())
            .then(responseJson => {
              //       this.hideLoading()
            //Color in logs
            console.log("\x1b[36m%s\x1b[0m" ,"Background Color Is Blue");

            console.log("\x1b[36m",JSON.stringify(responseJson))
              if (responseJson.status == true) {

                this.setState({avatarSource : responseJson.user_details.image,

                })





              } else {
                alert('Something went wrong!')
              }
            })
            .catch(error => {
              console.error(error);
            });

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
                "limit_from": 0,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson))

                if (responseJson.status == true) {
                    this.setState({speciality:responseJson.specialty_list,
                    })

                }
            })
            .catch((error) => {
                console.error(error);
              //   this.hideLoading()
            });
    }

    getSymptoms=()=>{
        const url = GLOBAL.BASE_URL +  'symptoms_list'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": GLOBAL.user_id,
                "limit_from": 0,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson))

                if (responseJson.status == true) {
                    this.setState({moviesList:responseJson.symp_list,
                    })

                }
            })
            .catch((error) => {
                console.error(error);
              //   this.hideLoading()
            });
    }


    getMembers=()=>{
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
                    this.setState({membersList:responseJson.member_list,
                      img_url: responseJson.image_path
                    })

                }
            })
            .catch((error) => {
                console.error(error);
              //   this.hideLoading()
            });
    }

  addMoreAddress=()=>{
      this.setModalVisible(false)
      this.props.navigation.navigate('AddMember')
  }

  handlePress=()=>{
    this.setModalVisible(false)
  }

  selectMember=(item, index)=>{
       var a = this.state.membersList
        for (var i = 0; i<this.state.membersList.length ;i ++){

            this.state.membersList[i].is_selected = ''
        }
        var index = a[index]
        if (index.is_selected == ''){
            index.is_selected = 'Y'
            this.setState({sel_memberId : item.id})

        }else{
            index.is_selected = ''
        }
        this.state.membersList[index] = index
        this.setState({membersList : this.state.membersList,
          sel_memberItem: item})


  }

  renderMembers=({item, index})=>{

     if (item.plusImage) {
          return (
            <>
            <TouchableOpacity onPress={()=> this.addMoreAddress()}>
            <View style={{width:wp(80),  flex:1, height:hp(8),
              backgroundColor:'white', flexDirection:'row', alignItems:'flex-start'            }}>
              <Image style={{height: 50, width:50 , resizeMode:'contain', backgroundColor:'white',alignSelf:'center' ,}}
                source={require("./resources/add_more.png")} />
                    <Text style = {{fontSize:16,fontFamily:'AvenirLTStd-Medium',color:'black',alignSelf:'center',marginLeft:wp(4),}}>
                    Add Member
                    </Text>
            </View>
            </TouchableOpacity>

      <View style={{width: wp(70), flexDirection: 'row', alignItems: 'center' , marginTop: 15}}>

        <CheckBox
            style={{padding: 10, marginTop:-20,}}
            onClick={()=>{
                 this.setState({
                     isChecked:!this.state.isChecked
                 })
               }}
            isChecked={this.state.isChecked}
            checkedImage={<Image source={require('./resources/ic_tick.png')} style={{width:22, height:22, resizeMode:'contain'}}/>}
            unCheckedImage={<Image source={require('./resources/ic_untick.png')} style={{width:22, height:22, resizeMode:'contain'}}/>}
        />

       <Text style={{fontSize: 11, color:'#757575', fontFamily: 'Avenir Roman',width:'89%', backgroundColor:'transparent'}}>
       I hereby declare that I am lawfully authorised to provide the above information on behalf of the owner
        of the information.
        </Text>
      </View>

          <TouchableOpacity style={{width:wp('40%'),borderRadius:5, marginTop:hp('3.5%'),marginBottom:hp(3),
           backgroundColor:'#1976D2',height:hp('5%'),alignSelf:'center', marginRight:wp('2%')}}
           onPress={this.handlePress}>
          <View style={{width:'100%', height:hp('5%'), justifyContent:'center',alignItems:'center'}}>
          <Text style = {{color:'white',fontSize: 18,fontFamily:'AvenirLTStd-Heavy',
          alignSelf:'center'}}>
          Next
          </Text>
          </View>

          </TouchableOpacity>

            </>
          );
        }
        var img_path= this.state.img_url + item.image

    return(
      <TouchableOpacity onPress={()=> this.selectMember(item, index)}>
      <View style={{width:wp(70), height:hp(8),flexDirection:'row',marginTop:hp(2), }}>
      <Image style={{width:60, height:60, borderRadius:30,}} source={{uri: img_path}}/>
      <Text style={{fontFamily:'AvenirLTStd-Medium', marginLeft:wp(4), fontSize:17, alignSelf:'center'}}>{item.member_name}</Text>
      {item.is_selected== 'Y' && (
      <Image style={{width:25, height:25, resizeMode:'contain', alignSelf:'center', position:'absolute', right:10}} source={require('./resources/check.png')}/>
      )}
      </View>
       <View style={{width:wp(70), height:0.5,backgroundColor:'#D8D8D8', marginTop:hp(2), marginBottom:hp(1) }}/>
       </TouchableOpacity>
      )
  }

 capitalizeFirstLetter=(string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  _renderSpeciality=({item, index})=>{
    var spName = this.capitalizeFirstLetter(item.name.toLowerCase())
    return(
      <TouchableOpacity style={{width:'93%', margin:10,marginRight:5,marginTop:10,marginBottom:10, height:hp('10%')}}
      onPress={() => this.selectedSpeciality(item , index)}
      activeOpacity={0.99}>
          <View   style  = {{width:'100%', height:'100%',backgroundColor:'white',shadowColor: "#000",
              shadowOffset: {
                  width: 0,
                  height: 2,
              },
              shadowOpacity: 0.25,borderRadius:15,
              shadowRadius: 3.84,elevation:4, flexDirection:'row',alignItems:'center',
          }}
          >

        <Image source={{uri : item.image}}
               style  = {{width:30, height:30,resizeMode:'contain', marginLeft:wp(4)}}/>
        <Text style = {{fontSize:14,width:'48%',marginTop:0,fontFamily:'AvenirLTStd-Heavy',color:'#293440',marginLeft:10}}
        numberOfLines={4}>
            {spName}
        </Text>
        {item.is_selected == '' && (
        <View/>
        )}
        {item.is_selected=='Y' && (
        <Image style={{width:25, height:25, resizeMode:'contain', alignSelf:'center', position:'absolute', right:10}} source={require('./resources/check.png')}/>
        )}

          </View>
      </TouchableOpacity>
    )
  }

selectedSpeciality=(item, index)=>{
 let { speciality } = this.state;
   let targetPost = speciality[index];

   if (targetPost.is_selected == ""){
     targetPost.is_selected = "Y";
   }else{
     targetPost.is_selected = "";
   }

    speciality[index] = targetPost;

   this.setState({ speciality: speciality})

    }


selectedProduct=(item, index)=>{
 let { moviesList } = this.state;
   let targetPost = moviesList[index];

   if (targetPost.is_selected == ""){
     targetPost.is_selected = "Y";
   }else{
     targetPost.is_selected = "";
   }
   // Flip the 'liked' property of the targetPost


    moviesList[index] = targetPost;

   // Then update targetPost in 'posts'
   // You probably don't need the following line.
   // posts[index] = targetPost;

   // Then reset the 'state.posts' property

   this.setState({ moviesList: moviesList})

    }

    _renderItemproducts = ({item, index}) => {
        return (
      <TouchableOpacity style={{width:'93%', margin:10,marginRight:5,marginTop:10,marginBottom:10, height:hp('10%')}}
      onPress={() => this.selectedProduct(item , index)}
      activeOpacity={0.99}>
          <View   style  = {{width:'100%', height:'100%',backgroundColor:'white',shadowColor: "#000",
              shadowOffset: {
                  width: 0,
                  height: 2,
              },
              shadowOpacity: 0.25,borderRadius:15,
              shadowRadius: 3.84,elevation:4, flexDirection:'row',alignItems:'center',
          }}
          >

        <Image source={{uri : item.image}}
               style  = {{width:30, height:30,resizeMode:'contain', marginLeft:wp(4)}}/>
        <Text style = {{fontSize:14,width:'48%',marginTop:0,fontFamily:'AvenirLTStd-Heavy',color:'#293440',marginLeft:10}}
        numberOfLines={3}>
            {item.name}
        </Text>
        {item.is_selected == '' && (
        <View/>
        )}
        {item.is_selected=='Y' && (
        <Image style={{width:25, height:25, resizeMode:'contain', alignSelf:'center', position:'absolute', right:10}} source={require('./resources/check.png')}/>
        )}

          </View>
      </TouchableOpacity>
        )
    }

    clickNext=()=>{
      this.props.navigation.navigate('ChooseDoctor')
    }

  render() {
    return (
      <View style={styles.container}>



         <View style={{flexDirection:'column',flex:1, alignItems:'center',}}>

         <CustomBack headTitle={'Back'}
         navigation={this.props.navigation}/>
  <KeyboardAwareScrollView  keyboardShouldPersistTaps='handled'>
         <View style={{width:wp('100%'), marginTop:hp('2%'),}}>


          <Text style = {{width:wp('91%'),color:'#262626',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',textAlign:'left', lineHeight:35,marginTop:hp(0), marginLeft:wp(5)}}>
          Search Health Problem/ Symptoms/ Doctor</Text>

          <View style={{flexDirection:'row',borderRadius:10, alignSelf:'center',width:wp(90),backgroundColor:'#F0F0F0',padding:5, marginTop:hp(1.5) }}>
          <Image style={{width:20, height:20, resizeMode:'contain', alignSelf:'center', marginLeft:10}}
          source={require('./resources/ic_search.png')}/>
          <TextInput style={{fontFamily:'AvenirLTStd-Heavy', paddingLeft:15, width:'90%', backgroundColor:'transparent'}}
          placeholder={'Eg. Cold, fever, cough'}
          />
          </View>

          <View style={{width:wp(20), height:hp(5), backgroundColor:'#FDA0B4', borderRadius:5,
           flexDirection:'row', justifyContent:'center',marginLeft:wp(5), marginTop:hp(2.3)}}>
          <Text style = {{color:'white',fontSize: 14,fontFamily:'AvenirLTStd-Heavy',alignSelf:'center'}}>
          Fever</Text>
          <Image style={{width:10, height:10, resizeMode:'contain', alignSelf:'center', marginLeft:10}}
          source={require('./resources/cross.png')}/>
          </View>

          <View style={{width:'100%', flexDirection:'row',marginTop:hp(4.5)}}>

          <View style={{flexDirection:'column', width:'49%'}}>
          <Text style = {{color:'#1E1F20',fontSize: 15,fontFamily:'AvenirLTStd-Heavy',textAlign:'left', marginLeft:wp(5)}}>
          Speciality</Text>
          <Text style = {{color:'#8b8c8c',fontSize: 12,fontFamily:'AvenirLTStd-Medium',textAlign:'left',marginLeft:wp(5)}}>
          Select from Specialities</Text>

            <FlatList style={{flexGrow:0,marginTop:10,height:window.height - 760}}
                      data={this.state.speciality}
                      ref={ref => { this.flatList_Ref = ref;}}
                      keyExtractor = { (item, index) => index.toString() }
                      renderItem={this._renderSpeciality}
                      extraData={this.state}
            />


          </View>


          <View style={{flexDirection:'column', width:'49%'}}>
          <Text style = {{color:'#1E1F20',fontSize: 15,fontFamily:'AvenirLTStd-Heavy',textAlign:'left', marginLeft:wp(5)}}>
          Symptoms</Text>
          <Text style = {{color:'#8b8c8c',fontSize: 12,fontFamily:'AvenirLTStd-Medium',textAlign:'left',marginLeft:wp(5)}}>
          Select from Symptoms</Text>
          <FlatList style= {{flexGrow:0,marginTop:hp('1%'),}}
                    data={this.state.moviesList}
                    numColumns={1}
                    keyExtractor = { (item, index) => index.toString() }
                    renderItem={this._renderItemproducts}
          />

          </View>

          </View>



         </View>
            </KeyboardAwareScrollView>
            <TouchableOpacity style={{width:wp('90%'),borderRadius:5, marginVertical:hp('2%'),
             backgroundColor:'#1976D2',height:hp('7%'),alignSelf:'center',}}
             onPress={()=> this.clickNext()}>
            <View style={{width:'100%', height:hp('7%'), justifyContent:'center',alignItems:'center'}}>
            <Text style = {{color:'white',fontSize: 18,fontFamily:'AvenirLTStd-Heavy',
            alignSelf:'center'}}>
            Next
            </Text>
            </View>

            </TouchableOpacity>
         </View>


        <Modal
           animationType="slide"
           transparent={true}
           visible={this.state.modalVisible}
           onRequestClose={() => {
//             Alert.alert('Modal has been closed.');
             this.setModalVisible(!this.state.modalVisible)
           }}>
               <TouchableOpacity style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  alignItems: 'center', borderRadius:0}}
                  activeOpacity={1}
                  onPressOut={() => {this.setModalVisible(true)}}
                  >
                  <View style={{width: wp(89),backgroundColor: 'white',marginBottom:12, borderRadius:18}}>
                    <View style={{width: '100%',  backgroundColor:'white', borderRadius:18}}>
                    <View style={{flexDirection:'row', width:'100%', backgroundColor:'white', height:60,
                     borderTopLeftRadius:18, borderTopRightRadius:18, borderTopLeftWidth:1,justifyContent:'center',alignItems:'center',
                     borderTopRightWidth:1, borderTopRightColor:'transparent', borderTopLeftColor:'transparent'}}>
                    <Text style={{fontSize: 18, color:'#1E1F20', fontFamily: 'AvenirLTStd-Heavy',marginTop:hp(2), alignSelf:'center', textAlign:'center'}}>Who is the Patient?</Text>
                     </View>


                     <View style  = {{height:70,flexDirection:'row',justifyContent:'space-between'}}>

                     <View style = {{flexDirection:'row'}}>
                     <Image style={{width:50, height:50, borderRadius:25,marginTop:9,marginLeft:18}} source={{uri: this.state.avatarSource}}/>
                     <Text style={{fontFamily:'AvenirLTStd-Medium', marginLeft:wp(4), fontSize:17, alignSelf:'center'}}>Myself</Text>


                     </View>

                     <Image style={{width:25, height:25, resizeMode:'contain', alignSelf:'center', position:'absolute', right:30}} source={require('./resources/check.png')}/>




                     </View>

                     <View style = {{width:'100%',height:1,backgroundColor:'#f1f1f1',marginBottom:15}}>

                     </View>

          <FlatList style= {{flexGrow:0,marginBottom:10, alignSelf:'center'}}
                    data={[...this.state.membersList, {plusImage : true}]}
                    numColumns={1}
                    extraData={this.state}
                    keyExtractor = { (item, index) => index.toString() }
                    renderItem={this.renderMembers}/>

                      </View>
                  </View>
              </TouchableOpacity>
         </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fafafa'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

});
