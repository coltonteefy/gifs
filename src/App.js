import React, {Component} from 'react';
import './App.css';
import ChangeCategory from "./components/Change-Category";
import PreviousGifs from "./components/Previous-Gifs";

const API_KEY = 'Zbt4XDP6iVfN4sF30tTLrLXS5tSkE5MN';
let SEARCH_URL = `http://api.giphy.com/v1/gifs/random?tag=trippy&api_key=${API_KEY}&limit=20`;

let myVar;

class App extends Component {
    state = {
        category: 'trippy',
        rating: 'PG-13',
        previousGifs: []
    };

    fetchData = (search) => {
        fetch(search)
            .then(res => {
                return res.json()
            })
            .then(data => {
                document.getElementById("image").src = data.data.image_url;

                this.setState({
                    previousGifs: [...this.state.previousGifs, data.data.image_url]
                })
            })
            .catch(err => {
                console.log(err)
            });
    };

    startTimer() {
        myVar = setInterval(() => {
            console.log("START TIMER")
            this.fetchData(SEARCH_URL);
        }, 5000);
    }

    componentDidMount() {
        this.startTimer();
        this.fetchData(SEARCH_URL)
        this.eventListener();
    }

    changeCategory = (input) => {
        this.setState({
            category: input
        }, () => {
            SEARCH_URL = `http://api.giphy.com/v1/gifs/random?tag=${this.state.category}&rating=${this.state.rating}&api_key=${API_KEY}&limit=20`;
            this.fetchData(SEARCH_URL);
            document.getElementById("image").src = "";
        });
    };

    next = () => {
        document.getElementById("image").src = "";
        this.fetchData(SEARCH_URL);
    };

    eventListener = () => {
        window.addEventListener('keydown', (e) => {
            if (e.code === "ArrowRight" || e.keyCode === 39) {
                this.next();
            }
        });
    };


    render() {
        return (
            <div className="App">
                <div className="controls">
                    <PreviousGifs previous={this.state.previousGifs[this.state.previousGifs.length - 1]}/>
                    <ChangeCategory category={this.state.category} changeCategory={this.changeCategory}/>
                    <button className="next-btn" onClick={this.next}>NEXT GIF</button>
                </div>
                <img alt="loading" id="image"/>
            </div>
        );
    }
}

export default App;