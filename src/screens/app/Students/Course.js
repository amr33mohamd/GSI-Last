import React, { Component } from 'react';
import {StyleSheet, View, AsyncStorage, ActivityIndicator, Image, TouchableOpacity} from 'react-native';
import { Button, Item, Text, Input, Form, Icon, Toast, Radio,ListItem,Left,Right} from 'native-base';
import AppTemplate from "../appTemplate";
import Color from '../../../constants/colors';
import axios from "axios/index";
import Server from "../../../constants/config";
import {setUser} from "../../../reducers";
import {connect} from "react-redux";
import ImagePicker from "react-native-image-picker";
import firebase from 'react-native-firebase';
import {
	Table,
	Row,
	Rows
} from 'react-native-table-component';
import MultiSelect from 'react-native-multiple-select';

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
          mile:0,
          selectedItems: [],
          items:[{
    id: '92iijs7yta',
    name: 'Ondo',
  }, {
    id: 'a0s0a8ssbsd',
    name: 'Ogun',
  }, {
    id: '16hbajsabsd',
    name: 'Calabar',
  }, {
    id: 'nahs75a5sg',
    name: 'Lagos',
  }, {
    id: '667atsas',
    name: 'Maiduguri',
  }, {
    id: 'hsyasajs',
    name: 'Anambra',
  }, {
    id: 'djsjudksjd',
    name: 'Benue',
  }, {
    id: 'sdhyaysdj',
    name: 'Kaduna',
  }, {
    id: 'suudydjsjd',
    name: 'Abuja',
  }]
            // isLoading: true,
            // profile:this.props.navigation.state.params,
            // profileData: [],
        };
    }

    // componentDidMount(){
    //     AsyncStorage.getItem('token').then(userToken => {
    //         return axios.get(Server.url+'api/auth/profile/'+this.state.profile.user_id+'?token='+userToken).then(response => {
    //             this.setState({
    //                 profileData: response.data,
    //             });
    //         }).catch(error => {
    //             Toast.show({
    //                 text: 'Error reaching the server.',
    //                 type: "danger",
    //                 buttonText: 'Okay'
    //             });
    //         })
    //     }).then(() => {
    //         this.setState({
    //             isLoading: false
    //         });
    //     });
    // }

    onSelectedItemsChange = selectedItems => {
      this.setState({ selectedItems });
      alert(JSON.stringify(selectedItems))
    };


    render() {
      const tableHead = ['Type', 'Value'];
      		const tableData = [
      			['Price' , '100'],

      		];
        return (
            <AppTemplate back navigation={this.props.navigation} title="Profile info">
            <View style={styles.content}>
                <Form style={styles.container}>


                        <MultiSelect
                            hideTags
                            items={this.state.items}
                            uniqueKey="id"
                            ref={(component) => { this.multiSelect = component }}
                            onSelectedItemsChange={this.onSelectedItemsChange}
                            selectedItems={this.state.selectedItems}
                            selectText="Add Course"
                            searchInputPlaceholderText="Search Courses..."
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
                    <View >
                    <Text style={{textAlign:'center',padding:10}}>installment</Text>
                    <TouchableOpacity style={{flexDirection:'row',padding:15}} onPress={()=>{this.setState({mile:1})}}>
            <Left>
              <Text>One</Text>
            </Left>
            <Right>
              <Radio onPress={()=>{this.setState({mile:1})}}  selected={this.state.mile === 1} />
            </Right>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'row',padding:15}} onPress={()=>{this.setState({mile:2})}}>

            <Left>
              <Text>Two</Text>
            </Left>
            <Right>
              <Radio onPress={()=>{this.setState({mile:2})}}  selected={this.state.mile === 2} />
            </Right>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'row',padding:15}} onPress={()=>{this.setState({mile:3})}}>

            <Left>
              <Text>Three</Text>
            </Left>
            <Right>
              <Radio onPress={()=>{this.setState({mile:3})}}  selected={this.state.mile === 3} />
            </Right>
          </TouchableOpacity>
          </View>

          <Table
          									borderStyle={{
          										borderWidth: 0.5,
          										borderColor: 'orange',
                              margin:10
          									}}
          								>
          									<Row
          										data={tableHead}
          										style={styles.head}
          										textStyle={styles.text}
          									/>
          									<Rows
          										data={tableData}
          										style={styles.row}
          										textStyle={styles.text2}
          									/>
          								</Table>








                    <Button
                        onPress={() => this.Editprofile()}
                        style={{flexDirection: "row", backgroundColor: '#d3d3ea',margin:10}}
                        block
                    >
                        <Text style={{fontFamily: "Roboto", color: '#000'}}>Join</Text>
                        {this.state.isLoading && (
                            <ActivityIndicator size="small" color="#000000" />
                        )}
                        <Icon type="Entypo" name="edit" style={{color: Color.mainColor, fontSize: 18}}/>
                    </Button>
                </Form>
            </View>


            </AppTemplate>
        );
    }
}

const styles = StyleSheet.create({

  container:{
      backgroundColor: '#fff',
      flex: 1,
      padding: 10
  },
  content:{
      backgroundColor: Color.background,
      padding:7,
  },
  contentDescription:{
  },
  image:{
      alignItems:'center',
      alignSelf: 'center',
      paddingTop: 10,
      width: 100,
      height: 100,
      borderRadius: 50
  },
  input:{
      width: 200,
      padding: 10,
      height:30,
      borderRadius: 5,
      position: 'absolute',
      right: 0,
  },
  inputDescription:{
      width: 300,
      padding: 10,
      height:120,
      borderRadius: 5,
      marginTop: 7
  },
  inputText:{
      color: '#918f8f',
      fontSize: 14,
  },
  date:{
      position: 'absolute',
      right: 15,
  },
  button:{
      backgroundColor: '#6483f7',
      position: 'absolute',
      right: 20,
      bottom: 10
  },
  font:{
      fontFamily: "Roboto",
  },
  row: { height: 30 ,textAlign:'center'},
  head: { height: 40, backgroundColor: 'orange' },
  text: {
  		textAlign: 'center',
  		fontSize: 18,
  		color: 'white'
  	},
    text2: {
    		textAlign: 'center',
    		fontSize: 18,
    		color: 'black'
    	},
});

const mapStateToProps = ({ user }) => ({
    user
});

const mapDispatchToProps = {
    setUser
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Course);
