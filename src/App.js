import React from 'react';
import './App.css';
import GuessedWords from './GuessedWords';
import Congrats from './Congrats';
import { connect } from 'react-redux';
import { getSecretWord } from './actions';
import Input from './Input';

export class UnconnectedApp extends React.Component {
  componentDidMount() {
    // get the secret wore
    this.props.getSecretWord();
  }

  render() {
    return (
      <div className="container" data-test="component-app">
        <h1>Jotto</h1>
        <Congrats success={this.props.success} />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
      </div>
    );
  }
}

const mapStateToProps = ({ success, guessedWords, secretWord }) => {
  return {
    success,
    guessedWords,
    secretWord,
  };
};

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);
