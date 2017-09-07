import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField'

const defaultStyle = {
    marginLeft: 20
};

class TextInput extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            text: this.props.text || ''
        };
    }

    handleEnter(e) {
        if (e.keyCode === 13) {
            const text = e.target.value.trim();
            this.props.onSave(text);
        }
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    handleBlur(e) {
        this.props.onSave(e.target.value);
    }

    render() {
        return (
            <div>
                <TextField onKeyDown={this.handleEnter.bind(this)}
                           className={this.props.editing}
                           id='new-todo-input'
                           style={defaultStyle}
                           type="text"
                           hintText={this.props.placeholder}
                           autoFocus="true"
                           value={this.state.text}
                           onBlur={this.handleBlur.bind(this)}
                           onChange={this.handleChange.bind(this)}
                />
            </div>
        );
    }
}

TextInput.propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool
};

export default TextInput;
