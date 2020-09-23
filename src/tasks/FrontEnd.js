import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../Modal.css'
import Modal from 'react-modal'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

Modal.setAppElement('#root')


class FrontEnd extends React.Component{
    constructor(){
        super()
        this.state ={
            users:[],
            status:'',
            show:false,
            user:[]
        }
    }
    componentDidMount(){
        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
       
        .then((response)=>{
            const users = response.data.filter((user)=>{return user.jobTitle==="Front-End Developer"})
           
           this.setState({users})
           console.log(users)

        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    handleShortlist =(id)=>{ 

       
        const status = { status:"shortlisted"}
       
    
       console.log(status)
        axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`,status)
        .then((response)=>{
            const status = response.data.status
            console.log(status)
            this.setState({status})
            console.log(status)
        })
        .catch((err)=>{
            alert(err.message)
        })

       
    }
    handleReject = (id)=>{
        
              
        const status = { status:"rejected"}

        
        axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`,status)
        .then((response)=>{
            const status = response.data.status
           
            this.setState({status})
            
        })
        .catch((err)=>{
            alert(err.message)
        })
       
    }


    handleView = (id)=>{

        this.setState((prevState)=>{
            return{show:!prevState.show}
        })

        axios.get(`http://dct-application-form.herokuapp.com/users/application-form/${id}`)
        .then((response)=>{
            const user= response.data
            this.setState({user})
        })
        .catch((err)=>{
            alert(err.message)
        })



    }

 
  
    render(){
       
       
        return(
        
            
            <div class="container-table100">
              <Modal isOpen={this.state.show}>
           
             
        <h2>{this.state.user.name} Profile</h2>
        <p>Contact Number:{this.state.user.phone}</p>
        <p>Email:{this.state.user.email}</p>
        <p>Skills;{this.state.user.skills}</p>
        <p>Experience:{this.state.user.experience}</p>
                   <button onClick={this.handleView} >Close</button>
                   </Modal>  
                 
                   <h1>Admin Dashboard</h1>
                  
                   <Navbar bg="primary" variant="dark">
            <Navbar.Brand as={Link} to="/" >Add User</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/FrontEnd">Front-end Developer</Nav.Link>
              <Nav.Link as={Link} to="/NodeJs">Node.js Developer</Nav.Link>
              <Nav.Link as={Link} to="/MeanStack">MEAN stack Developer</Nav.Link>
              <Nav.Link as={Link} to="/FullStack">FULL stack Developer</Nav.Link>
        
            </Nav>
            </Navbar>
        
                <h1>Front-End Developers</h1>
                <h6>List of Candidates applied for Front-End Development</h6>
                <table>
                
                    <thead>
                        <tr class="table100-head">
                            <th class="column1">Name</th>
                            <th class="column2">Technical Skills</th>
                            <th class="column3">Experience</th>
                            <th class="column4">Date</th>
                            <th class="column5">View Details</th>
                            <th class="column6">Update Application Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map((user)=>{
                                return (
                                    <tr key={user._id} > 
                                        <td class="column1"> {user.name} </td>
                                        <td class="column2"> {user.skills} </td>
                                        <td class="column3"> {user.experience} </td>
                                        <td class="column4"> {user.createdAt} </td>

                                        <td class="column5"> 
                                        {this.state.show ?<div onClick = {()=>{this.handleView(user._id)}} > </div> :null  }
                                        <button onClick={()=>{this.handleView(user._id)}} className="button-view" >View Details</button>   
                                        </td>
                                        
                                       
                                       
                                     {user.status==="applied" && <td class="column6" >  <button onClick = {()=>{this.handleShortlist(user._id)}} className="button"> Shortlist </button><button onClick = {()=>{this.handleReject(user._id)}} className="button-reject">Reject  </button>  </td>}                     
                                {user.status==="shortlisted" &&<td class="column6"><button className="button"> {user.status}</button></td> }      
                                      {user.status==="rejected" && <td class="column6"><button className="button-reject">{user.status} </button></td>}      

                                       
                                            
                      
                                       
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
               
               
              

                </div>
               
                 
        )
    }
}

export default FrontEnd