import React, {Component} from 'react';
import './App.css';
import ChangeCategory from "./components/Change-Category";

// let random = `http://api.giphy.com/v1/gifs/random?tag=psychedelic&api_key=${API_KEY}&limit=20`;
// let search = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=psychedelic&limit=50&offset=0&rating=PG-13&lang=en`;
// PUBLIC_KEY = 'dc6zaTOxFJmzC';

let API_KEY = 'Zbt4XDP6iVfN4sF30tTLrLXS5tSkE5MN';
let category = 'trippy';
let random = `http://api.giphy.com/v1/gifs/random?tag=${category}&api_key=${API_KEY}&limit=20`;

function fetchData(random) {
    fetch(random)
        .then(res => {
            return res.json()
        })
        .then(data => {
            document.getElementById("image").src = data.data.image_url
        })
        .catch(err => {
            console.log(err)
        })
}

class App extends Component {

    state = {
        category: 'trippy'
    };

    random = `http://api.giphy.com/v1/gifs/random?tag=${this.state.category}&api_key=${API_KEY}&limit=20`;

    myVar = setInterval(this.myTimer, 15000);

    async myTimer() {
        fetchData(random)
    }

    componentDidMount() {
        fetchData(random)
    }

    changeCategory = (input) => {
        console.log("inside change category", this.state.category)
         this.setState({
            category: input
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("HERE", this.state.category);
        random = `http://api.giphy.com/v1/gifs/random?tag=${this.state.category}&api_key=${API_KEY}&limit=20`;
        fetchData(random);
    }

    render() {
        return (
            <div className="App">
                <ChangeCategory category={this.state.category} changeCategory={this.changeCategory}/>
                <img  alt="image" id="image"/>
            </div>
        );
    }
}

export default App;