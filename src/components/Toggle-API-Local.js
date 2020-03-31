import React, {Component} from 'react';
import '../styles/Toggle-API-Local.css';

class ToggleAPILocal extends Component {



    render() {
        return (
            <div className="toggle-container">
                <div className="toggle-btn">
                    <i className="fas fa-toggle-on"/>
                </div>
                <div className="toggle-list" onClick={this.updateRating}>
                    <button className="toggle-selections">LOCAL</button>
                    <button className="toggle-selections selected">API</button>
                </div>

            </div>
        );
    }
}

export default ToggleAPILocal;
