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

export default class AddHealthProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height:'',
            weight:'',
            bloodGroups:[
            {
                name:'A+ve',
                is_sel: 1,
            },
            {
                name:'A-ve',
                is_sel: 0,
            },
            {
                name:'B+ve',
                is_sel: 0,
            },
            {
                name:'AB+ve',
                is_sel: 0,
            },
            {
                name:'O+ve',
                is_sel: 0,
            },
            ]
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
        // this.getMembers()
    }

    componentDidMount(){
        // this.getMembers()
         this.props.navigation.addListener('willFocus',this._handleStateChange);

    }

    onSelect=(item, index)=>{
       var a = this.state.bloodGroups
        for (var i = 0; i<this.state.bloodGroups.length ;i ++){

            this.state.bloodGroups[i].is_sel = 0
        }
        var index = a[index]
        if (index.is_sel == 0){
            index.is_sel = 1
            this.setState({address_id : item.id})

        }else{
            index.is_selected = 0
        }
        this.state.bloodGroups[index] = index
        this.setState({bloodGroups:this.state.bloodGroups,
          sel_bloodGroup: item})
    }

    _renderItems=({item, index})=>{

        return(
        <TouchableOpacity
        onPress={()=> this.onSelect(item, index)}>
        {item.is_sel != 1 &&(

          <View style = {{flexDirection:'row',width:wp('25%'),height:45, borderColor:'#F0F0F0',borderRadius:25,
           borderWidth:2, elevation: this.state.elevations, backgroundColor: 'white' ,justifyContent:'center',
            marginLeft:wp('3%')}}>

          <Text style = {{color:'gray',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',
          alignSelf:'center'  }}>
          {item.name}
          </Text>
          </View>

            )}

        {item.is_sel==1 && (

          <View style = {{flexDirection:'row',width:wp('25%'),height:45, borderColor:'#F0F0F0',borderRadius:25,
           borderWidth:2, elevation: this.state.elevations, backgroundColor: '#1976D2' ,justifyContent:'center',
            marginLeft:wp('3%')}}>

          <Text style = {{color:'white',fontSize: 16,fontFamily:'AvenirLTStd-Heavy',
          alignSelf:'center'  }}>
          {item.name}
          </Text>
          </View>

            )}

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
         <CustomBack headTitle={'Add Health Profile'}
         navigation={this.props.navigation}/>

        <View style={{width:wp('100%'), backgroundColor:'transparent',flexDirection:'column',
        alignSelf:'center'}}>

      <Text style = {{color:'black',fontSize: 17,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginTop:hp('3%'), marginLeft:wp('5%'), }}>
      Height (in cm)</Text>

      <View style = {{flexDirection:'row',marginTop:hp('1%'),width:wp('90%'),height:hp('7%'),
       borderColor:'#F0F0F0',borderRadius:5, borderWidth:2,  alignSelf:'center',backgroundColor:'white',}}>
          <TextInput style = {{width:wp('80%'),color:'#909090', height:hp('7%'), fontSize:18, fontFamily:'Avenir Roman', paddingLeft:wp(3)}}
                     placeholder = {'cm'}
                     keyboardType={'numeric'}
                     placeholderTextColor = "#909090"
                     onChangeText={(text) => this.setState({height:text})}
                     value={this.state.height}
          />
      </View>
        

      <Text style = {{color:'black',fontSize: 17,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginTop:hp('3%'), marginLeft:wp('5%'), }}>
      Weight (in kg)</Text>

      <View style = {{flexDirection:'row',marginTop:hp('1%'),width:wp('90%'),height:hp('7%'),
       borderColor:'#F0F0F0',borderRadius:5, borderWidth:2,  alignSelf:'center',backgroundColor:'white',}}>
          <TextInput style = {{width:wp('80%'),color:'#909090', height:hp('7%'), fontSize:18, fontFamily:'Avenir Roman', paddingLeft:wp(3)}}
                     placeholder = {'kg'}
                     keyboardType={'numeric'}
                     placeholderTextColor = "#909090"
                     onChangeText={(text) => this.setState({weight:text})}
                     value={this.state.weight}
          />
      </View>

      <Text style = {{color:'black',fontSize: 17,fontFamily:'AvenirLTStd-Heavy',textAlign:'left',marginTop:hp('3%'), marginLeft:wp('5%'), }}>
      Blood Group</Text>

        <View style={{marginTop:hp(2), marginLeft:wp(2)}}>
        <FlatList style= {{flexGrow:0,}}
                  data={this.state.bloodGroups}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor = { (item, index) => index.toString() }
                  renderItem={this._renderItems}
        />
        </View>

        </View>

        <Button
        containerStyle={{width:wp('90%'),padding:15, height:hp(7), overflow:'hidden', borderRadius:5,
         backgroundColor: '#1976D2', alignSelf:'center',position:'absolute', bottom:hp(3)}}
        style={{fontSize: 18, color: 'white', alignSelf: 'center', fontFamily:'AvenirLTStd-Heavy'}}
        onPress={this._handlePress}
        >
        Submit
        </Button>

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
