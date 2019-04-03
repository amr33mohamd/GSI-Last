import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, AsyncStorage, ActivityIndicator } from 'react-native';
import {Item, Right, Left, Icon} from 'native-base';
import Color from '../../../constants/colors';
import AppTemplate from '../appTemplate'
import axios from "axios";
import Server from "../../../constants/config";

export default class Notifications extends Component {

    constructor(props){
        super(props);
        this.state = {
            showNotification: [],
            isLoading: false
        }
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        })
        return AsyncStorage.getItem('token').then(userToken => {
            return axios.get(Server.url + 'api/show_notification?token='+userToken)
            .then(response => {
                this.setState({
                    isLoading: false,
                    showNotification: response.data,
                })
            }).catch(error => {
                Toast.show({
                    text: 'Error reachig server',
                    buttonText: "Ok",
                    type: "danger"
                })
            })
        })   
    }

    render() {
        return (
            <AppTemplate navigation={this.props.navigation} title="Notifications">
            {
                (this.state.isLoading)? (
                    <View>
                        <ActivityIndicator style={{paddingTop: 20}} size="large" color={Color.mainColor} />
                    </View>
                ): (
                    <FlatList
                            ListEmptyComponent={
                                <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>No Notification</Text>
                            }
                        data={this.state.showNotification}
                        renderItem={({item}) => (
                    
                        <View style={styles.content}>
                        <View style={styles.Box}>

                            <Item style={styles.item}>
                                <View style={styles.viewImage}>
                                    <Image source={require('../../../images/idea.png')} style={styles.image}/>
                                </View>
                                <View>
                                    <Text style={styles.txt}>Title: {item.text}</Text>
                                </View>
                            </Item>

                        </View>
                    </View>
                    )}
                    keyExtractor = { (item, index) => index.toString() }
                    />
                )
            }
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
        flex:1,  
        backgroundColor: '#fff',
        padding: 30,
        paddingTop: 5,
        paddingBottom: 5
    },
    item:{
        padding: 10,
    },
    viewImage:{
        paddingRight: 50
    },
    image:{
        width:80, 
        height: 80, 
        borderRadius: 10        
    },
    txt:{
        fontFamily: "Roboto",
    }

});
