import React, {Component} from 'react';
import './App.css';
import ChangeCategory from "./components/Change-Category";
import PreviousGifs from "./components/Previous-Gifs";
import Rating from "./components/Rating";
import ToggleAPILocal from "./components/Toggle-API-Local";

const API_KEY = 'Zbt4XDP6iVfN4sF30tTLrLXS5tSkE5MN';
let SEARCH_URL = `http://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;

let timer = null;

//images.preview_gif.url
//image_original_url
//id
//title

class App extends Component {
    state = {
        currentGif: "",
        category: 'trippy',
        rating: 'PG-13',
        previousGifs: [],
        source: "api"
    };

    fetchData = (search) => {
        fetch(search)
            .then(res => {
                return res.json()
            })
            .then(data => {
                // console.log(data.data);
                const obj = {
                    id: data.data.id,
                    title: data.data.title,
                    url: data.data.image_original_url,
                    preview: data.data.images.preview_gif.url
                };

                this.setState({
                    previousGifs: [...this.state.previousGifs, obj],
                    currentGif: data.data.image_original_url
                })
            })
            .catch(err => {
                console.log(err)
            });
    };

    startTimer = () => {
        timer = setInterval(() => {
            this.fetchData(SEARCH_URL);
        }, 10000);
    };

    restartTimer = () => {
        clearInterval(timer);
        this.startTimer();
    };

    componentDidMount() {
        this.fetchData(SEARCH_URL);
        this.eventListener();
        this.startTimer();
        console.log("LOCAL APP", JSON.parse(localStorage.getItem("savedGifs")))
    }

    changeCategory = (input) => {
        this.setState({
            category: input,
        }, () => {
            SEARCH_URL = `http://api.giphy.com/v1/gifs/random?tag=${this.state.category}&rating=${this.state.rating}&api_key=${API_KEY}`;
            this.fetchData(SEARCH_URL);
        });
    };

    next = () => {
        this.fetchData(SEARCH_URL);
        clearInterval(timer);
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
                <img src={this.state.currentGif} alt="loading" id="image"/>
            </div>
        );
    }
}

export default App;
