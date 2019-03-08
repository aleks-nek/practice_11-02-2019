import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN} from "../constants";

const request = (options) => {

    let headers = {
        'Content-Type': 'application/json',
    };

    if(localStorage.getItem(ACCESS_TOKEN)){
        headers = Object.assign({},
            headers,
            {'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
        );
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return new Promise((resolve, reject) => {
        axios(options)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
    });
};

export function registration(account) {
    return new Promise((resolve, reject) => {
        request({
            url: `${API_BASE_URL}/auth/signup`,
            method: 'post',
            data: account
        }).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            reject(error);
        });
    });
}

export function authentication(credentials) {
    return new Promise((resolve, reject) => {
        request({
            url: `${API_BASE_URL}/auth/signin`,
            method: 'post',
            data: credentials
        }).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            reject(error);
        });
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject('No request token set.')
    }

    return request({
        url: `${API_BASE_URL}/user/me`,
        method: 'get'
    })
}

export function getCountries() {
    return request({
        url: `${API_BASE_URL}/country`,
        method: 'get'
    })
}

export function getCompanyClients() {
    if(!localStorage.getItem(ACCESS_TOKEN)){
        return Promise.reject('No request token set.')
    }

    return request({
        url: `${API_BASE_URL}/clients`,
        method: 'get'
    })
}