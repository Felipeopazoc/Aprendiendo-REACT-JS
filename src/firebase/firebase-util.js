
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"

//SDK config

const config = {
    apiKey: "AIzaSyA68u2KcP6L-mhrrk1fqesfzsPhzC6R35Y",
    authDomain: "react-enero-fb-2cfb6.firebaseapp.com",
    projectId: "react-enero-fb-2cfb6",
    storageBucket: "react-enero-fb-2cfb6.appspot.com",
    messagingSenderId: "1048124528339",
    appId: "1:1048124528339:web:09ce2faf1ecfc080ca6626"
  };


firebase.initializeApp(config);
//Crear perfil de documento
export const createUserProfileDocument = async(userAuth,additionalData) =>{  
    if(!userAuth){
      return;
    }
    const userRef = firestore.doc(`users/${userAuth.uid}`); //Reference doc to specified path
    const snapShot = await userRef.get();//object
    
    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log("error creating user", error.message);
      }

    }

};

//exports
//Podremos usar estar variables globalmente en otros archivos
export const auth = firebase.auth();// Se inicializa la autenticación
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();//Buscamos el proveedor de google
provider.setCustomParameters({prompt: "select_account"});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
