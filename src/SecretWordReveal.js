import React from 'react';
import PropTypes from 'prop-types';

const SecretWordReveal = ({ gaveUp, secretWord, userEnter }) => {
  let content =
    gaveUp && userEnter !== 'userEntering' ? (
      <div
        data-test="sercet-word-reveal-component"
        className="alert alert-danger"
      >
        The secret word was {secretWord}
        <br />
        Better luck next time
      </div>
    ) : null;
  return content;
};

SecretWordReveal.propTypes = {
  gaveUp: PropTypes.bool,
  secretWord: PropTypes.string,
  userEnter: PropTypes.string,
};

export default SecretWordReveal;
