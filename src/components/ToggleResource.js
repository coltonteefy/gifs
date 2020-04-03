import React, {Component} from 'react';
import '../styles/ToggleResource.css';

class ToggleResource extends Component {
    state ={
        source: "gifs"
    };

    toggleSource = (e) => {
        this.props.toggleResource(e.target.innerHTML);
        this.setState({
            source: e.target.innerHTML
        })
    };

    sourceList = ["gifs", "stickers"];


    render() {
        return (
            <div className="toggle-container">
                <div className="toggle-btn">
                    <i className="fas fa-toggle-on"/>
                    resource
                </div>
                <div className="toggle-list" onClick={this.toggleSource}>
                    {
                        this.sourceList.map(source => {
                            if(source === this.state.source) {
                                return <button className="toggle-selections selected" key={source}>{source}</button>
                            }
                            return <button className="toggle-selections" key={source}>{source}</button>
                        })
                    }
                </div>

            </div>
        );
    }
}

export default ToggleResource;
