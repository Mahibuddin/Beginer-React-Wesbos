import React  from 'react'
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes.js';
import Fish from './Fish.js';


class App extends React.Component {
    // get initial state
    state = {
        fishes: {},
        order: {}

    }
    addFish = this.addFish.bind(this);
    loadSamples = this.loadSamples.bind(this);
    addToOrder = this.addToOrder.bind(this);

    addFish(fish) {
        // update our state
        const fishes = {...this.state.fishes};
        // add in our new fishes
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        // set our state
        this.setState({fishes});
    }

    loadSamples(){
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder(key){
        // take a copy of our state
        const order = {...this.state.order};
        // Add or Update the new number of Fish Order
        order[key] = order[key] + 1 || 1;
        // update our order
        this.setState({order})
    }

    render() {
        // comments here...
        return (
            <div>
                <div className="catch-of-the-day">
                    <div className="menu">
                        <Header age="5000" cool={true} tagline="Fresh Seafood Market" />
                        <ul className="list-of-fishes">
                            {
                                Object
                                .keys(this.state.fishes)
                                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder = {this.addToOrder} />)
                            }
                        </ul>
                    </div>
                    <Order fishes={this.state.fishes} order={this.state.order} />
                    <Inventory addFish = {this.addFish} loadSamples = {this.loadSamples} />
                </div> 
            </div>
        ) 
    }
}
export default App;



