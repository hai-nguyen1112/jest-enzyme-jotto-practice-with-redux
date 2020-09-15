import React from 'react';
import PropTypes from 'prop-types';

const NewWordButton = ({ success, resetGame, gaveUp }) => {
  let button =
    success || gaveUp ? (
      <button
        className="btn btn-primary spacer-bottom"
        data-test="new-word-button"
        onClick={resetGame}
      >
        New Word
      </button>
    ) : null;
  return button;
};

NewWordButton.propTypes = {
  success: PropTypes.bool.isRequired,
  resetGame: PropTypes.func,
};

export default NewWordButton;
