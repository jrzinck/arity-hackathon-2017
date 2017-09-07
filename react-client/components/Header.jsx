import React, {PropTypes, Component} from 'react';

import AppBar from 'material-ui/AppBar';

const defaultStyle = {
    marginLeft: 30,
    color: "#122846"
};

class Header extends Component {
    render() {
        return (
            <header className="header">
                <AppBar title="TraffiCop"/>
                <h1 style={defaultStyle}>Chicago Traffic</h1>
            </header>
        );
    }
}

Header.propTypes = {
    addTodo: PropTypes.func
};

export default Header;
