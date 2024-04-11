import axios from 'axios';
import { CREATE_COMMENT,GET_COMMENTS } from '../config/actionNames';
import { api } from '../config/env';
import { toast } from 'react-toastify';
const PATH = `${api}api/comments`;

export const getComments = async (params) => {

    try {
     const response = await axios.get(`${PATH}`, { params })
     if(response.status == 200) {
        return response;
     }else{
          toast.success('Error fetching comments')
     }
    } catch (error) {
        toast.success('Error fetching comments')
    }
}

export const getUnreadComments = async (params) => {
   
    try {
     const response = await axios.get(`${PATH}/unreadComments`, { params })
     if(response.status == 200) {
        return response;
     }else{
          toast.success('Error fetching comments')
     }
    } catch (error) {
        toast.success('Error fetching comments')
    }
}

export const addComment = async (payload) =>  {
    try {
      const response = await axios.post(`${PATH}`, payload);
      if(response.status === 200){
      return response;
      }else{
        toast.success('Error adding comment')
      }
    } catch (error) {
        toast.error('Error adding comment')

    }

}


export const updateComment = async (id,payload) =>  {
    try {
    const response = await axios.put(`${PATH}/${id}`, payload)
      if(response.status == 200) {
        return response;
     }else{
         throw new Error('');
     }
    } catch (error) {

    }

}
