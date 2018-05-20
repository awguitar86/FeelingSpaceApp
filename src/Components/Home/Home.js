import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { updateUser } from '../../actions/actionCreator';
import {updateFeeling} from '../../services/user.services';
import { connect } from 'react-redux';
import axios from 'axios';

import './home.css';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            feeling: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentWillMount(){
        axios.get('/check').then(res => {
            console.log(res.data);
            this.props.updateUser(res.data[0]);
        })
    }

    handleChange(e){
        let newState = e.target.value;
        this.setState({ feeling: newState })
        console.log(e.target.value);
    }


    handleSubmit(){
        const id = 1;
        const reqBody = {
            feeling: this.state.feeling
        };
        updateFeeling( id, reqBody )
            .then( res => {
                if( res.status !== 200 ) {
                    console.log(res);
                }
            })
            .catch( err => {throw err})
    }

    logout() {
        this.props.updateUser({});
        console.log('loggin out...')
        axios.get('/logout').then( res => res);
    }

    render(){
        console.log(this.state);
        console.log(this.props.userInfo);
        return(
            <div className='home-wrap'>
                <header>
                    <nav>
                        <h3>FeelingSpace</h3>
                        <Link to='/' onClick={this.logout}><h4>Logout</h4></Link>
                    </nav>
                </header>
                <p>How are you feeling today?</p>
                <div className='feelings'>
                    <button className='happy' value='happy' onClick={ e => {this.handleChange(e) }}>Happy</button>
                    <button className='sad' value='sad' onClick={ e => {this.handleChange(e) }}>Sad</button>
                    <button className='angry' value='angry' onClick={ e => {this.handleChange(e) }}>Angry</button>
                    <button className='disgusted' value='disgusted' onClick={ e => {this.handleChange(e) }}>Disgusted</button>
                    <button className='afraid' value='afraid' onClick={ e => {this.handleChange(e) }}>Afraid</button>
                </div>
                <Link to='/map' className='submit'>
                    <button onClick={this.handleSubmit}>SUBMIT</button>
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {updateUser}) (Home);