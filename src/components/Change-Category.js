import React, {Component} from 'react';
import '../styles/Change-Category.css';

class ChangeCategory extends Component {

    state = {
        input: ""
    };

    onChange = (e) => {
        this.setState({
            input: e.target.value
        });

    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.changeCategory(this.state.input);
        document.getElementById("change-input").value = ''
    };

    render() {
        return (
            <div className="change-category-form">
                <form className="change-form" onSubmit={this.onSubmit} autocomplete="off">
                    <input className="change-input" id="change-input" type="text" placeholder="SEARCH" onChange={this.onChange}/>
                    <input className="change-btn" type="submit" value="GO!" />
                </form>
            </div>
        );
    }
}

export default ChangeCategory;