import React, { PropTypes, Component } from 'react';
import TextInput from './TextInput';

import AppBar from 'material-ui/AppBar';

const defaultStyle = {
  marginLeft: 20
};

class Header extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }

  render() {
    return (
      <header className="header">
          <AppBar title="React + Redux + Material UI Boilerplate" />
          <h1 style={defaultStyle} >Traffic Near United Center</h1>
          <TextInput newTodo
                         onSave={this.handleSave.bind(this)}
                         placeholder="What needs to be done?" />
      </header>
    );
  }
}

Header.propTypes = {
  addTodo: PropTypes.func
};

export default Header;
