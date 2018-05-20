import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './map.css';
import { updateUser } from '../../actions/actionCreator';
import { connect } from 'react-redux';
import {getUser} from '../../services/user.services';
import axios from 'axios';

import GoogleMap from '../GoogleMap/GoogleMap';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.logout = this.logout.bind(this);
    }

    componentWillMount(){
        axios.get('/check').then(res => {
            console.log(res.data);
            this.props.updateUser(res.data[0]);
        })
    }

    logout() {
        this.props.updateUser({});
        console.log('loggin out...')
        axios.get('/logout').then( res => res);
    }

    render(){
        console.log(this.props.userInfo);
        return(
            <div className='map-wrap'>

                <header>
                    <nav>
                        <h3>FeelingSpace</h3>
                        <div>
                            <Link to='/home'><h4>Change Feeling</h4></Link>
                            <Link to='/' onClick={this.logout}><h4>Logout</h4></Link>
                        </div>
                    </nav>
                </header>

                <GoogleMap />

            </div>
        )
    }
}

function mapStateToProps(state){
    return state;
}

export default connect(mapStateToProps, {updateUser}) (Map);