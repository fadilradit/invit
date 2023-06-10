import React, {Component} from "react";
import {Link} from 'react-router-dom'

import './Home.css'

class Home extends Component{

    render(){
        return(
            <div className = "home" >
                <h1>Welcome </h1>
                <Link to = '/dashboard' className = "link" >Go To Dashboard</Link>
            </div>
        )
    }

}

export default Home;