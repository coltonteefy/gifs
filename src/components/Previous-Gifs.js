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

    render() {
        return (
            <div className="previous-container">
                <button className="view-previous-btn">PREVIOUS LIST</button>
                <div className="previous-list-container">
                    <ul className="previous-ul">
                        {
                            this.state.prev.map((link, index) => {
                                return (
                                    index < 15 &&
                                    <li key={index + link}>
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