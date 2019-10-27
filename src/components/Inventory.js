import React, { Component } from 'react';
import AddFishForm from './AddFishForm';
import base , {firebaseApp} from '../base';
import firebase from 'firebase';
import PropTypes from 'prop-types';

class Inventory extends Component {

    // state for authentication
	state = {
		uid : null,
		owner : null
    }
    
    // binding methods
    renderInventory = this.renderInventory.bind(this);
    handleChange = this.handleChange.bind(this);
    renderLogin = this.renderLogin.bind(this);
    authenticate = this.authenticate.bind(this);
    //authHandler = this.authHandler.bind(this);
    logOut = this.logOut.bind(this);

    componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
			  // User is signed in.
			  this.authenticate(null,{user})
			}
		  });
	}

    // logout(){
    //     base.unauth();
    //     this.setState({ uid: null })
    // }

    // Log Out methods
	logOut() {
		firebase.auth().signOut()
		.then(() => {
			// Sign-out successful.
			this.setState({uid:null})
		})
		.catch(error => console.log(error))
	}

    handleChange(e, key){
        const fish = this.props.fishes[key];
        // take a copy of that fish and update it with a new data
        const updatedFish = {...fish, [e.target.name]: e.target.value}
        this.props.updateFish(key, updatedFish);
    }


    // Authentication
	authenticate(provider) {
		const authProvider = new firebase.auth[`${provider}AuthProvider`]();
		firebaseApp.auth().signInWithPopup(authProvider)
		.then(authData => {
			// grab the store information
			const storeRef = firebase.database().ref(this.props.storeId)
			// query the firebase once for the store data
			storeRef.once('value', (snapshot) => {
				const data = snapshot.val() || {}
				// if no owner exitst, we'll claim it
				if(!data.owner) {
					storeRef.set({
						owner: authData.user.uid
					});
				}
				// update state according to firebase database
				this.setState({
					uid: authData.user.uid,
					owner:data.owner || authData.user.uid
				})
				localStorage.setItem('user', authData.user.uid)
			})
		})
		// if any error occoured
		.catch(error => console.log(error));
    }
    

    // Authentication
    // authenticate(provider){
    //     console.log(`Try to login ${provider}`);
    //     //base.authWithOAuthPopup(provider, this.authHandler);
    //     firebase.auth().signInWithPopup(provider)
        
    // }

    // authHandler(err, authData){
    //     console.log(authData);
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }

    //     // grab the store info
    //     const storeRef = base.database().ref(this.props.storeId);

    //     // query the firebase once for the store data
    //     storeRef.once('value', (snapshot) => {
    //         const data = snapshot.val() || {};

    //         // claim it as our own if there is no owner already
    //         if (!data.owner) {
    //             storeRef.set({
    //                 owner: authData.user.uid
    //             });
    //         }

    //         this.setState({
    //             uid: authData.user.uid,
    //             owner: data.owner || authData.user.uid
    //         });
    //     });
    // }

    // Log in Authentication
	renderLogin() {
		return(
			<nav className="login">
				<h2>Inventory</h2>
				<p>Sign in to manage your Inventory</p>
				<button className="facebook" onClick={()=> this.authenticate('facebook')}>Log in with facebook</button>
				<button className="github" onClick={()=> this.authenticate('github')}>Log in with github</button>
				<button className="google" onClick={()=> this.authenticate('email')}>Log in with email</button>
			</nav>
		)
	}

    renderInventory(key){
        const fish = this.props.fishes[key]
        return(
            <div className="fish-edit" key={key}>
                <input type="text" name="name" value={fish.name} placeholder="Fish name" onChange={(e) => this.handleChange(e, key)}/>
                <input type="text" name="price" value={fish.price} placeholder="Fish price" onChange={(e) => this.handleChange(e, key)}/>
                <select type="text" name="status" value={fish.status} placeholder="Fish status" onChange={(e) => this.handleChange(e, key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" name="desc" value={fish.desc} placeholder="Fish desc" onChange={(e) => this.handleChange(e, key)}></textarea>
                <input type="text" name="image" value={fish.image} placeholder="Fish image" onChange={(e) => this.handleChange(e, key)}/>

                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }

    render() {
        // log out button markup
		const logOut = <button onClick={this.logOut}>Log Out</button>
        // check if they are not ligged in at all
        if(!this.state.uid){
            return <div>{this.renderLogin()}</div>
        }

        // checking if store owner found or not !
		if(this.state.uid !== this.state.owner) {
			return (
				<div>
					<p> Sorry, You are not the Owner of this Store</p>
					{logOut}
				</div>
			)
        }
        
        return (
            <div>
                {logOut}
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish = {this.props.addFish}/>
                <button type="submit" onClick={this.props.loadSamples}>Load Sample Fishes </button>     
            </div>
        )
    }
}

Inventory.propTypes  = {
    fishes: PropTypes.object.isRequired,
    updateFish: PropTypes.func.isRequired,
    removeFish: PropTypes.func.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSamples: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired,
};

export default Inventory;
