import React, {Component} from 'react';
import './App.css';

// let random = `http://api.giphy.com/v1/gifs/random?tag=psychedelic&api_key=${API_KEY}&limit=20`;
// let search = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=psychedelic&limit=50&offset=0&rating=PG-13&lang=en`;
// PUBLIC_KEY = 'dc6zaTOxFJmzC';

let API_KEY = 'Zbt4XDP6iVfN4sF30tTLrLXS5tSkE5MN';
let random = `http://api.giphy.com/v1/gifs/random?tag=trippy&api_key=${API_KEY}&limit=20`;

function fetchData() {
    fetch(random)
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data)
            document.getElementById("image").src = data.data.image_url
        })
        .catch(err => {
            console.log(err)
        })
}

class App extends Component {

    myVar = setInterval(this.myTimer, 15000);

    async myTimer() {
        fetchData()

    }

    componentDidMount() {
        fetchData()
    }

    render() {
        return (
            <div className="App">
                <img  alt="image" id="image"/>
            </div>
        );
    }
}

export default App;