const INITIAL_STATE = {
    id: 0,
    email: "",
    username: "",
    password: "",
    fullname: "",
    phoneNumber: "",
    address: "",
    role: "",
    isDelete: 0,
    isSuspended: 0

}

export const userReducer = (state = INITIAL_STATE, action ) =>{
    switch (action.type) {
        case `LOGIN_SUCCESS`:
            return {...state, ...action.payload};
        case `LOGOUT_SUCCESS`:
            return state;
        default:
            return state;
    }
}
