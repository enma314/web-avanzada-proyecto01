import React, { Component } from 'react';
import {
  View,
  Alert,
  Text,
  Spinner
} from "react-native-web";
import logo from '../face.png';
import './upload.css';
import axios from 'axios';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testText: "Face Recognition Project",
      name: '',
      lastName: '',
      selectedFile: null
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.postNewImage = this.postNewImage.bind(this);
    this.resetForm = this.resetForm.bind(this);
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
    bodyFormData.append('name', this.state.name);
    bodyFormData.set('lastName', this.state.lastName);
    bodyFormData.set('image', this.state.selectedFile);
    axios({
      method: 'post',
      url: 'http://localhost:3001/api/jobs/createJob',
      data: bodyFormData,
      config: { headers: {}}
    }).then((response) => {
          //handle success
          console.log(response);
          alert("Kairos Response: "+response.data);
          this.resetForm()
    }).catch((response) => {
          //handle error
          console.log("AXIOS ERROR");
    });
  }
  
  fileSelectedHandler = event => {
    this.setState({selectedFile: event.target.files[0]});
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({lastName: event.target.value});
  }

  handleSubmit(event) {
    this.postNewImage();
    event.preventDefault();
  }

  resetForm = () => {
    console.log("RUN!")
    this.setState({
      name: "",
      lastName: "",
      selectedFile: ""
    })
    
  }

  render() {
    return (
      <div className="App-content">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={ this.handleSubmit } id='myForm'>
          <div>
            <label>
              Name:   
              <input     
                type="text"
                value={this.state.name}
                onChange={ this.handleNameChange } />
            </label>
            <label>
              Last Name:              
              <input
                type="text"
                value={this.state.lastName}
                onChange={ this.handleLastNameChange }
              />
            </label>
            <div className="Images-input">
              <input
                className="Single-image"
                type="file"
                name="pic1"
                accept="image/*"
                onChange={ this.fileSelectedHandler }
              />
            </div>
            
          </div>
          <input className="Submit" type="submit" value="Submit"/>
        </form>
        <p>
          Press submit to send data.
        </p>
        
        <Text>Enmanuel Pujals 2013-5645</Text>
      </div>
    );
  }
}

export default Upload;