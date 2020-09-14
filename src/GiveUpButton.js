import React from 'react';
import PropTypes from 'prop-types';

const GiveUpButton = ({ success, giveUp, gaveUp }) => {
  let button =
    success || gaveUp ? null : (
      <button
        data-test="give-up-button"
        className="btn btn-danger mb-2"
        onClick={(e) => {
          e.preventDefault();
          giveUp();
        }}
      >
        Give up
      </button>
    );
  return button;
};

GiveUpButton.propTypes = {
  success: PropTypes.bool,
  giveUp: PropTypes.func,
  gaveUp: PropTypes.bool,
};

export default GiveUpButton;
