import React from 'react';
import { Button, Modal} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import AccountModal from './AccountModal';

class AccountButton extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="accountButton">
                 <Modal trigger={
                    <Button id='button' animated='fade'>
                        <Button.Content visible>Account</Button.Content>
                        <Button.Content hidden>Edit Account</Button.Content>
                    </Button>
                }>
                <AccountModal />
            </Modal>
            </div>
        );
    }
}

export default AccountButton;


