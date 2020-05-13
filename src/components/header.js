import React, { Component } from 'react'
import { Navbar,Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


class Header extends Component{
    render(){
    return(
        <Navbar className="navbar" bg="dark" variant="dark">
        <Navbar.Brand href="#home">TaskApp</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav> 
      </Navbar>
        )
    }
}
export default Header