import React, {Component} from 'react';
import './App.css';

import { Carousel } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'

// random = 'http://api.giphy.com/v1/gifs/random?tag=psychedelic&api_key=' + this.API_KEY + '&limit=20';
// search = 'https://api.giphy.com/v1/gifs/search?api_key=' + this.API_KEY + '&q=psychedelic&limit=50&offset=0&rating=PG-13&lang=en'
// PUBLIC_KEY = 'dc6zaTOxFJmzC';

let gifStore = [];
let API_KEY = 'use_your_api_key';
let random = `http://api.giphy.com/v1/gifs/random?tag=psychedelic&api_key=${API_KEY}&limit=20`;
let search = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=psychedelic&limit=50&offset=0&rating=PG-13&lang=en`;
let gifStorePosition = 0;

const gf = new GiphyFetch(API_KEY)
const fetchGifs = (offset) => gf.search("trippy",{ offset, limit: 1000 });


class App extends Component {

    myVar = setInterval(this.myTimer, 13000);

    state = {
        data: gifStore
    };

    async fetchData() {
        await fetch(search)
            .then(async res => {
                return res.json();
            })
            .then((data) => {
                data.data.map((info, index) => {
                    this.setState({
                        data: [...this.state.data, info.url]
                    })
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.fetchData();
    }


    async myTimer() {
        if(document.querySelector(".giphy-carousel").childNodes.item(gifStorePosition)) {
            let child = document.querySelector(".giphy-carousel").childNodes.item(gifStorePosition);
            child.style.zIndex = 1;
            child.style.position = "absolute";
        }
        gifStorePosition++;
    }


    render() {
        return (
            <div className="App">
                <Carousel gifHeight={500} gutter={1} fetchGifs={fetchGifs} />
            </div>
        );
    }
}

export default App;