import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


class MeanStack extends React.Component{
    constructor(){
        super()
        this.state ={
            users:[],
            status:''
        }
    }
    componentDidMount(){
        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
       
        .then((response)=>{
            const users = response.data.filter((user)=>{return user.jobTitle=="MEAN Stack Developer"})
           // console.log(messages)
           this.setState({users})

        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    render(){
        return(
            <div>
                   <h1>Admin Dashboard</h1>
                <ul >
        <li > <Link to="/FrontEnd" >Front-end Developer</Link></li>
        <li><Link to="/NodeJs" >Node.js Developer</Link></li>
        <li> <Link to="/MeanStack" >MEAN stack Developer</Link></li>
        <li> <Link to="/FullStack" >FULL stack Developer</Link></li>

        </ul>  
                <h1>MeanStack Developes</h1>
                <h6>List of Candidates applied for Mean-Stack Development</h6>
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
                                            <button onClick = {this.handleView}> View </button>  
                                        </td>
                                        <td> 
                                            <button onClick = {this.handleShortlist}> Shortlist </button>
                                            <button onClick = {this.handleReject}> Reject </button>  
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

export default MeanStack