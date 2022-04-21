
import produce from 'immer';
import { createStore } from 'redux';

export default class MainStore {
    _reduxTokenStore;
    static _mainStoreOb = null;

    constructor() {
        console.log('TokenStore class: Creating TokenStore object');
        this._reduxTokenStore = createStore(this.tokenStoreReducer);
    }

    tokenStoreReducer = (state, action) => {
        let nextState;
        switch (action.type) {
            /*case 'userDetails':

                return {
                    ...state,
                    userDetails: {
                        name: action.payload.name,
                        email: action.payload.email,
                        authority: action.payload.authority,
                        mobileNo: action.payload.authority,
                    },
                };*/
            case 'academyDetails':
                console.log('academyDetails');
                nextState = produce(state, draft => {
                    draft.academyDetails = action.payload;
                    //console.log(draft);
                });
                return nextState;
            case 'addIntoAcademyDetails':
                console.log('addIntoAcademyDetails');
                nextState = produce(state, draft => {
                    let flag = true;
                    draft.academyDetails.forEach(academy => {
                        if (academy.id === action.payload.id) {
                            flag = false;
                        }
                    });
                    if (flag) {
                        draft.academyDetails.push(action.payload);
                    }
                });
                return nextState;
            case 'deleteAcademyDetail':
                nextState = produce(state, draft => {
                    let i = -1;
                    for (const academy of draft.academyDetails) {
                        i++;
                        if (academy.id === action.payload) {
                            break;
                        }
                    }
                    if (i > -1) {
                        console.log('deleteAcademyDetail');
                        draft.academyDetails.splice(i, 1);
                    }
                });
                return nextState;
            case 'courseDetails':
                console.log('courseDetails');
                nextState = produce(state, draft => {
                    let load = action.payload;
                    //console.log(load);
                    draft.courseDetails = load;
                });
                return nextState;
            case 'deleteCourseDetail':
                nextState = produce(state, draft => {
                    let i = -1;
                    let load = action.payload;
                    for (const course of draft.courseDetails[load.academyId]) {
                        i++;
                        if (course.id === load.cardPropId) {
                            break;
                        }
                    }
                    if (i > -1) {
                        console.log('deleteCourseDetail');
                        draft.courseDetails[load.academyId].splice(i, 1);
                    }
                });
                return nextState;
            default:
                if (state === undefined) {
                    return {
                        userDetails: {
                            token: null
                        },
                        academyDetails: null,
                    }
                }
                return state;
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