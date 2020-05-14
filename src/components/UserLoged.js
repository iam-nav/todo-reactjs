import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Button,InputGroup,FormControl,ListGroup,NavDropdown,Spinner } from 'react-bootstrap';
import '../styles/mystyle.css'
import Cookies from 'js-cookie'
import logoutUser from '../routers/logoutUser'
import {deleteTask,taskSend} from '../routers/taskRouter'

import axios from 'axios';
class UserLoged extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'tasks':[],
      description:'',
      name:'',
      loading:true,
      AddHide:false,
      spinner:true,
      listDisable:false,
      blurList:false
    }
    

  }
componentDidMount(){
     this.fetchUser()
     this.fetchTask()
     .then(result => result.json())
    .then((result=> this.setState({'tasks':result})))
    .catch(error=>console.log("error"+error))
}



//Api Calls Functions Below

async fetchUser(){
  const token = Cookies.get('user')
  const url ="https://navjot-task-app.herokuapp.com/users/me"
  await fetch(url, 
    {method:'GET',
     headers: {'Authorization': `Bearer${token}`}
    })
    .then(result => result.json())
    .then((result=> this.setState({name:result.name})))
    .catch((error=>console.log(error)))
}



async fetchTask(){
  const token = Cookies.get('user')
  const url ="https://navjot-task-app.herokuapp.com/tasks"
  const data = await fetch(url, 
    {method:'GET',
     headers: {'Authorization': `Bearer${token}`}
    })
    return data
}

logoutUser(){
  logoutUser().then(()=>window.location.reload(true))
}

sendtask =async()=>{
  this.setState({
    AddHide:true,
    loading:false
  })
  setTimeout(()=>{
    this.setState({
      AddHide:false,
      loading:true
    })
  },5000)
  taskSend(this.state.description)
  .then((res)=>{
    this.fetchTask()
    .then(result => result.json())
    .then((result)=> {
      this.setState({
        'tasks':result,
        loading:true,
        AddHide:false
      })
    })
  })
   .catch((e=>console.log(e)))
}


Task(id){
  this.setState({
    listDisable:true,
    blurList:true,
    spinner:false
  })
  setTimeout(()=>{
    this.setState({
    listDisable:false,
    blurList:false,
    spinner:true
    })
  },5000)
  deleteTask(id).then((res)=>{
    this.fetchTask()
    .then(result => result.json())
    .then((result)=> {
      this.setState({
        'tasks':result,
        listDisable:false,
        blurList:false,
        spinner:true
      })
    })
  })
  .catch((e=>console.log(e)))
}

taskCompleted=(id,event)=>{
  this.setState({
    listDisable:true,
    blurList:true,
    spinner:false
  })
  setTimeout(()=>{
    this.setState({
    listDisable:false,
    blurList:false,
    spinner:true
    })
  },5000)
  const token = Cookies.get('user')
  axios.defaults.headers.common['Authorization'] = `Bearer${token}`
  axios({
   method: 'patch',
   url: 'https://navjot-task-app.herokuapp.com/tasks/'+id,
   data: {
    completed:event.target.checked
   }
 }).then((res)=>{
  this.fetchTask()
  .then(result => result.json())
  .then((result)=> {
    this.setState({
      'tasks':result,
      listDisable:false,
      blurList:false,
      spinner:true
    })
  })
})
 .catch((e=>console.log(e)))
}



handleTask =(event)=>{
  this.setState({
    [event.target.name]:event.target.value
  })
}
 
render() {
return (
<div>
<div hidden={this.props.userloged}>
<Navbar >
<Navbar.Text>
        Signed in as: <a href="#login">{this.state.name}</a>
</Navbar.Text>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
  <NavDropdown title="Logout" className="btn_logout"  id="collasible-nav-dropdown">
        <NavDropdown.Item href=""></NavDropdown.Item>
        <NavDropdown.Item href="">Profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item  onClick={this.logoutUser}>Logout</NavDropdown.Item>
      </NavDropdown>
  </Navbar.Collapse>

</Navbar>





  
<div className="taskbar" >
<InputGroup className="mb-3">
    <FormControl
      placeholder="Enter Task..."
      aria-label="Recipient's username"
      aria-describedby="basic-addon2" name="description" value={this.state.description} onChange={this.handleTask}
    />
    <InputGroup.Append>
  <Button variant="primary" disabled={true} hidden={this.state.loading}>
    <Spinner
      as="span"
      animation="grow"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    Loading...
  </Button>
      <Button variant="outline-secondary" onClick={()=>this.sendtask()} hidden={this.state.AddHide} >
        Add</Button>
    </InputGroup.Append>
  </InputGroup>
</div>


<div>
  {/* Spinner  */}
  <Spinner hidden={this.state.spinner}>
<Spinner animation="grow" className="spinner"  />
<Spinner animation="grow" className="spinnerSmall" size="sm" />
</Spinner>
 {/* Spinner  */}

<ListGroup variant="flush" className={this.state.blurList?"listSpinner":"list"} >
{this.state.tasks.map(function(data,index){
return(  
  <ListGroup.Item id="ul" disabled={this.state.listDisable}>
      <button id="xbutton"  onClick={()=>this.Task(data._id)} style={{float:"right",marginLeft:"-12px"}}><p style={{paddingBottom:"10px"}}>x</p></button>
     <input type="checkbox" checked={data.completed}   onChange={(event)=>this.taskCompleted(data._id,event)}  style={{float:"left",marginTop:6,marginLeft:"10px"}}></input>
     <li id="tasks" className={!data.completed ? "NotCompleteTask":"TaskComplete"}  key={index}>{data.description}</li> 
    </ListGroup.Item>)
    },this)}
</ListGroup>
</div>
</div>

</div>

        )
    }
}
export default UserLoged
