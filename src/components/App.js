import React , {Fragment} from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'

class App extends React.Component {
    render() {
        // comments here...
        return (
            <Fragment>
            <form action="" className="store-selector">
                { /* comments here... */}
                <h2>Please Fill The Box</h2>
                <input type="text" placeholder="Name"/>
                <button type="submit" >Send</button>
            </form>
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header age="5000" cool={true} tagline="Fresh Seafood Market" />
                </div>
                <Order />
                <Inventory />
                
            </div> 
            </Fragment>
        )
    }
}
export default App;



