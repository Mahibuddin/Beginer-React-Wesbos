import React, { Component } from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base , {firebaseApp} from '../base';
import firebase from 'firebase';
import PropTypes from 'prop-types';


class Inventory extends Component {

    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
        addFish: PropTypes.func
    };
    // state for authentication
	state = {
		uid : null,
		owner : null
    }
    
    

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            this.authHandler({ user });
          }
        });
      }

    

    authHandler = async authData => {
        // 1 .Look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, { context: this });
        console.log(store);
        // 2. Claim it if there is no owner
        if (!store.owner) {
          // save it as our own
          await base.post(`${this.props.storeId}/owner`, {
            data: authData.user.uid
          });
        }
        // 3. Set the state of the inventory component to reflect the current user
        this.setState({
          uid: authData.user.uid,
          owner: store.owner || authData.user.uid
        });
      };


      authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
          .auth()
          .signInWithPopup(authProvider)
          .then(this.authHandler);
      };
      
    
      logOut = async () => {
        console.log("Logging out!");
        await firebase.auth().signOut();
        this.setState({ uid: null });
      };



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
          return <Login authenticate={this.authenticate} />;
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


        // 3. They must be the owner, just render the inventory
    return (
        <div className="inventory">
          <h2>Inventory</h2>
          {logOut}
          {Object.keys(this.props.fishes).map(key => (
            <EditFishForm
              key={key}
              index={key}
              fish={this.props.fishes[key]}
              updateFish={this.props.updateFish}
              deleteFish={this.props.removeFish}
            />
          ))}
          <AddFishForm addFish={this.props.addFish} />
          <button onClick={this.props.loadSamples}>
            Load Sample Fishes
          </button>
        </div>
      );
    }
  }
        

export default Inventory;
