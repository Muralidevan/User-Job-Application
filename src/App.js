import React from 'react' 
import {BrowserRouter,Route} from 'react-router-dom'
import Jobs from './components/Jobs'
import JobForm from './components/JobForm'
import FrontEnd from './tasks/FrontEnd'
import NodeJs from './tasks/NodeJs'
import MeanStack from './tasks/MeanStack'
import FullStack from './tasks/FullStack'
import './Modal.css'
import Modal from 'react-modal'
function App() {
    return (
        <BrowserRouter>
        <div>

        
          
         <Route path="/" component={JobForm} exact={true}/>
         <Route path = "/Jobs" component = {Jobs} exact={true} />

         <Route path="/FrontEnd" component={FrontEnd} exact={true}/>
        <Route path="/NodeJs" component={NodeJs} exact={true}/>
        <Route path="/MeanStack" component={MeanStack} exact={true}/>
        <Route path="/FullStack" component={FullStack} exact={true}/>


        

            
            
        </div>
        </BrowserRouter>
        
    )
}

export default App