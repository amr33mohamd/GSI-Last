import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, AsyncStorage, TouchableOpacity, FlatList, Keyboard } from 'react-native';
import { Icon, Form, Item, Button, Input } from 'native-base';
import Color from '../../../constants/colors';
import AppTemplate from "../appTemplate";
import axios from "axios";
import Server from "../../../constants/config";
import _ from 'lodash';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'
import MultiSelect from 'react-native-multiple-select';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showLectures: [],
            isLoading: false,
            title: "",
            teacher: "",
            isStartTimeVisible: false,
            isEndTimeVisible: false,
            start_duration: " Start Time",
            end_duration: " End Time",
            searchLectures: [],
            isPressed: false,
            searchedUsers: [],
            datas: [],
            new_tableData:[],
            tableData: []
         };
      }

      onSelectedItemsChange = tableData => {
        this.setState({ tableData });
        var new_tableData =[];
        for(var i=0; i<=tableData.length; i++ ){
            var new_data =  _.filter(this.state.datas, student => student.id == tableData[i]);
            if(new_data.length != 0){
                new_tableData.push({new_data});
                
            }
          if(i == tableData.length){
            this.setState({new_tableData})
            
          }
            
        }
        };

      componentDidMount(){
        this.setState({
            isLoading: true
        })
            axios.get(Server.url + 'api/lectures?token=')
            .then(response => {
                this.setState({
                    isLoading: false,
                    showLectures: response.data
                })
            }).catch(error => {
                Toast.show({
                    text: 'Error reachig server',
                    buttonText: "Ok",
                    type: "danger"
                })
            });

        this.Data();

        axios.get(Server.url + 'api/getteachers')
        .then(response=>{
            this.setState({
                searchedUsers: response.data,
                showData: this.state.searchedUsers
            })
            let showData = []
            showData = _.map(response.data, user => {
                return {...user, name: user.name+ " " + user.middleName + " " + user.lastName }
            } )
            this.setState({
                datas: showData
            })
        }).catch(error => {

        })

    }

      async Data(){
          let data = [];
          data = this.state.showLectures;
          
          if(this.state.title != ""){
              data = await _.filter(data, lecture => lecture.title.toLowerCase().indexOf(this.state.title.toLowerCase()) > -1);
          }

        //   if(this.state.subject != ""){
        //       data = await _.filter(data, lecture => lecture.subject.toLowerCase().indexOf(this.state.subject.toLowerCase()) > -1);
        //   }
        var new_data = [];
        
        for(let i in this.state.new_tableData){
                data = await _.filter(data, lecture => lecture.user.id == this.state.new_tableData[i].new_data[0].id );
        //    alert( JSON.stringify(this.state.new_tableData[i].new_data[0].id))
           
          new_data.push({data});
          if(this.state.new_tableData.length-1 == i){
            this.setState({
                searchLectures: new_data,
                isPressed: true
            })
          }
        }


        // if(this.state.teacher !== ""){
        //     data = await _.filter(data, lecture => lecture.user.name == this.state.teacher);
        // }
         

        // if(this.state.start_duration !== ""){
            
        //     data = await _.filter(data, lecture => moment(moment(lecture.start_duration)
        //     .format('YYYY-MM-DD h:mm a')).isAfter(this.state.start_duration));
        // }
        
        Keyboard.dismiss()

        
      }
    
    render() {
        return (
            <AppTemplate navigation={this.props.navigation} back title="Search">
            <View style={styles.content}>
                <View style={styles.Box}>
                
                    {/* <Item style={styles.lecture}>
                        <Icon type="Foundation" name="results" />
                        <Text style={styles.lectureTxt}>Teacher</Text>
                        <Input onChangeText={(teacher) => this.setState({teacher})}
                                placeholder="Teacher name"
                                placeholderTextColor="#ccc5c5"
                        />
                    </Item> */}
                    
                    <Item style={styles.lecture}>
                        <Icon type="FontAwesome" name="user" />
                        <Text style={styles.lectureTxt}>Lecture</Text>
                        <Input onChangeText={(title) => this.setState({title})}
                                placeholder="Lecture name"
                                placeholderTextColor="#ccc5c5"
                        />
                    </Item>

                    <MultiSelect
                            hideTags
                            items={this.state.datas}
                            uniqueKey="id"
                            ref={(component) => { this.multiSelect = component }}
                            onSelectedItemsChange={this.onSelectedItemsChange}
                            selectedItems={this.state.tableData}
                            selectText="Search Teacher"
                            searchInputPlaceholderText="Search Teacher..."
                            onChangeInput={ (text)=> console.log(text)}
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#CCC"
                            selectedItemTextColor="#CCC"
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            searchInputStyle={{ color: '#CCC' }}
                            submitButtonColor="#CCC"
                            submitButtonText="Submit"
                            styles={{backgroundColor: 'red'}}
                        />

                    {/* <Item style={styles.lecture}>
                        <Icon type="FontAwesome" name="calendar" />
                        <Text style={styles.lectureTxt}>From </Text>
                        <View>
                            <TouchableOpacity onPress={this._showStartTimePicker}>
                                <Text>{this.state.start_duration}</Text>
                            </TouchableOpacity>
                            <DateTimePicker
                                isVisible={this.state.isStartTimeVisible}
                                onConfirm={this._handleStartTimePicked}
                                onCancel={this._hideStartTimePicker}
                                mode={'datetime'}
                                is24Hour={false}
                            />
                      </View>
                      <Text style={{paddingLeft:10, paddingRight:10}}>To</Text>
                        <View>
                            <TouchableOpacity onPress={this._showEndTimePicker}>
                                <Text>{this.state.end_duration}</Text>
                            </TouchableOpacity>
                            <DateTimePicker
                                isVisible={this.state.isEndTimeVisible}
                                onConfirm={this._handleEndTimePicked}
                                onCancel={this._hideEndTimePicker}
                                mode={'datetime'}
                                is24Hour={false}
                            />
                      </View>
                    </Item> */}

                    <Button style={styles.button} onPress={ ()=> this.Data()}>
                        <Text style={styles.buttonTxt}>Search</Text>
                    </Button>

                </View>

                {
                    (this.state.isPressed == true) ? (
                        (()=> this.Data())?(
                            <FlatList
                            ListEmptyComponent={
                                <Text style={{alignItems: "center", justifyContent: "center", flex: 1, textAlign: "center"}}>No result</Text>
                            }
                            data={this.state.searchLectures[0].data}
                            renderItem={({item}) => (
                                <View style={styles.Box1}>
                                    <Item style={styles.item}  onPress={()=>this.props.navigation.navigate('LectureStudent', {...item})}>
                                        <View style={styles.viewImage}>
                                            <Image source={require('../../../images/idea.png')} style={styles.image}/>
                                        </View>
                                        <View>
                                            <Text style={styles.txt}>{item.title}</Text>
                                            <Text style={styles.txt}>{item.user.name} {item.user.middleName} {item.user.lastName}</Text>
                                            <Text style={styles.txt}>{item.start_date}</Text>
                                            <Text style={styles.txt}>{item.start_time}</Text>
                                        </View>
                                    </Item>
                                </View>
                            )}
                            keyExtractor = { (item, index) => index.toString() }
                            />
                        ):null

                    ): null
                }

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
        backgroundColor: '#fff',
        padding: 30,
        paddingTop: 0,
        marginBottom: 30
    },
    Box1: {
        backgroundColor: '#fff',
        padding: 15,
    },
    lecture:{
        backgroundColor: 'white', 
        borderColor: 'transparent',
        paddingTop: 30
    },
    lectureTxt:{
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    form:{
        width: 110,
        marginLeft: 80        
    },
    button:{
        backgroundColor: '#fef5e5',
        paddingTop: 10,
        paddingBottom: 10,
        padding: 35,
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    buttonTxt:{
        color: '#000',
        fontSize: 20,
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