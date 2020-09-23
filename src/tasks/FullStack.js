import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Modal from 'react-modal'




class FullStack extends React.Component{
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
            const users = response.data.filter((user)=>{return user.jobTitle=="FULL Stack Developer"})
           // console.log(messages)
           this.setState({users})

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
            <div>
                  <Modal isOpen={this.state.show}>
           
             
           <h2>{this.state.user.name} Profile</h2>
           <p>Contact Number:{this.state.user.phone}</p>
           <p>Email:{this.state.user.email}</p>
           <p>Skills;{this.state.user.skills}</p>
           <p>Experience:{this.state.user.experience}</p>
                      <button onClick={this.handleView} >Close</button>
                      </Modal>  
                   <h1>Admin Dashboard</h1>
                <ul >
        <li > <Link to="/FrontEnd" >Front-end Developer</Link></li>
        <li><Link to="/NodeJs" >Node.js Developer</Link></li>
        <li> <Link to="/MeanStack" >MEAN stack Developer</Link></li>
        <li> <Link to="/FullStack" >FULL stack Developer</Link></li>

        </ul>  
                <h1>FullStack Developes</h1>
                <h6>List of Candidates applied for Full Stack Development</h6>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Technical Skills</th>
                            <th>Experience</th>
                            <th>Date</th>
                            <th>View Details</th>
                            <th>Update Application Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map((user)=>{
                                return (
                                    <tr> 
                                        <td> {user.name} </td>
                                        <td> {user.skills} </td>
                                        <td> {user.experence} </td>
                                        <td> {user.createdAt} </td>

                                        <td> 
                                        {this.state.show ?<div onClick = {()=>{this.handleView(user._id)}} > </div> :null  }
                                        <button onClick={()=>{this.handleView(user._id)}} >View Details</button>   
                                        </td>
                                        <td> 
                                        {user.status==="applied" && <td>  <button onClick = {()=>{this.handleShortlist(user._id)}}> Shortlist </button><button onClick = {()=>{this.handleReject(user._id)}}>Reject  </button>  </td>}                     
                                {user.status==="shortlisted" &&<td><button > {user.status}</button></td> }      
                                      {user.status==="rejected" && <td><button >{user.status} </button></td>} 
                                        </td>
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

export default FullStack