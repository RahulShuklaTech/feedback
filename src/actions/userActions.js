import { addDataToFirestore, getDataFromFireStore } from "../api/firebaseMethods"

export const GET_USERS = "GET_USERS"
export const GOT_USERS = "GOT_USERS"

export const SET_USER ="SET_USER"

export const ADD_USER = "ADD_USER"
 
export const getUsers = () => {
    return {
        type: GET_USERS,
        
    }
}

export const gotUsers = (data) => {
    return {
        type: GOT_USERS,
        payload: data
        
    }
}






const addUser = (data) => {
    return {
        type: ADD_USER,
        payload: data
    }
}


export const setUserData = (data) => {
    return {
        type: SET_USER,
        payload: data
        
    }
}





export const getFromFireStore = (ref) => {
    
   
    return async function(dispatch,getState){
    
        dispatch(getUsers());
    
        try {
            const data = await getDataFromFireStore(ref)
            dispatch(gotUsers(data));
            
        }catch(e){
            console.log("error",e.message)
            // dispatch(errorGettingData())
        }
    }
}


export const addToFireStore = (ref,data) => {
    console.log("dfsdfdfsdf",ref,data)
    return async function(dispatch,getState){
        // dispatch(addingEmployee(data));
        try {
            await addDataToFirestore(ref,data);
            dispatch(setUserData(data));
            // dispatch(addCompany(data))
        }catch(e){
            // dispatch(errorAddingEmployee(e.message))
        }
    }
}
