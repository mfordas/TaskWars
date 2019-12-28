import React from 'react';
import { Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const ErrorMessage = (props) => {
    return (
        <Message
          content={props.message}
          negative
        />
      )
};

export default ErrorMessage;
