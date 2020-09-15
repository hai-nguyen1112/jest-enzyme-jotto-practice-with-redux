import React from 'react';

const ServerError = () => {
  return (
    <div className="alert alert-danger" data-test="component-server-error">
      There was an error retrieving the secret word. Please try again later.
    </div>
  );
};

export default ServerError;
