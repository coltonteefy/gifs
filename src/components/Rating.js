import React, {Component} from 'react';
import '../styles/Rating.css';

class Rating extends Component {

    rating = ["G", "PG", "PG-13", "R"];

    updateRating = (e) => {
        this.props.updateRating(e.target.innerHTML)
    };

    render() {
        return (
            <div className="rating-form">
                <div className="dropdown">
                    <div className="rating-display">{this.props.rating}</div>
                    <div className="dropdown-content" onClick={this.updateRating}>
                        {
                            this.rating.map(curr => {
                                if(curr !== this.props.rating) {
                                   return <button className="rating-list" key={curr}>{curr}</button>
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Rating;