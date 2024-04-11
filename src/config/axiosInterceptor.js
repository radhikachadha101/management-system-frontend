import axios from 'axios';
import { SET_LOADER, RESET_LOADER } from './actionNames';
export default function createInterceptors(store){
  let requestCount = 0;
  axios.interceptors.request.use(function (request) {  
      const token =localStorage.getItem("authToken");
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      ++requestCount;
      addLoader();
      return request;
    }, function (error) { 
      return Promise.reject(error);
    });
  
  axios.interceptors.response.use(function (response) {
      --requestCount;
      removeLoader();
      return response;
    }, function (error) {
      --requestCount;
      removeLoader();
      return Promise.reject(error);
  });

  function removeLoader(){
    if(requestCount === 0){
      store.dispatch({
        type: RESET_LOADER
      });
    }
  }

  function addLoader(){
    if(requestCount === 1){
      store.dispatch({
        type: SET_LOADER
      });
    }
  }
}


