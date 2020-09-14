import React from 'react';
import PropTypes from 'prop-types';

const TotalGuesses = ({ guessCount }) => {
  let content =
    guessCount < 1 ? null : (
      <div data-test="component-total-guesses">Total Guesses: {guessCount}</div>
    );
  return content;
};

TotalGuesses.propTypes = {
  guessCount: PropTypes.number.isRequired,
};

export default TotalGuesses;
