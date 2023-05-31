const INITIAL_STATE = {
    items: JSON.parse(localStorage.getItem('add_item')) || [],
    totalPrice: 0,
    note: ''
}

export const orderCartReducer = (state= INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_ITEMS":
            return {...state, items: [...action.payload], totalPrice: action.payload.reduce((a,c) => a + c.qty * c.price, 0)}
        case "DELETE_ITEMS":
            return {...state, items: [...action.payload], totalPrice: state.items.reduce((a,c) => a + c.qty * c.price, 0)}
        case "CANCEL":
            return {...state, items: [], totalPrice: 0};
        case "ADD_NOTE":
            return {...state, note: action.payload};
        case "DELETE_NOTE":
            return state;
        case "CHECK_OUT":
            return state;
        default:
            return state;
    }
}