import localforage from "localforage";

export default class Database {

    static setToken(token) {
        return localforage.setItem('token', token);
    }

    static getToken() {
        return localforage.getItem('token');
    }

    static setCurrUserEmail(email) {
        return localforage.setItem('currUseremail', email);
    }

    static getCurrUserEmail() {
        return localforage.getItem('currUseremail');
    }

    static setUserId(id) {
        return localforage.setItem('userId', id);
    }

    static getUserId() {
        return localforage.getItem('userId');
    }

    static setAuthority(auth) {
        return localforage.setItem('auth', auth);
    }

    static getAuthority() {
        return localforage.getItem('auth');
    }
}