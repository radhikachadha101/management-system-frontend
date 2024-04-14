import axios from 'axios';
import { LOGIN, LOGOUT, SIGNUP } from '../config/actionNames';
import { api } from '../config/env';
import { toast } from 'react-toastify';
export function login(payload) {
    return dispatch => {
        axios
            .post(`${api}login`, payload)
            .then(response => {
                dispatch({ type: LOGIN, payload: response.data });
                localStorage.setItem('authToken', response.data.token);
                toast.success('Login Successfull')
            })
            .catch(err => {
                toast.error('Login Failed')
            });
    };
}
export function register(payload) {
    return dispatch => {
        axios
            .post(`${api}signup`, payload)
            .then(response => {
                dispatch({ type: SIGNUP, payload: response.data });
                toast.success('SignUp Successfull')
            })
            .catch(err => {
                toast.error('SignUp Failed')
            });
    };
}
export function logout() {
    return dispatch => {
        dispatch({ type: LOGOUT });
        localStorage.removeItem('authToken');
        toast.success('Logout Successfull')
    };
}