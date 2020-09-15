import React from 'react';
import PropTypes from 'prop-types';

const Congrats = ({ success, userEnter }) => {
  return (
    <>
      {success && (
        <div data-test="component-congrats" className="alert alert-success">
          <span data-test="congrats-message">
            Congratulations! You guessed the word
          </span>
        </div>
      )}
      {!success && (
        <div data-test="component-congrats">
          <span data-test="congrats-message"></span>
        </div>
      )}
    </>
  );
};

Congrats.propTypes = {
  success: PropTypes.bool.isRequired,
};

Congrats.defaultProps = {
  success: false,
};

export default Congrats;
