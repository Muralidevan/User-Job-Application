import React from 'react' 
// npm install axios
import axios from 'axios'
import {Link} from 'react-router-dom'

import JobForm from './JobForm'
//import Admin from './Admin'

class Jobs extends React.Component {
    constructor() {
        super()
        this.state = {
            users: []
           
           
        }
    }
    
    

    // addUser = (userData)=>{
    //     this.setState((prevState)=>{
    //         return{
    //             users:[userData].concat(prevState.users)
    //         }
    //     })

    // }

    

  
    render() {
        return (
            <div>
                <h1>Admin Dashboard</h1>
                <ul >
        <li > <Link to="/FrontEnd" >Front-end Developer</Link></li>
        <li><Link to="/NodeJs" >Node.js Developer</Link></li>
        <li> <Link to="/MeanStack" >MEAN stack Developer</Link></li>
        <li> <Link to="/FullStack" >FULL stack Developer</Link></li>

        </ul>  
                <h2>users - { this.state.users.length } </h2>
                
                {/* {
                    this.state.users.map((user)=>{
                        return <Admin 
                                key={user.id}
                                id={user.id}
                                name={user.name}
                                email={user.email}
                                phone={user.phone}
                                skills={user.skills}
                                jobTitle={user.jobTitle}
                                experience={user.experience}
                                createdAt={user.createdAt} 
                               
                                />
                      
                    })
                } */}
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

export default Jobs

