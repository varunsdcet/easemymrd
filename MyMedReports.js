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
    UIManager, findNodeHandle,
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import CustomBack from './CustomBack'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider
} from 'react-native-popup-menu';

export default class MyMedReports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: true,
            reports:[
            {
                name:'Consulted Dr. Nitish Virmani for Ear, Nose, Throat',
                desc: 'Record for Rahul Kumar',
                number: '1 Prescription',
                is_sel: false,
                date:' 18 \nMay'
            },
            {
                name:'Consulted Dr. Nitish Virmani for Ear, Nose, Throat',
                desc: 'Record for Rahul Kumar',
                number: '1 Prescription',
                is_sel: false,
                date:' 18 \nMay'
            },
            {
                name:'Consulted Dr. Nitish Virmani for Ear, Nose, Throat',
                desc: 'Record for Rahul Kumar',
                number: '1 Prescription',
                is_sel: false,
                date:' 18 \nMay'
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

    }

    onPress = () => {

      UIManager.showPopupMenu(
        findNodeHandle(),
        ['Edit', 'Remove'],
      )

    }    

    _renderItems=({item, index})=>{

        return(
    <TouchableOpacity style={{width:wp('93%'), height:hp(15.5), margin:15,marginLeft:10,marginRight:5,
    marginTop:10,marginBottom:10,backgroundColor:'white',borderRadius:15}}
    activeOpacity={0.99}
    onPress={()=> this.onSelect(item, index)}>
      <View style  = {{width:'100%',height:'100%', backgroundColor:'white',shadowColor: "#000",
          elevation:4, flexDirection:'row',borderRadius:15, 
      }}>
    <View style={{width:'18%',backgroundColor:'#1976D2', height:hp(13), borderRadius:10,margin:10, justifyContent:'center'}}>
    <Text style = {{fontSize:20,fontFamily:'AvenirLTStd-Heavy',color:'white',alignSelf:'center'}}>
        {item.date}
    </Text>    
    </View>

    <View style={{flexDirection:'column', marginTop:hp(2), width:'70%'}}>
    <Text style = {{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'black',marginLeft:3, marginTop:0, marginRight:7}}>
        {item.name}
    </Text>
    <Text style = {{fontSize:13,fontFamily:'AvenirLTStd-Heavy',color:'#1976D2',marginLeft:3, marginTop:10, marginRight:7}}>
        {item.desc}
    </Text>
    <Text style = {{fontSize:13,fontFamily:'AvenirLTStd-Heavy',color:'gray',marginLeft:3, marginTop:10, marginRight:7}}>
        {item.number}
    </Text>
    </View>
 
    <TouchableOpacity style={{position:'absolute', right:10, top:15}}
    onPress={()=> this.openMenu(item, index)}>
    <Image style={{width:15, height:20, resizeMode:'contain'}}
    source={require('./resources/three_dots.png')}/>
    </TouchableOpacity>
{/* <MenuProvider
        style={{flexDirection: 'column', padding: 30}}>

        <Menu
          opened={this.state.opened}
          onBackdropPress={() => this.onBackdropPress()}
          onSelect={value => this.onOptionSelect(value)}>
          <MenuTrigger
            onPress={() => this.onTriggerPress()}
            text='Select option'/>
          <MenuOptions>
            <MenuOption value={1} text='One' />
            <MenuOption value={2}>
              <Text style={{color: 'red'}}>Two</Text>
            </MenuOption>
            <MenuOption value={3} disabled={true} text='Three' />
          </MenuOptions>
        </Menu>
      </MenuProvider>   
  */}
    </View>

    </TouchableOpacity>
        )
    }

onOptionSelect(value) {
    alert(`Selected number: ${value}`);
    this.setState({ opened: false });
  }

  onTriggerPress() {
    this.setState({ opened: true });
  }

  onBackdropPress() {
    this.setState({ opened: false });
  }

    render() {

        if(this.state.loading){
            return(
                <IndicatorCustom/>
            )
        }
        return (

      <View style={styles.container}>
         <CustomBack headTitle={'My Med Reports'}
         navigation={this.props.navigation}/>

        <View style={{width:wp('100%'), backgroundColor:'transparent',flexDirection:'column',
        alignSelf:'center'}}>

        <View style={{width:'100%', height:hp(4), backgroundColor:'#f5f5f5', paddingLeft:15, padding:15}}>
          <Text style={{fontSize:16,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20'}}>2020</Text>
        </View>
        

        <View style={{marginTop:hp(1),alignSelf:'center' }}>
        <FlatList style= {{flexGrow:0,}}
                  data={this.state.reports}
                  horizontal={false}
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
        Add a Report
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
