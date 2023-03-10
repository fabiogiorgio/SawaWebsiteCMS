import {IS_USER_AUTHENTICATED, GET_USERNAME, GET_ID } from "../storeconstants";

export default {
    [IS_USER_AUTHENTICATED](state) {
        return state.authenticated;
    },

    [GET_USERNAME](state) {
        return state.username;
    },

    [GET_ID](state) {
        return state.id;
    }
}