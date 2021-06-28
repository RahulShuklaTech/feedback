// Write firebase related methods here.
import firebase from "../firebaseConfig";


export const getDataFromFireStore = async (dbName) => {
    try {
   
    const ref =  firebase.firestore().collection(dbName);
    const values = await ref.get();
    const data = [];
    values.forEach( value =>{
        let obj = value.data();
        obj.id = value.data().id
        console.log(obj)
        data.push(obj)});
    return data
    }catch(e) {
        console.log("\n\n\nerorr",e.message)
    }
  
}


export const addDataToFirestore = async (dbName, data) => {
   
   
    const ref =  firebase.firestore().collection(dbName) 
    let documentRef = await ref.add(data)
    return documentRef
 }