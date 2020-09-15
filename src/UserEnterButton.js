import React from 'react';
import PropTypes from 'prop-types';

const UserEnterButton = ({ setUserEntering }) => {
  let button = (
    <button
      data-test="user-enter-button"
      className="btn btn-primary spacer-bottom"
      style={{ marginTop: '10px' }}
      onClick={setUserEntering}
    >
      Enter your own secret word
    </button>
  );

  return button;
};

UserEnterButton.propTypes = {
  setUserEntering: PropTypes.func,
};

export default UserEnterButton;
