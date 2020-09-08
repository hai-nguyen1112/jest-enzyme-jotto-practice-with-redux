import React from 'react';
import { connect } from 'react-redux';

class Input extends React.Component {
  render() {
    return <div />;
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Input);
