import axios from 'axios';
const BASE_URI = 'http://localhost:8080/api'

const client = axios.create({
    baseURL: BASE_URI,
});

class APIClient {
    // constructor(accessToken) {
    //     this.accessToken = accessToken;
    // }
   
    getOnePlan(planId) {
        return this.perform('get', `/plan/${planId}`)
    }

    savePlan(planId, plan) {
        return this.perform('post', `/plan/${planId}/update`, plan)
    }

    async perform (method, resource, data) {
        return client({
            method,
            url: resource,
            data,
        }).then(res => {
            return res.data ? res.data : {};
        }).catch(e => {
            console.log(e)
            return 'error'
        })
    }
}

export default APIClient;