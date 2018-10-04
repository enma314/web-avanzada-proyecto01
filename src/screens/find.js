import React, { Component } from 'react';
import {
  View,
  Alert,
  Text,
  Spinner
} from "react-native-web";
import logo from '../face.png';
import './find.css';
import axios from 'axios';

class Find extends Component {
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
    bodyFormData.append('image', this.state.selectedFile);
    console.log(this.state.selectedFile)
    axios({
      method: 'post',
      url: 'http://localhost:3001/api/categories/createCategory',
      data: bodyFormData,
      config: { headers: {}}
    }).then((response) => {
          //handle success
          console.log(response.data);
          alert('A new image was submitted: ');
          if(!response.data){
            alert('No hay candidatos en la base de datos.')
          } else {
            alert(`La persona en la imagen es ${response.data[0].subject_id}. Con un coeficiente de confianza de ${response.data[0].confidence}.`)
          }
    }).catch((response) => {
          //handle error
          console.log("AXIOS ERROR");
    });
  }
  
  fileSelectedHandler = event => {
    console.log(event.target.files[0])
    this.setState({selectedFile: event.target.files[0]}, ()=>{});
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
          Press submit to find coincidence.
        </p>
        
        <Text>Enmanuel Pujals 2013-5645</Text>
      </div>
    );
  }
}

export default Find;