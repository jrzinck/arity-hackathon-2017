import React, { Component, PropTypes } from 'react';

const defaultStyle = {
  width: 300,
  marginLeft: 20
};

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <section className="main" style={defaultStyle}>
        <div>
          Test Text
        </div>
      </section>
    );
  }
}

MainSection.propTypes = {
  todos: PropTypes.array,
  actions: PropTypes.object
};

export default MainSection;
