import axios from 'axios';
const BASE_URI = 'http://localhost:8080/'

const client = axios.create({
    baseURL: BASE_URI,
});

class APIClient {
    // constructor(accessToken) {
    //     this.accessToken = accessToken;
    // }
   
    createPlan(plan) {
        return this.perform('post', `/api/plan/create`, plan)
    }

    getOnePlan(planId) {
        return this.perform('get', `/api/plan/${planId}`)
    }

    savePlan(planId, plan) {
        return this.perform('post', `/api/plan/${planId}/update`, plan)
    }

    deletePlan(planId) {
        return this.perform('post', `/api/plan/${planId}/delete`)
    }

    createUser(user) {
        return this.perform('post', `/user/${user.uid}/create`, user)
    }

    getUserProfile(userId) {
        return this.perform('get', `/user/${userId}`);
    }

    async perform (method, resource, data) {
        return client({
            method,
            url: resource,
            data,
        }).then(res => {
            return res.data ? res.data : {};
        }).catch(e => {
            console.log(`${method} ${resource} caused:\n ${e}`);
            return 'error'
        })
    }
}

export default APIClient;