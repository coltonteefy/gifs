import React, {Component} from 'react';
import '../styles/Previous-Gif.css';

class PreviousGifs extends Component {

    state = {
        prev: []
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.previous !== undefined) {
            this.setState({
                prev: [this.props.previous, ...this.state.prev]
            })
        }
    }

    saveGif(e) {
        console.log(e.currentTarget)
    }

    render() {
        return (
            <div className="previous-container">
                <button className="view-previous-btn"><i className="fas fa-archive"></i> </button>
                <div className="previous-list-container">
                    <img src="https://media.giphy.com/media/W2PcRKgR80TlC6El8D/giphy.gif" alt="" style={{height: "200px"}}/>
                    <ul className="previous-ul">
                        {
                            this.state.prev.map((link, index) => {
                                return (
                                    index < 15 &&
                                    <li key={index + link} onClick={this.saveGif}>
                                        <img src={link} alt="loading"/>
                                        <a href={link}>{link}</a>
                                        <i className="fas fa-heart heart-icon"/>
                                    </li>

                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default PreviousGifs;