import axios from 'axios';

const client = axios.create({
    baseURL: '/',
    withCredentials: true
});

class APIClient {
    constructor() {
        this.token = null;
    }

    setToken(token) {
        this.token = token;
    }

    getCoursesBySubject(subject) {
        return this.perform('get', `/api/course/${encodeURIComponent(subject)}`)
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

    saveSettings(planId, settings) {
        return this.perform('put', `/api/plan/${planId}/settings`, settings)
    }

    copyPlan(planId, plan) {
        return this.perform('post', `/api/plan/${planId}/copy`, plan)
    }

    createUser(user) {
        return this.perform('post', `/user/create`, user)
    }

    deleteUser() {
        return this.perform('delete', `/user/delete`);
    }

    getUserProfile() {
        return this.perform('get', `/user`);
    }

    async perform (method, resource, data) {
        if (this.token)
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
                // console.log(`${method} ${resource} caused:\n ${e}`);
                return 'error'
            })
    }
}

export default APIClient;