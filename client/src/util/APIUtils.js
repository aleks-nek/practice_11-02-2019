import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN} from "../constants";

const request = (options) => {

    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if(localStorage.getItem(ACCESS_TOKEN)){
        headers.append('Authorization', 'Bearer' + localStorage.getItem(ACCESS_TOKEN))
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