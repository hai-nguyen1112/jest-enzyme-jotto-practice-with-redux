import React from 'react';

const Congrats = ({ success }) => {
  return (
    <>
      {success && (
        <div data-test="component-congrats">
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

export default Congrats;
