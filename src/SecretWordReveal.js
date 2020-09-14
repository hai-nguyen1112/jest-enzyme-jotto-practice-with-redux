import React from 'react';
import PropTypes from 'prop-types';

const SecretWordReveal = ({ gaveUp, secretWord }) => {
  let content = gaveUp ? (
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
};

export default SecretWordReveal;
