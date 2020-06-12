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

export default class FindAndBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height:'',
            weight:'',
            categs:[
            {
                name:'Dentist',
                is_sel: 1,
            },
            {
                name:'Dental Surgeon',
                is_sel: 0,
            },
            {
                name:'Dental Doctor',
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
      this.props.navigation.navigate('ChooseDoctor')
    }

    _renderItems=({item, index})=>{

        return(
        <TouchableOpacity
        onPress={()=> this.onSelect(item, index)}>
        <View style={{width:'100%',backgroundColor:'white',marginTop:hp(0),flexDirection:'row', height:hp(7),
        alignItems:'center', justifyContent:'space-between',alignSelf:'center', flexDirection:'row',}}>

        <Text style={{fontSize:15,color:'black',marginLeft:wp(4),fontFamily:'AvenirLTStd-Medium', alignSelf:'center'}}>{item.name}</Text>

        <Text style={{fontSize:13,color:'#bfbfbf',marginRight:wp(4),fontFamily:'AvenirLTStd-Medium', alignSelf:'center'}}>SPECIALITY</Text>
        </View>
        <View
        style={{backgroundColor: '#F5F5F5',  width:'100%',height:1}}/>


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
         <CustomBack headTitle={'Find & Book'}
         navigation={this.props.navigation}/>

        <View style={{width:wp('100%'), backgroundColor:'transparent',flexDirection:'column',
        alignSelf:'center'}}>

          <View style={{flexDirection:'row',borderRadius:10,borderWidth:2, borderColor:'#F0F0F0', alignSelf:'center',width:wp(93),backgroundColor:'white',padding:3, marginTop:hp(2) }}>
          <Image style={{width:20, height:20, resizeMode:'contain', alignSelf:'center', marginLeft:10}}
          source={require('./resources/ic_search.png')}/>
          <TextInput style={{fontFamily:'Avenir Roman', fontSize:16,paddingLeft:15, width:'90%', backgroundColor:'transparent'}}
          placeholder={'Type to search...'}
          />
          </View>
        

        <View style={{marginTop:hp(2), }}>
        <FlatList style= {{flexGrow:0,}}
                  data={this.state.categs}
                  horizontal={false}
                  keyExtractor = { (item, index) => index.toString() }
                  renderItem={this._renderItems}
        />
        </View>

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
