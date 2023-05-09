export const userReducer = (state=[], action) => {
    //const db = getFirestore();
    switch(action.type){
        case "SIGNED_IN_REQUEST":
            return [] 
        case "SIGNED_IN_SUCESS":
            return action.payload
        case "SIGNED_IN_SUCESS_NO_PROFILE":
            return  action.payload
        case "SIGNED_IN_FAIL":
            return null
        case "SIGNED_OUT_STATE":
            return null
        default:
            return state;
    }
}