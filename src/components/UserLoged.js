import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Button,InputGroup,FormControl,ListGroup,NavDropdown } from 'react-bootstrap';
import '../styles/mystyle.css'
import Cookies from 'js-cookie'
import logoutUser from '../routers/logoutUser'
import {deleteTask,completTask,taskSend,TaskFetch} from '../routers/taskRouter'

import axios from 'axios';
class UserLoged extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'tasks':[],
      description:'',
      name:''
    }
    

  }
componentDidMount(){
     this.fetchUser()
     this.fetchTask()
}



//Api Calls Functions Below

fetchUser(){
  const token = Cookies.get('user')
  const url ="http://localhost:3001/users/me"
  const data =  fetch(url, 
    {method:'GET',
     headers: {'Authorization': `Bearer${token}`}
    }).then(result => result.json())
    .then((result=> this.setState({name:result.name})))
    .catch((error=>console.log(error)))
}


fetchTask(){
  // TaskFetch().then(result => result.json())
  // .then((result=> this.setState({'tasks':result})))
  // .catch(error=>console.log("error"+error))

    const token = Cookies.get('user')
  const url ="http://localhost:3001/tasks"
  const data =  fetch(url, 
    {method:'GET',
     headers: {'Authorization': `Bearer${token}`}
    }).then(result => result.json())
    .then((result=> this.setState({'tasks':result})))
    .catch(error=>console.log("error"+error))
}

logoutUser(){
  logoutUser().then(()=>window.location.reload(true))
}

sendtask =async()=>{
  taskSend(this.state.description)
  .then((res=>this.fetchTask()))
   .catch((e=>console.log(e)))
  }

Task(id){
  deleteTask(id).then((res=>this.fetchTask()))
  .catch((e=>console.log(e)))
}


taskCompleted=(id,event)=>{
  const token = Cookies.get('user')
  axios.defaults.headers.common['Authorization'] = `Bearer${token}`
  axios({
   method: 'patch',
   url: 'http://localhost:3001/tasks/'+id,
   data: {
    completed:event.target.checked
   }
 }).then((res=>this.fetchTask()))
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
      <Button variant="outline-secondary" onClick={()=>this.sendtask()}>Add</Button>
    </InputGroup.Append>
  </InputGroup>
</div>


  
<ListGroup variant="flush" className="list">
{this.state.tasks.map(function(data,index){
return(  
  <ListGroup.Item id="ul">
      <button id="xbutton"  onClick={()=>this.Task(data._id)} style={{float:"right",marginLeft:"-12px"}}><p style={{paddingBottom:"10px"}}>x</p></button>
     <input type="checkbox" checked={data.completed}   onChange={(event)=>this.taskCompleted(data._id,event)}  style={{float:"left",marginTop:6,marginLeft:"10px"}}></input>
     <li id="tasks" className={!data.completed ? "NotCompleteTask":"TaskComplete"}  key={index}>{data.description}</li> 
    </ListGroup.Item>)
    },this)}
</ListGroup>
</div>

</div>

        )
    }
}
export default UserLoged
