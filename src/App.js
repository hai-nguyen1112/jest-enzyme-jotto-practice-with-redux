import React from 'react';
import './App.css';
import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import { connect } from 'react-redux';
import { getSecretWord, resetGame } from './actions';
import Input from './Input';
import TotalGuesses from './TotalGuesses';
import NewWordButton from './NewWordButton';
import SecretWordReveal from './SecretWordReveal';

export class UnconnectedApp extends React.Component {
  componentDidMount() {
    // get the secret wore
    this.props.getSecretWord();
  }

  render() {
    return (
      <div className="container" data-test="component-app">
        <h1>Jotto</h1>
        <div>The secret word is {this.props.secretWord}</div>
        <Congrats success={this.props.success} />
        <SecretWordReveal
          gaveUp={this.props.gaveUp}
          secretWord={this.props.secretWord}
        />
        <NewWordButton
          success={this.props.success}
          resetGame={this.props.resetGame}
          gaveUp={this.props.gaveUp}
        />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
        <TotalGuesses guessCount={this.props.guessedWords.length} />
      </div>
    );
  }
}

const mapStateToProps = ({ success, guessedWords, secretWord, gaveUp }) => {
  return {
    success,
    guessedWords,
    secretWord,
    gaveUp,
  };
};

export default connect(mapStateToProps, { getSecretWord, resetGame })(
  UnconnectedApp
);
