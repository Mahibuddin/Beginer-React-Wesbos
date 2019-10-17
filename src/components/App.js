import React  from 'react'
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import StorePicker from './StorePicker';


class App extends React.Component {
    render() {
        // comments here...
        return (
            <div>
                <StorePicker />

                <div className="catch-of-the-day">
                    <div className="menu">
                        <Header age="5000" cool={true} tagline="Fresh Seafood Market" />
                    </div>
                    <Order />
                    <Inventory />
                </div> 
            </div>
        )
    }
}
export default App;



