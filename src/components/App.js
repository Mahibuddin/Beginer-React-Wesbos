import React  from 'react'
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';


class App extends React.Component {
    // get initial state
    state = {
        fishes: {},
        order: {}

    }
    addFish = this.addFish.bind(this);
    addFish(fish) {
        // update our state
        const fishes = {...this.state.fishes};
        // add in our new fishes
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        // set our state
        this.setState({fishes});
    }

    render() {
        // comments here...
        return (
            <div>
                <div className="catch-of-the-day">
                    <div className="menu">
                        <Header age="5000" cool={true} tagline="Fresh Seafood Market" />
                    </div>
                    <Order />
                    <Inventory addFish = {this.addFish} />
                </div> 
            </div>
        )
    }
}
export default App;



