import axios from 'axios';
const BASE_URI = 'http://localhost:8080/'

const client = axios.create({
    baseURL: BASE_URI,
    withCredentials: true
});

class APIClient {
    constructor() {
        this.token = null;
    }

    setToken(token) {
        this.token = token;
    }

    createPlan(plan) {
        return this.perform('post', `/api/plan/create`, plan)
    }

    getOnePlan(planId) {
        return this.perform('get', `/api/plan/${planId}`)
    }

    savePlan(planId, plan) {
        return this.perform('put', `/api/plan/${planId}/update`, plan)
    }

    deletePlan(planId) {
        return this.perform('delete', `/api/plan/${planId}/delete`)
    }

    copyPlan(planId, plan) {
        return this.perform('post', `/api/plan/${planId}/copy`, plan)
    }

    createUser(user) {
        return this.perform('post', `/user/${user.uid}/create`, user)
    }

    getUserProfile() {
        return this.perform('get', `/user`);
    }

    async perform (method, resource, data) {
        return client({
            method,
            url: resource,
            data,
            headers: {
                id_token: this.token,
            },
        }).then(res => {
            return res.data ? res.data : {};
        }).catch(e => {
            console.log(`${method} ${resource} caused:\n ${e}`);
            return 'error'
        })
    }
}

export default APIClient;