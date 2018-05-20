import React, {Component} from 'react';
import { updateUser } from '../../actions/actionCreator';
import { connect } from 'react-redux';

import './login.css';

class Login extends Component {
    render(){
        return(
            <div className='login-wrap'>
                <header>
                    <h3>FeelingSpace</h3>
                </header>
                <div className='login-container'>
                    <h2>Login</h2>
                    <a href='http://localhost:8080/login'>
                        <button >Login With Facebook</button>
                    </a>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {updateUser}) (Login);