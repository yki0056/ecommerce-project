export const filterMenuStatus = (state=null, action) => {
    switch(action.type){
        case "FILT_STATUS": 
            state = action.payload
            return state
        default: 
            return state
    }
}

