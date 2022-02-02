import React, {Component} from 'react';
import './App.css';
import ChangeCategory from "./components/Change-Category";
import PreviousGifs from "./components/Previous-Gifs";
import Rating from "./components/Rating";
import ToggleResource from "./components/ToggleResource";

const API_KEY = 'Zbt4XDP6iVfN4sF30tTLrLXS5tSkE5MN';
let timer = null;
let fillNextGif;

class App extends Component {
    state = {
        currentGif: "",
        category: 'trippy',
        rating: 'PG-13',
        previousGifs: [],
        nextGif: [],
        SEARCH_URL: `http://api.giphy.com/v1/gifs/random?rating=PG-13&api_key=${API_KEY}`,
        resource: 'gifs'
    };

    loadNewGif = (search) => {
        const gif = fetch(search)
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                const obj = {
                    id: data.data.id,
                    title: data.data.title,
                    url: data.data.images.original.url,
                    preview: data.data.images.preview_gif.url
                };

                this.setState({
                    currentGif: obj,
                })
            })
            .catch(err => {
                console.log(err)
            });
    };

    fillGifsUp = async (search) => {
        if (this.state.nextGif.length < 25) {
            const gif = await fetch(search)
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    const obj = {
                        id: data.data.id,
                        title: data.data.title,
                        url: data.data.images.original.url,
                        preview: data.data.images.preview_gif.url
                    };

                    this.setState({
                        nextGif: [...this.state.nextGif, obj],
                    })
                })
                .catch(err => {
                    console.log(err)
                });
        }
    };

    startTimer = () => {
        timer = setInterval(() => {
            this.next();
        }, 10000);
    };


    componentDidMount() {
        this.loadNewGif(this.state.SEARCH_URL);
        this.next();
        this.eventListener();
        this.startTimer();

        fillNextGif = setInterval(() => {
            this.fillGifsUp(this.state.SEARCH_URL)
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(timer);
    }

    changeCategory = (input) => {
        this.setState({
            category: input,
            nextGif: [],
            SEARCH_URL: `http://api.giphy.com/v1/${this.state.resource}/random?tag=${input}&rating=${this.state.rating}&api_key=${API_KEY}`
        }, () => {
            this.loadNewGif(this.state.SEARCH_URL);
        });
    };

    next = () => {
        if (this.state.nextGif.length > 0) {
            if (this.state.previousGifs.length > 20) {
                let tmp = [...this.state.previousGifs];
                tmp.pop();
                this.setState({
                    previousGifs: [...tmp],
                })
            }

            let prev = this.state.currentGif;
            let update = [...this.state.nextGif];
            update.shift();

            this.setState({
                currentGif: this.state.nextGif[0],
                previousGifs: [prev, ...this.state.previousGifs],
                nextGif: [...update]
            })
        }

    };

    updateRating = (input) => {
        this.setState({
            rating: input,
            nextGif: [],
            SEARCH_URL: `http://api.giphy.com/v1/${this.state.resource}/random?tag=${this.state.category}&rating=${input}&api_key=${API_KEY}`
        }, () => {
            this.loadNewGif(this.state.SEARCH_URL)
        })
    };


    eventListener = () => {
        window.addEventListener('keydown', (e) => {
            if (e.code === "ArrowRight" || e.keyCode === 39) {
                this.next();
            }
        });
    };

    saveGifUpdatePrev = (updatedPreviousList) => {
        this.setState({
            previousGifs: [...updatedPreviousList]
        })
    };

    toggleResource = (resource) => {
        this.setState({
            resource: resource,
            nextGif: [],
            SEARCH_URL: `http://api.giphy.com/v1/${resource}/random?tag=${this.state.category}&rating=${this.state.rating}&api_key=${API_KEY}`
        }, () => {
            this.loadNewGif(this.state.SEARCH_URL)
        })
    };

    render() {
        return (
            <div className="App">
                <div className="controls">
                    <div className="left-side-selections">
                        <PreviousGifs previous={this.state.previousGifs} saveGifUpdatePrev={this.saveGifUpdatePrev}/>
                        <Rating updateRating={this.updateRating} rating={this.state.rating}/>
                        <ToggleResource source={this.state.resource} toggleResource={this.toggleResource}/>
                    </div>

                    <ChangeCategory category={this.state.category} changeCategory={this.changeCategory}/>

                    <div className="next-btn-section">
                        <button className="next-btn rainbow" onClick={this.next}>NEXT GIF</button>
                        <img src="https://media.giphy.com/media/Lo5vjpAi4G7JZNXI8D/giphy.gif" alt="" id="next-gif"/>
                    </div>
                </div>
                <img src={this.state.currentGif.url} alt="loading" id="image"/>
                {
                    this.state.nextGif.map((x, index) => {
                        return (
                            <img
                                src={x.url}
                                key={index + x.id}
                                alt="abc"
                                style={{display: "none"}}
                            />
                        )
                    })
                }
            </div>
        );
    }
}

export default App;
