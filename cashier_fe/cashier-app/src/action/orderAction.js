export const addItems = (data) => {
    return{
        type: "ADD_ITEMS",
        payload: data
    }
}
export const updateItems = (data) => {
    return{
        type: "ADD_ITEMS",
        payload: data
    }
}

export const deleteItems = (data) => {
    return{
        type: "DELETE_ITEMS",
        payload: data
    }
}
export const checkOut = () => {
    return{
        type: "CHECK_OUT"
    }
}
export const cancel = () => {
    return{
        type: "CANCEL"
    }
}