import React, { Component } from 'react';
import './App.css';
import Header from './components/header'
import Footer from './components/footer'
import Register_form from './components/Register_form'
import UserLoged from './components/UserLoged'
import Cookies from 'js-cookie'
import axios from 'axios'

class App extends Component{
  state={
    visible:false
  }
  componentDidMount(){
    this.checkUserLoged()
  }
  checkUserLoged(){
    const token = Cookies.get('user')
    axios.defaults.headers.common['Authorization'] = `Bearer${token}`
    const url ="/users/me"
    axios.get(url)
  .then((res=>this.setState({visible:true})))
  .catch((error=>this.setState({visible:false})))
  }
  
  render(){
    return(
      <div className="App">
      <Header></Header>
      {this.state.visible ? <UserLoged></UserLoged>: <Register_form></Register_form>}   
      <Footer />
      </div>
    )
  }
}

export default App;
