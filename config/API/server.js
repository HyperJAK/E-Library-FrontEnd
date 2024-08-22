import axios from "axios";

export const ip = 'http://localhost:5227'
export const apiClient = axios.create({
    baseURL: ip,
    headers: {
        'Content-Type': 'application/json',
    },
});

let currentUser = null

export function setCurrentUser(object) {
    currentUser = object
}

export function getCurrentUser() {
    return currentUser
}