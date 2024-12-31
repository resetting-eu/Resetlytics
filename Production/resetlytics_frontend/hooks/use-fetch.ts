
import { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { useServiceMutation } from '@redux/features/app/appApiSlice';
import { setService } from '@redux/features/app/appSlice';
import { toast } from 'react-toastify';

const apiFetch = { 
    getWithoutToken: async function (url: string): Promise<any> {
        
        //credentials: 'include',
        //headers: {
        //  'Authorization': 'Bearer ' + localStorage.getItem("access") 
        //}

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_HOST}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then((json) => {
                    //console.log('Response:', json);

                    resolve(json);

                    //var result = JSON.parse(JSON.stringify(json))
        

                })
                .catch((error => {
                    reject(error);
                }))
        })
    }
}

export default apiFetch;


            /*

const apiService = {
    get: async function (url: string, token: any): Promise<any> {
        //console.log('get', url);

        //const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },

    getWithoutToken: async function (url: string): Promise<any> {
      
        //credentials: 'include',
        //headers: {
        //  'Authorization': 'Bearer ' + localStorage.getItem("access") 
        //}

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then((json) => {
                    //console.log('Response:', json);

                    resolve(json);

                    //var result = JSON.parse(JSON.stringify(json))
        

                })
                .catch((error => {
                    reject(error);
                }))
        })
    },

    post: async function(url: string, data: any, token: any): Promise<any> {
        //console.log('post', url, data);

        //const token = await getAccessToken();

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
               

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },

    postWithoutToken: async function(url: string, data: any): Promise<any> {
        //console.log('post', url, data);

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((json) => {
             

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    }
}

*/

