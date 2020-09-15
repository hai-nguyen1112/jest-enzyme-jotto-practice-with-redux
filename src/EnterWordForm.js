import React from 'react';
import PropTypes from 'prop-types';

class EnterWordForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputBox = React.createRef();
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    if (this.inputBox.current.value.length > 0) {
      this.props.userSubmitWord(this.inputBox.current.value);
    }
  }

  render() {
    return (
      <div data-test="component-enter-word-form">
        <p data-test="paragraph-instructions-enter-word-form">
          Enter a secret word for someone else to guess
        </p>
        <form className="form-inline">
          <input
            data-test="field-input-enter-word-form"
            className="mb-2 mx-sm-3"
            type="text"
            placeholder="enter secret word"
            ref={this.inputBox}
          />
          <button
            className="btn btn-primary mb-2"
            data-test="button-submit-enter-word-form"
            onClick={this.submitForm}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

EnterWordForm.propTypes = {
  userSubmitWord: PropTypes.func,
};

export default EnterWordForm;
