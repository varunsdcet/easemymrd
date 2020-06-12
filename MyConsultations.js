import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    Alert,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
const GLOBAL = require('./Global');
const window = Dimensions.get('window');
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment'
import IndicatorCustom from './IndicatorCustom'
import CustomBack from './CustomBack'
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';


export default class MyConsultations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recognized: '',
            index:0,
            routes: [
              { key: 'first', title: 'Ongoing' },
              { key: 'second', title: 'History' },
            ],
            getList:[
              {
                id: '1',
                name: 'Dr. Jordan Singleton',
                type: 'Physician',
                types: 'Active Consultation',
                time: '03:43',
                artwork: require('./resources/doc.png')
              },
              {
                id: '2',
                name: 'Dr. Jordan Singleton',
                type: 'Physician',
                types: 'Active Consultation',
                time: '03:43',
                artwork: require('./resources/doc.png')
              },
            ],
            getHistory:[
              {
                id: '1',
                name: 'Dr. Jordan Singleton',
                type: 'Physician',
                types: 'Completed',
                time: '16 May, 03:43',
                artwork: require('./resources/doc.png')
              },
              {
                id: '2',
                name: 'Dr. Jordan Singleton',
                type: 'Physician',
                types: 'Completed',
                time: '15 May, 12:03',
                artwork: require('./resources/doc.png')
              },
            ]
        };

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

    componentDidMount(){
        // this.getRelations()
    }


    getRelations(){
        const url = GLOBAL.BASE_URL + "master_relationship";
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
          console.log(JSON.stringify(responseJson));
//          this.hideLoading();
          if (responseJson.status == true) {


          }else {
            alert(
              "Something went wrong!"
            );
          }
        })
        .catch(error => {
  //        this.hideLoading();
          console.error(error);
        });    
    }


    _renderScene = ({ route }) => {
        switch (route.key) {
            case 'first': 
            return <FlatList style= {{flexGrow:0,marginVertical:hp(1.5), marginHorizontal:wp(1.5)}}
                      data={this.state.getList}
                      numColumns={1}
                      keyExtractor = { (item, index) => index.toString() }
                      renderItem={this._renderList}
                      extraData={this.state}
            />;
            break;

            case 'second': return <FlatList style= {{flexGrow:0,marginVertical:hp(1.5), marginHorizontal:wp(1.5)}}
                      data={this.state.getHistory}
                      numColumns={1}
                      keyExtractor = { (item, index) => index.toString() }
                      renderItem={this._renderHistoryList}
                      extraData={this.state}
            />;
            break;

            default:
                return null;
        }
    };

 renderTabBar(props) {
        return (<TabBar
                style={{backgroundColor: '#1976D2', elevation: 0, borderColor: 'transparent', height:50,}}
                labelStyle={{color: 'rgba(0,0,0,0.5)', fontSize: 13, fontFamily:'AvenirLTStd-Medium', textAlign:'left',}}

                {...props}

               renderLabel={({ route, focused, color }) => {
                var decide
                if(focused)
                  decide='white'
                else
                  decide= 'rgba(255,255,255,0.5)'
                return(
                  <Text style={{color: decide, fontSize: 15, fontFamily:'AvenirLTStd-Heavy', textAlign:'left',}}>
                    {route.title}
                  </Text>
                )}}
                scrollEnabled ={true}
                tabStyle={{width:wp(50)}}
                pressColor={'white'}
                indicatorStyle={{backgroundColor: 'white', height: 3, borderRadius:5}}
            />
        );
    }

    openDetails=(item, index)=>{
      this.props.navigation.navigate('ConsultationDetails')
    }


    _renderList=({item, index})=>{
      return(
        <TouchableOpacity
         activeOpacity={0.99}
         onPress={()=> this.openDetails(item,index)}>
          <View style = {{flexDirection:'row',width:wp('93%'),alignSelf:'center',height:hp('13%'),
          borderRadius:8 ,elevation: 3, backgroundColor:'white',
          marginVertical:hp(1.5)}}>

          <Image style={{width:60, height:60, borderRadius:30, margin:10}}
          source={item.artwork}/>

          <View style={{flexDirection:'column', margin:15, marginLeft:10, backgroundColor:'white', width:'62%'}}>
          <Text style = {{color:'#1976D2',fontSize: 17,fontFamily:'AvenirLTStd-Heavy', }}>
          {item.name}</Text>
          <Text style = {{color:'black',fontSize: 15,fontFamily:'AvenirLTStd-Heavy' }}>
          {item.type}</Text>
          <Text style = {{color:'#757575',fontSize: 15,fontFamily:'AvenirLTStd-Medium', marginTop:hp(2)}}>
          {item.types}</Text>
          </View>
          <Text style = {{color:'#757575',fontSize: 15,fontFamily:'AvenirLTStd-Medium', position:'absolute', right:12, top:14 }}>
          {item.time}</Text>
          </View>
          </TouchableOpacity>
        )
    }

    _renderHistoryList=({item, index})=>{
      return(
        <TouchableOpacity
        activeOpacity={0.99}
         onPress={()=> this.openDetails(item,index)}>
          <View style = {{flexDirection:'row',width:wp('93%'),alignSelf:'center',height:hp('13%'),
          borderRadius:8 ,elevation: 3, backgroundColor:'white',
          marginVertical:hp(1.5)}}>

          <Image style={{width:60, height:60, borderRadius:30, margin:10}}
          source={item.artwork}/>

          <View style={{flexDirection:'column', margin:15, marginLeft:10, backgroundColor:'white', width:'62%'}}>
          <Text style = {{color:'#1976D2',fontSize: 17,fontFamily:'AvenirLTStd-Heavy', }}>
          {item.name}</Text>
          <Text style = {{color:'black',fontSize: 15,fontFamily:'AvenirLTStd-Heavy' }}>
          {item.type}</Text>
          <Text style = {{color:'#757575',fontSize: 15,fontFamily:'AvenirLTStd-Medium', marginTop:hp(2)}}>
          {item.time}</Text>
          </View>
          <Text style = {{color:'#757575',fontSize: 15,fontFamily:'AvenirLTStd-Medium', position:'absolute', right:12, top:14 }}>
          #{item.id}</Text>
          <Text style = {{color:'#00911A',fontSize: 15,fontFamily:'AvenirLTStd-Medium', position:'absolute', right:12, bottom:14 }}>
          {item.types}</Text>
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

         <CustomBack headTitle={'Consultations'}
         navigation={this.props.navigation}/>

          <View style={{width:wp('100%'),backgroundColor:'#1976D2', flex:1}}>
                <TabView
                    navigationState={this.state}
                    indicatorStyle={{ backgroundColor: '#800000' }}
                    style={{ backgroundColor: 'white', flexGrow:1 }}
                    renderTabBar={this.renderTabBar}
                    renderScene={this._renderScene}
                    pressColor={'#1976D2'}
                    // onSwipeStart ={(index)=> this.setState({ index })}
                    // onSwipeEnd ={()=> this.hideLoading()}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                />


          </View>


        </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor :'#FAFAFA',
    },
})
