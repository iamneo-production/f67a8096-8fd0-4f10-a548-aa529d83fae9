import { createStore } from 'redux';

export default class MainStore {
    _reduxTokenStore;
    static _mainStoreOb = null;

    constructor() {
        console.log('TokenStore class: Creating TokenStore object');
        this._reduxTokenStore = createStore(this.tokenStoreReducer);
    }

    tokenStoreReducer = (state, action) => {
        /*
        token: action.payload.token ?? null,
                name: action.payload.name ?? null,
                email: action.payload.email ?? null,
                authority: action.payload.authority ?? null,
                mobileNo: action.payload.authority ?? null,
        */
        if (action.type === 'userDetails') {
            return {
                userDetails: {
                    token: action.payload.token,
                    name: action.payload.name,
                    email: action.payload.email,
                    authority: action.payload.authority,
                    mobileNo: action.payload.authority,
                }
            };
        }
    }

    static get store() {
        if (MainStore._mainStoreOb === null) {
            MainStore._mainStoreOb = new MainStore();
            return MainStore._mainStoreOb._reduxTokenStore;
        }
        return MainStore._mainStoreOb._reduxTokenStore;
    }
}