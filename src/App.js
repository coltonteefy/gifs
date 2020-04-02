import React, {Component} from 'react';
import './App.css';
import ChangeCategory from "./components/Change-Category";
import PreviousGifs from "./components/Previous-Gifs";
import Rating from "./components/Rating";
import ToggleAPILocal from "./components/Toggle-API-Local";

const API_KEY = 'Zbt4XDP6iVfN4sF30tTLrLXS5tSkE5MN';
let timer = null;

class App extends Component {
    state = {
        currentGif: "",
        category: 'trippy',
        rating: 'PG-13',
        previousGifs: [],
        nextGif: [],
        source: "api",
        SEARCH_URL: `http://api.giphy.com/v1/gifs/random?rating=PG-13&api_key=${API_KEY}`
    };

    initialLoad = (search) => {
        const gif = fetch(search)
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.setState({
                    currentGif: data.data.image_original_url
                })
            })
            .catch(err => {
                console.log(err)
            });
    };

    fillGifsUp = async (search) => {
        const gif = await fetch(search)
            .then(res => {
                return res.json()
            })
            .then(data => {
                const obj = {
                    id: data.data.id,
                    title: data.data.title,
                    url: data.data.image_original_url,
                    preview: data.data.images.preview_gif.url
                };

                this.setState({
                    nextGif: [...this.state.nextGif, obj]
                })
            })
            .catch(err => {
                console.log(err)
            });
    };

    startTimer = () => {
        console.log("TIMER")
        timer = setInterval(() => {
            this.next();
        }, 3000);
    };


    componentDidMount() {
        this.initialLoad(this.state.SEARCH_URL)
        this.next();
        this.eventListener();
        this.startTimer();

        const fillNextGif = setInterval(() => {
            if(this.state.nextGif.length < 10) {
                this.fillGifsUp(this.state.SEARCH_URL)
            }
        }, 300);
    }

    componentWillUnmount() {
        clearInterval(timer);
    }

    changeCategory = (input) => {
        clearInterval(timer);
        this.setState({
            category: input,
            nextGif: [],
            SEARCH_URL: `http://api.giphy.com/v1/gifs/random?tag=${input}&rating=${this.state.rating}&api_key=${API_KEY}`
        }, () => {
            this.startTimer();
            this.next();
        });
    };

    next = () => {
        if(this.state.nextGif.length > 0) {
            if(this.state.previousGifs.length > 15) {
                let tmp = [...this.state.previousGifs];
                tmp.pop();
                this.setState({
                    previousGifs: [...tmp],
                })
            }

            let prev = this.state.nextGif[0];
            let update = [...this.state.nextGif];
            update.shift();

            this.setState({
                currentGif: this.state.nextGif[0].url,
                previousGifs: [prev, ...this.state.previousGifs],
                nextGif: [...update]
            })
        }

    };

    updateRating = (input) => {
        this.setState({
            rating: input,
            SEARCH_URL: `http://api.giphy.com/v1/gifs/random?tag=${this.state.category}&rating=${input}&api_key=${API_KEY}`
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
                        <PreviousGifs previous={this.state.previousGifs}/>
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
                {
                    this.state.nextGif.map((x, index) => {
                        return(
                            <img
                                src={x.url}
                                key={index + x.id}
                                alt="abc"
                                style={{ display: "none" }}
                            />
                        )
                    })
                }
            </div>
        );
    }
}

export default App;
