import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import bg from "../3023.jpg"

export default class HomeComponent extends Component {
    render() {
        return (
            <div  style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', height:"980px"}}>
                <div className="d-flex flex-column  align-items-center justify-content-center p-3 h-10" style={{ height: '40rem' }}>
                    <h1 class="display-4 mb-1 " style={{color: "white"}}>Welcome To</h1>
                    <h1 class="display-1 mb-1" style={{color: "white"}}>Library Managment</h1>
                    <h1 class="display-3 mb-1" style={{color: "white"}}>Web Application</h1>
                    <Link to='/search'><button type="button" class="btn btn-primary btn-lg mt-5">Get Started</button></Link>
                </div>
            </div>
        )
    }
}
