import {
    LOAD_USER_BEGIN,
    LOAD_USER_SUCCESS,
    LOAD_USER_ERROR,

    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    
    LOGOUT_USER_BEGIN,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_ERROR,
} from "./actions";

import { initialState } from "./appContext";

function reducer(state, action) {
    switch (action.type) {
        case LOAD_USER_BEGIN: {
            return {
                ...state,
                isLoading: true
            }
        }
        case LOAD_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                showAlert: false,
            }
        }
        case LOAD_USER_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        }
        case LOGIN_USER_BEGIN: {
            return {
                ...state,
                isLoading: true
            }
        }
        case LOGIN_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                user: action.payload.user,
                email: action.payload.email,
                showAlert: false,
            }
        }
        case LOGIN_USER_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        }
        case LOGOUT_USER_BEGIN: {
            return {
                ...state,
                isLoading: true
            }
        }
        case LOGOUT_USER_SUCCESS: {
            return {
                ...state,
                user: null,
                email: null,
                isLoading: false,
                showAlert: false,
            }
        }
        case LOGOUT_USER_ERROR: {
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                alertType: 'danger',
                alertText: action.payload.msg
            }
        }
        default: {
            throw new Error(`no such action : ${action.type}`);
        }
    }
}

export default reducer