import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Form,Alert,Spinner} from 'react-bootstrap';
import axios from 'axios';
import '../styles/mystyle.css'
import UserLoged from './UserLoged'
import Cookies from 'js-cookie'

class Register_user extends Component{
constructor(props) {
    super(props)

    this.state = {
         SigninDisable:true,
         SignupDisable:false,
         signin:false,
         signup:true,
         UserName:'',
         userloged:false,
         name:'',
         email:'',
         password:'',
         isvisible:true,
         errorMessage:'',
         loginSpinner:true,
         loginBtn:false,
         RegisterSpinner:true,
         RegisterBtn:false
        }
}
handle_data=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

createUser=()=>{
  this.setState({
    RegisterBtn:true,
    RegisterSpinner:false
  })
    const {name,email,password}= this.state
  axios({
        method: 'post',
        url: 'https://navjot-task-app.herokuapp.com/users',
        data: {
          name:name,
          email:email,
          password:password
        }
      }).then((response)=>{
        Cookies.set('user',response.data.token)
        window.location.reload(true)
      }).catch((e)=>{
        this.setState({
          isvisible:false,
          errorMessage:e.response.data.messageValidation,
          RegisterBtn:false,
          RegisterSpinner:true
        })
      })
}

  login_reg_switch=(value)=>{
    if(value==='signup'){
      this.setState({
        signin:true,
        SigninDisable:false,
        signup:false,
        SignupDisable:true
      })
    }else{
      this.setState({
        signup:true,
        SignupDisable:false,
        signin:false,
        SigninDisable:true
      })
    }
  }



  login_user=async()=>{
    this.setState({
      loginBtn:true,
      loginSpinner:false
    })

    const {email,password}= this.state
    await axios({
      method: 'post',
      url: 'https://navjot-task-app.herokuapp.com/users/login',
      data: {
        email:email,
        password:password
      }
    }).then((res)=>{
      Cookies.set('user',res.data.token)
      const token = Cookies.get('user')
      return axios.defaults.headers.common['Authorization'] = `Bearer${token}` //sending token in header
    }).then(()=>axios.get('https://navjot-task-app.herokuapp.com/users/me'))
      .then(()=>window.location.reload(true))
      .catch((e)=>{
      this.setState({
        isvisible:false,
        errorMessage:e.response.data,
        loginBtn:false,
        loginSpinner:true
      })
    })
    }

    render(){
        return(
          <div>

 {/* Registration Form */}
<div className='registerForm'  >
<Button className="btnSignup" variant="danger" onClick={()=>this.login_reg_switch('signup')} disabled={this.state.SignupDisable}>Signup</Button>
<Button className="btnLogin"  variant="danger"onClick={()=>this.login_reg_switch('signin')} disabled={this.state. SigninDisable}>Login</Button>
<Form hidden={this.state.signup} >
  <h3 id="welcome_register">Welcome! Sign Up</h3>
  <Form.Group controlId="formBasicEmail">
    <Form.Label className="name_signup" >Name</Form.Label>
    <Form.Control name="name" type="name" value={this.state.name} onChange={this.handle_data} placeholder="Name.." />
  </Form.Group>
  
  <Form.Group controlId="formBasicEmail">
    <Form.Label className="email_signup" >Email</Form.Label>
    <Form.Control name="email" type="email" value={this.state.email} onChange={this.handle_data}  placeholder="Example@example.com" />
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label className="pass_signup" >Password</Form.Label>
    <Form.Control name="password" type="password" value={this.state.password} onChange={this.handle_data} placeholder="Password" />
  </Form.Group>
  <Button variant="primary" onClick={this.createUser} hidden={this.state.RegisterBtn}>
    Register
  </Button>
    {/* spinner  */}
  <Button variant="primary" disabled hidden={this.state.RegisterSpinner}>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Loading...
  </Button>
</Form>

{/* Login Form */}
<Form hidden={this.state.signin}>
  <h3 id="welcome_register">Sign in</h3>
  <Form.Group controlId="formBasicEmail">
    <Form.Label className="login_email" >Email</Form.Label>
    <Form.Control name="email" type="email" value={this.state.email}  onChange={this.handle_data}  placeholder="Example@example.com" />
  </Form.Group>
  <Form.Group controlId="formBasicPassword">
    <Form.Label className="login_pass" >Password</Form.Label>
    <Form.Control name="password" type="password" value={this.state.password}  onChange={this.handle_data} placeholder="Password" />
  </Form.Group>
  <Button variant="primary" onClick={this.login_user}  hidden={this.state.loginBtn}>
    Login
  </Button>
  {/* spinner  */}
  <Button variant="primary" disabled hidden={this.state.loginSpinner}>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Loading...
  </Button>
</Form>



<br/>
<Alert variant="danger"  hidden={this.state.isvisible}>
{this.state.errorMessage}
</Alert>
</div>

</div>
)
        }
    }


export default Register_user