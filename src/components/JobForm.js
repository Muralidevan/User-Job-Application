import React from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

//import Admin from './Admin'

class JobForm extends React.Component{
    constructor(){
        super()
        this.state = {
            userData:[],
            name: '',
            email: '',
            phone: '',
            Title:[
                'FULL Stack Developer', 'Front-End Developer', 'MEAN Stack Developer', 'Node.js Developer'
            ],
            jobTitle:'',
            experience:'',
            skills: [],
            
        }
    }

    

    handleChange = (e) =>{
        this.setState({[e.target.name] : e.target.value})
    }

    handleDropChange =(e)=>{
        
        this.setState({
        jobTitle:e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            jobTitle:this.state.jobTitle,
            experience:this.state.experience,
            skills: this.state.skills
        }
         console.log(formData)
        axios.post('http://dct-application-form.herokuapp.com/users/application-form', formData)
            .then((response)=>{
                const userData = response.data
                this.setState({userData})
              
            })
            .catch((err)=>{
                alert(err.message)
            })
            this.props.history.push("/Jobs")
        }


    render(){
       
        return(
            <div>
                <h1>User Job Application</h1>
                <h4>Apply for job</h4>
                <form onSubmit = {this.handleSubmit} >
                    <label htmlFor="name">Full Name</label>
                        <input 
                            type = "text" 
                            value = {this.state.name} 
                            name = "name" 
                            
                            onChange = {this.handleChange}
                        /> <br/>

                    <label htmlFor="email">Email Address</label>
                        <input 
                            type = "text" 
                            value = {this.state.email} 
                            name = "email" 
                            placeholder="example@gmail.com"
                            onChange = {this.handleChange} 
                        /> <br/>
                    
                    <label htmlFor="phone">Contact Number</label>
                        <input 
                            type = "text" 
                            value = {this.state.phone} 
                            name = "phone" 
                            placeholder="+91 1234567890"
                            onChange = {this.handleChange} 
                        /> <br/>
                    
                    <label >Applying for job</label>
                        <select onChange={this.handleDropChange} >
                            <option>--Select--</option>
                            {
                                this.state.Title.map((jobs)=>{
                                    return <option key = {jobs}> {jobs} </option>
                                })
                            }
                        </select> <br/>

                        <label htmlFor="experience">Experience</label>
                            <input 
                                type = "text" 
                                value = {this.state.experience} 
                                name = "experience" 
                                placeholder="experience(2years,3months)"
                                onChange = {this.handleChange} 
                            /> <br/>

                        <label htmlFor="skills">Technical Skills</label><br/>
                            <textarea 
                                rows = "4" 
                                cols = "50" 
                                value = {this.state.skills} 
                                name = "skills" 
                                placeholder="Technical"
                                onChange = {this.handleChange} 
                                placeholder = "enter skills"
                            /> <br/>

                        <input type = "submit" />
                        
                </form>
                
            </div>
        )
    }
}

export default withRouter(JobForm)