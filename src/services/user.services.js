import axios from 'axios';

const baseURL = '/api/users';

function getUser(body) {
    return axios
        .get(`${baseURL}/get`, body)
        .then( res => res )
        .catch( err => {throw err} );
}

function updateUser( id, body ) {
    return axios
        .put(`${baseURL}/update/${id}`, body)
        .then( res => res )
        .catch( err => {throw err} );
}

function updateFeeling(id, body) {
    return axios
        .put(`${baseURL}/feeling/${id}`, body)
        .then( res => res )
        .catch( err => {throw err} );
}

export {
    getUser,
    updateUser,
    updateFeeling
};