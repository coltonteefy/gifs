import React, {Component} from 'react';
import '../styles/Previous-Gif.css';

class PreviousGifs extends Component {

    state = {
        prev: [],
        savedGifs: JSON.parse(localStorage.getItem("savedGifs")),
        currentSection: "archived"
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.previous !== undefined) {
            this.setState({
                prev: [this.props.previous, ...this.state.prev]
            })
        }
    }

    saveGif = (e) => {
        let saveData = {};
        let prev = [];
        this.state.prev.filter(data => {
            if(data.id === e.target.id) {
                saveData = data;
            } else {
                prev.push(data);
            }
        });

        let id = e.target.id;
        document.getElementById(id).classList.add("saved");

        this.setState({
            prev: [...prev],
            savedGifs: [...this.state.savedGifs, saveData],
        }, () => {
            localStorage.setItem("savedGifs", JSON.stringify(this.state.savedGifs))
        })


    };

    heartColor = (id) => {
        if (this.state.savedGifs.includes(id)) {
            return <i className="fas fa-heart heart-icon saved" id={id}/>
        }

        return <i className="fas fa-heart heart-icon" id={id}/>
    };

    toggleSavedArchive = (e) => {
        let archived = document.getElementById("archived-btn");
        let saved = document.getElementById("saved-btn");

        let archSection = document.getElementById("archived-section");
        let savedSection = document.getElementById("saved-section");

        if (e.target.innerHTML === "ARCHIVED") {
            archived.classList.add("previous-selected");
            saved.classList.remove("previous-selected");
            this.setState({
                currentSection: "archived"
            })
        } else {
            archived.classList.remove("previous-selected");
            saved.classList.add("previous-selected");
            this.setState({
                currentSection: "saved"
            })
        }
    };

    toggleSections() {
        if (this.state.currentSection === "archived") {
            return (
                <section id="archived-section">
                    <ul className="previous-ul">
                        {
                            this.state.prev.map((objData, index) => {
                                return (
                                    index < 15 &&
                                    <li key={index + objData.id} onClick={this.saveGif}>
                                        <img src={objData.preview} alt="loading"/>

                                        {
                                            this.heartColor(objData.id)
                                        }
                                    </li>

                                )
                            })
                        }
                    </ul>
                </section>
            )
        } else {
            return (
                <section id="saved-section">
                    <ul className="saved-ul">
                        {
                            this.state.savedGifs.map((objData, index) => {
                                return(
                                    <li key={index + objData.id}>
                                        <img src={objData.preview} alt="loading"/>
                                    </li>
                                )
                            })
                        }
                    </ul>

                </section>
            )
        }
    }

    render() {
        return (
            <div className="previous-container">
                <button className="view-previous-btn">
                    <i className="fas fa-archive"> </i> archived
                </button>
                <div className="previous-list-container">
                    <img src="https://media.giphy.com/media/W2PcRKgR80TlC6El8D/giphy.gif" alt="throw back"
                         id="throwback"/>
                    <div className="save-archive-toggle" onClick={this.toggleSavedArchive}>
                        <h3 id="archived-btn" className="previous-selected">ARCHIVED</h3>
                        <h3 id="saved-btn">SAVED</h3>
                    </div>
                    <div className="archived-body-section">
                        {
                            this.toggleSections()
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PreviousGifs;
