import React from 'react';
import './App.css';
import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import { connect } from 'react-redux';
import {
  getSecretWord,
  resetGame,
  setUserEntering,
  userSubmitWord,
} from './actions';
import Input from './Input';
import TotalGuesses from './TotalGuesses';
import NewWordButton from './NewWordButton';
import SecretWordReveal from './SecretWordReveal';
import UserEnterButton from './UserEnterButton';
import EnterWordForm from './EnterWordForm';
import ServerError from './ServerError';

export class UnconnectedApp extends React.Component {
  componentDidMount() {
    // get the secret word
    this.props.getSecretWord();
  }

  render() {
    return (
      <div className="container" data-test="component-app">
        <h1>Jotto</h1>
        <div>The secret word is {this.props.secretWord}</div>
        {this.props.serverError ? (
          <div data-test="component-server-error">
            <ServerError />
          </div>
        ) : this.props.userEnter === 'userEntering' ? (
          <div data-test="component-enter-word-form-in-app">
            <EnterWordForm userSubmitWord={this.props.userSubmitWord} />
          </div>
        ) : (
          <div data-test="components-in-app">
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
            {this.props.guessedWords.length === 0 ? (
              <UserEnterButton setUserEntering={this.props.setUserEntering} />
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  success,
  guessedWords,
  secretWord,
  gaveUp,
  userEnter,
  serverError,
}) => {
  return {
    success,
    guessedWords,
    secretWord,
    gaveUp,
    userEnter,
    serverError,
  };
};

export default connect(mapStateToProps, {
  getSecretWord,
  resetGame,
  setUserEntering,
  userSubmitWord,
})(UnconnectedApp);
