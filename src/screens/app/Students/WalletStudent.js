import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { Icon, H3, Form, Item, Button, Label, ListItem, Left, Body, Right, Thumbnail, Card, CardItem, Input} from 'native-base';
import Color from '../../../constants/colors';
import AppTemplate from "../appTemplate";
import _ from 'lodash'
import {setUser} from "../../../reducers";
import {connect} from "react-redux";

class WalletStudent extends Component {
    constructor(props){
        super(props);
        this.state = {
            random:['#d93232', '#636c8f', '#6c856c', '#fbaf5d'],  
            amount: ""          
        }
    }

    // componentDidMount(){
    //     this.setState({
    //         isLoading: true
    //     })
    //     return AsyncStorage.getItem('token').then(userToken => {
    //         return axios.get(Server.url + 'api/getusers?token='+userToken)
    //         .then(response => {
    //             this.setState({
    //                 isLoading: false,
    //                 showLectAndUser: response.data
    //             })
    //         }).catch(error => {
    //             Toast.show({
    //                 text: 'Error reachig server',
    //                 buttonText: "Ok",
    //                 type: "danger"
    //             })
    //         })
    //     })
    // alert(JSON.stringify(this.state.lecture))
    
    // }

    componentDidMount()
    {
        let amount = 0;
        for(let i in this.props.user.joint_lectures){
            amount = amount + parseInt(this.props.user.joint_lectures[i].pivot.amount);
            if(i ==  this.props.user.joint_lectures.length-1 ){
                this.setState({amount})                
            }
        }
    }
    
    render() {
        return (
            <AppTemplate navigation={this.props.navigation} title = "Wallet"> 

                <View style={styles.content}>

                    <Card style={{borderWidth: 0}} transparent={true}>
                        <CardItem style={{}}>
                            <Left>
                                <Text>Balance: </Text>
                            </Left>
                            <Right>
                                <Text>{this.state.amount}</Text>
                            </Right>
                        </CardItem>
                    </Card>
                </View> 

                <View style={styles.content}>

                <FlatList
                    ListEmptyComponent={
                        <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>Your wallet is empty start joining lectures</Text>
                    }
                    data={this.props.user.joint_lectures}
                    renderItem={({item}) => (

                    <TouchableOpacity style={styles.Box1}  onPress={()=>this.props.navigation.navigate('LectureStudent', {...item})}>  
                        <Card style={{borderWidth: 0}} transparent={true}>
                        
                            <CardItem style={{}}>
                                <Left>
                                <Thumbnail source={{uri: item.img}} />
                                <Text style={{paddingLeft: 10, fontSize: 19, fontFamily: "Roboto",}}>{item.title}</Text>
                                </Left>
                                <Right style={styles.allStarsComment}>
                                    <View style={{ width: 10, height: 80, backgroundColor: this.state.random[item.id % 4], 
                                    borderRadius: 5}}></View>
                                </Right> 
                            </CardItem>
                            <ListItem style={styles.list}>
                                <Body>
                                <H3 style={styles.font}>Paid</H3>
                                </Body>
                                <Right>
                                    <Label style={styles.font}>{item.pivot.amount} KWD</Label>
                                </Right>
                            </ListItem>
                            <ListItem style={styles.list}>
                                <Body>
                                <H3 style={styles.font}>Need to be paid</H3>
                                </Body>
                                 <Right>
                                    {
                                        ( item.price == item.pivot.amount ) ? 
                                        (
                                            <Label style={styles.font}>None</Label>
                                        ):
                                        (
                                            <Label style={styles.font}>{ item.pivot.amount - item.price} KWD</Label>
                                        )
                                    }
                                </Right>
                            </ListItem>
                        </Card>
                    </TouchableOpacity>
                )}
                keyExtractor = { (item, index) => index.toString() }
                />
                </View>

            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({
    content:{
        backgroundColor: Color.background,
        padding:7,
    },
    Box: {
        height: 150, 
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 30
    },
    Box1: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5, 
        paddingTop: 0,
        marginBottom: 30
    },
    firstBox:{
        width: 10, 
        height: 80, 
        backgroundColor: Color.fourthColor, 
        borderRadius: 5
    },
    button:{
        backgroundColor: '#fef5e5',
        paddingTop: 0,
        paddingBottom: 0,
        padding: 30,
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonTxt:{
        color: '#000',
        fontSize: 20,
    },
    font:{
        fontFamily: "Roboto"
    },
    list:{
        paddingRight: 60,  
        backgroundColor: '#fff',
        borderColor: 'transparent'
    }
});

const mapStateToProps = ({ user }) => ({
    user,
});

const mapDispatchToProps = {
    setUser,
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WalletStudent);