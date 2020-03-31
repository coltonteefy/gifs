import React, {Component} from 'react';
import './App.css';
import ChangeCategory from "./components/Change-Category";
import PreviousGifs from "./components/Previous-Gifs";
import Rating from "./components/Rating";
import ToggleAPILocal from "./components/Toggle-API-Local";

const API_KEY = 'Zbt4XDP6iVfN4sF30tTLrLXS5tSkE5MN';
let SEARCH_URL = `http://api.giphy.com/v1/gifs/random?tag=trippy&api_key=${API_KEY}`;

let timer;

class App extends Component {
    state = {
        category: 'trippy',
        rating: 'PG-13',
        previousGifs: [],
        loading: false,
        source: "api"
    };

    fetchData = (search) => {
        fetch(search)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data.data)
                document.getElementById("image").src = data.data.image_original_url;

                this.setState({
                    previousGifs: [...this.state.previousGifs, data.data.image_original_url],
                    loading: false
                })
            })
            .catch(err => {
                console.log(err)
            });
    };

    startTimer() {
        timer = setInterval(() => {
            this.fetchData(SEARCH_URL);
        }, 5000);
    }

    componentDidMount() {
        this.startTimer();
        this.fetchData(SEARCH_URL);
        this.eventListener();
    }

    changeCategory = (input) => {
        this.setState({
            category: input,
            loading: true
        }, () => {
            SEARCH_URL = `http://api.giphy.com/v1/gifs/random?tag=${this.state.category}&rating=${this.state.rating}&api_key=${API_KEY}`;
            this.fetchData(SEARCH_URL);
        });
    };

    next = () => {
        this.setState({
            loading: true
        }, () => {
            document.getElementById("image").src = "";
            this.fetchData(SEARCH_URL);
        });
    };

    updateRating = (input) => {
        this.setState({
            rating: input
        }, () => {
            SEARCH_URL = `http://api.giphy.com/v1/gifs/random?tag=${this.state.category}&rating=${this.state.rating}&api_key=${API_KEY}`;
        })
    };

    toggleSource = (input) => {
        this.setState({
            source: input
        }, () => {
            console.log("TODO: add local source")
        })
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
                {
                    this.state.loading &&
                    <div className="loading-screen">
                        <img src="https://media.giphy.com/media/LpKReA1uL35HmeZ8ge/giphy.gif" alt="" className="spinning-character"/>
                        <img src="https://media.giphy.com/media/STfIgB6cQYmolkJAvG/giphy.gif" alt="" className="load-bar"/>
                        <h2>LOADING</h2>
                    </div>
                }
                <div className="controls">
                    <div className="left-side-selections">
                        <PreviousGifs previous={this.state.previousGifs[this.state.previousGifs.length - 1]}/>
                        <Rating updateRating={this.updateRating} rating={this.state.rating}/>
                        <ToggleAPILocal source={this.state.source} toggleSource={this.toggleSource}/>
                    </div>

                    <ChangeCategory category={this.state.category} changeCategory={this.changeCategory}/>

                    <div className="next-btn-section">
                        <button className="next-btn rainbow" onClick={this.next}>NEXT GIF</button>
                        <img src="https://media.giphy.com/media/Lo5vjpAi4G7JZNXI8D/giphy.gif" alt="" id="next-gif"/>
                    </div>
                </div>
                <img alt="loading" id="image"/>
            </div>
        );
    }
}

export default App;

/*
https://media.giphy.com/media/feN0YJbVs0fwA/giphy.gif
https://media.giphy.com/media/11z8xTBzFylZ60/giphy.gif
https://media.giphy.com/media/r09BeWEk9JZL2/giphy.gif
https://media.giphy.com/media/STfIgB6cQYmolkJAvG/giphy.gif
* */