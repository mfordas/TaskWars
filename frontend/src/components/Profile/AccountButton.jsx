import React from 'react';
import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class AccountButton extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="accountButton">
                <Button id='button' animated='fade'>
                    <Button.Content visible>Account</Button.Content>
                    <Button.Content hidden>Edit Account</Button.Content>
                </Button>
            </div>
        );
    }
}

export default AccountButton;


