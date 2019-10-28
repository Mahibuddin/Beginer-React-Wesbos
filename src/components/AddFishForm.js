
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';

class AddFishForm extends Component {

    createFish(event){
        event.preventDefault();
        console.log("Gonna make some Fish! ");
        const fish = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            desc: this.des.value,
            image: this.image.value,
        }
        this.props.addFish(fish);
        this.fishForm.reset();
        
        
    }

    // Upload Image Files
    uploadFile = async e => {
        // grab the targeted files
        const files = e.target.files;
        // JavaScript FormData
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "sickfits");
        // connecting with Cloudinary API
        const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwmcbei5m/image/upload",
        {
            method: "POST",
            body: data
        }
        );
        // fetching data from cloudinary and convert it to JSON
        const file = await res.json();
        console.log(file);
        // Update State
        this.setState({
        image: file.secure_url
        });
    };

    render() {
        return (
            <form action="" ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={(e) => this.createFish(e)}>
                <input ref={(input) => this.name = input} type="text" placeholder="Fish Name"/>
                <input ref={(input) => this.price = input} type="text" placeholder="Fish Price"/>
                <select ref={(input) => this.status = input}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea ref={(input) => this.des = input} placeholder="Fish Desc"></textarea>
                <input ref={(input) => this.image = input} type="file" name="file" className="file-upload" data-cloudinary-field="image"
                data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}" placeholder="Fish Image"/>

                <div className="center">
                    <button type="submit">+ Add Item</button>
                </div>
            </form>
        )
    }
}

AddFishForm.propTypes = {
    addFish: PropTypes.func.isRequired
}


export default AddFishForm;
