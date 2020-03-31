import React, {Component} from 'react';
import '../styles/Toggle-API-Local.css';

class ToggleAPILocal extends Component {
    state ={
        source: "api"
    };

    toggleSource = (e) => {
        this.props.toggleSource(e.target.innerHTML);
        this.setState({
            source: e.target.innerHTML
        })
    };

    sourceList = ["local", "api"];


    render() {
        return (
            <div className="toggle-container">
                <div className="toggle-btn">
                    <i className="fas fa-toggle-on"/>
                    toggle
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

export default ToggleAPILocal;
