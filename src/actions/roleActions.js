import axios from 'axios';
import { GET_ROLES, USER_ACTION_PERFORMED  } from '../config/actionNames';
import { api } from '../config/env';
import { toast } from 'react-toastify';
const PATH = `${api}api/userGroup    `;
function userActionPerformed(dispatch) {
    setTimeout(()=>{
        dispatch({ type: USER_ACTION_PERFORMED });
    }, 500)
}
export function getRoles() {
    return dispatch => {
        axios
            .get(`${PATH}`)
            .then(response => {
                dispatch({ type: GET_ROLES, payload: response.data });
            })
            .catch(err => {
            });
    };
}