
import React from "react";
import {Switch,Route} from "react-router-dom";

import './App.css';
//Importar components 
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import Header from './components/header/header.component';

import {auth, createUserProfileDocument} from "./firebase/firebase-util";

class App extends React.Component{
    constructor(){
      super();
      this.state = {}//Propiedad de componente => props
    }

  unsuscribeFromAuth = null;  

//Tipos ciclos de vida: mount, update,unmount

componentDidMount(){
      this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
        if(userAuth){
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot =>{
              this.setState({
                 currentUser:{
                   id: snapShot.id,
                   ...snapShot.data()
                 }
              });
              console.log(this.state);
          });

        }
        this.setState({currentUser:userAuth})
      });
  }

  componentWillUnmount(){
     this.unsuscribeFromAuth();
  }

  render(){//Paso de propiedades -> props
    return (
      <div>
          <Header currentUser={this.state.currentUser}/>
          <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/shop" component={ShopPage}/>
              <Route path="/signin" component={SignInAndSignUpPage}/>
          </Switch>
      </div>
    );
  }

}

export default App;
