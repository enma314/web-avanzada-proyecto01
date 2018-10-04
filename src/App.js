import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {
  View,
  Alert,
  Text,
  Spinner
} from "react-native-web";
import logo from './face.png';
import './App.css';
import FindScreen from './screens/find';
import UploadScreen from './screens/upload';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testText: "Face Recognition Project",
      name: '',
      lastName: '',
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  sendData(){
    let bodyFormData = new FormData();
    axios({
      url: `http://localhost:3001/api/jobs`,
      method: "GET",
      //data
    }).then(({ data }) => {
      console.log(data);
    }).catch((error) => {
      if (error.response) {
        alert("AXIOS ERROR.") 
      }
    })
  }

  postNewImage(){
    let bodyFormData = new FormData();
    bodyFormData.set('userName', 'Fred');
    axios({
      method: 'post',
      url: 'myurl',
      data: bodyFormData,
      config: { headers: {'Content-Type': 'multipart/form-data' }}
    }).then(function (response) {
          //handle success
          console.log(response);
    }).catch(function (response) {
          //handle error
          console.log(response);
    });
  }
  

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({lastName: event.target.value});
  }

  handleSubmit(event) {
    console.log("heey")
    alert('A name was submitted: ' + this.state.name + ' ' + this.state.lastName);
    this.sendData();
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header"> { this.state.testText } </div>
        <Tabs>
          <TabList className="Tab-list">
            <Tab className="Single-tab">Find Face</Tab>
            <Tab className="Single-tab">Upload New Face to Database</Tab>
          </TabList>

          <TabPanel>
            <FindScreen/>
          </TabPanel>
          <TabPanel>
            <UploadScreen/>
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default App;
