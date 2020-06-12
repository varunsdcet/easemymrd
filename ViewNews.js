import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Button from 'react-native-button';
const window = Dimensions.get('window');
const GLOBAL = require('./Global');
import CustomBack from './CustomBack'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IndicatorCustom from './IndicatorCustom'

export default class ViewNews extends Component {
    constructor(props) {
        super(props);
        var getId = this.props.route.params.news_id
        this.state = {
            newsId: getId,
            title:'',
            subhead:'',
            description:'',
            image:'',
            published_date:'',
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

    componentDidMount(){
        this.getNewsDesc()
    }


    getNewsDesc=()=>{
        this.showLoading()
        const url = GLOBAL.BASE_URL +  'news_description'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": GLOBAL.user_id,
                "news_id": this.state.newsId,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(JSON.stringify(responseJson))
                this.hideLoading()
                if (responseJson.status == true) {
                  this.setState({title : responseJson.title,
                    subhead: responseJson.subhead,
                    description: responseJson.description,
                    image: responseJson.image,
                    published_date: responseJson.published_date
                  })


                }
            })
            .catch((error) => {
                console.error(error);
                this.hideLoading()
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
        <View style={{width:wp('100%'), backgroundColor:'transparent',flexDirection:'column',
        alignSelf:'center'}}>

        <ScrollView>

        <Image style={{width:'100%', height:280, resizeMode:'cover'}}
        source={{uri : this.state.image}}/>
        <TouchableOpacity hitSlope={{left:50, right:50, top:50, bottom:50}}
        style={{position:'absolute', top:15, left:10}}
        onPress={()=> this.props.navigation.goBack()}>
        <Image style={{width:25, height:25, resizeMode:'contain'}}
        source={require('./resources/back-white.png')}/>
        </TouchableOpacity>

    <Text style = {{fontSize:12,fontFamily:'AvenirLTStd-Medium',color:'gray',margin:15,marginBottom:0}}
    numberOfLines={1}>
    {this.state.published_date}
    </Text>

        <Text style = {{fontSize:20,margin:15,fontFamily:'AvenirLTStd-Heavy',color:'#1E1F20',textAlign:'left',marginTop:5}}>
        {this.state.title}
        </Text>

        <Text style = {{fontSize:16,fontFamily:'Avenir Roman',color:'gray',margin:15,marginTop:-5,  lineHeight:25}}>
        {this.state.description}
        </Text>



        </ScrollView>


    
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
