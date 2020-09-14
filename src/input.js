import React from 'react';
import { connect } from 'react-redux';
import { guessWord, giveUp } from './actions';
import GiveUpButton from './GiveUpButton';

export class UnconnectedInput extends React.Component {
  state = {
    currentGuess: '',
  };

  submitGuessedWord = (e) => {
    e.preventDefault();
    const guessedWord = this.state.currentGuess;
    if (guessedWord && guessedWord.length > 0) {
      this.props.guessWord(guessedWord);
      this.setState({ currentGuess: '' });
    }
  };
  render() {
    const contents =
      this.props.success || this.props.gaveUp ? null : (
        <form className="form-inline">
          <input
            data-test="input-box"
            className="mb-2 mx-sm-3"
            type="text"
            placeholder="enter guess"
            value={this.state.currentGuess}
            onChange={(e) => this.setState({ currentGuess: e.target.value })}
          />
          <button
            data-test="submit-button"
            className="btn btn-primary mb-2"
            type="submit"
            onClick={this.submitGuessedWord}
          >
            Submit
          </button>
        </form>
      );

    return (
      <div data-test="component-input" style={{ display: 'flex' }}>
        {contents}
        &nbsp; &nbsp;
        <GiveUpButton
          success={this.props.success}
          giveUp={this.props.giveUp}
          gaveUp={this.props.gaveUp}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ success, gaveUp }) => {
  return { success, gaveUp };
};

export default connect(mapStateToProps, { guessWord, giveUp })(
  UnconnectedInput
);
