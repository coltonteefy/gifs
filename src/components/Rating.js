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
                <div className="rating-btn">
                    <i className="far fa-edit"/>
                    src rating
                </div>
                <div className="rating-list" onClick={this.updateRating}>
                    {
                        this.rating.map(curr => {
                            if(curr === this.props.rating) {
                                return <button className="rating-selections selected" key={curr} >{curr}</button>
                            }
                            return <button className="rating-selections" key={curr}>{curr}</button>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Rating;
