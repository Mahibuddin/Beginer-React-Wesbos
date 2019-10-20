import React, { Component} from 'react'
import { getFunName } from '../helpers'

class StorePicker extends Component {

  
  goToStore(event){
    event.preventDefault()
    console.log('You Changed the URl');
    // first grab the text from then box
    // second we are going to transition from / to / store / :storeID
    const storeId = this.storeInput.value

    this.props.history.push(`store/${storeId}`)

    
  }

  render() {
    // Any where else
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        <h2>Please Enter A Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}} />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}


export default StorePicker;


