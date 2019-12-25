import React from 'react';
import { Input, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import "./style-accountModal.css";

class AccountModal extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="modalAccount">
                <div className="modalAccountHeader">
                        <h3>Change account data</h3>
                </div>
                <div id="modalAccountNameInput">
                    <h4>Change name</h4>
                    <Input label="New name" placeholder='Enter new name' />
                    <Input type="password" label="Password" placeholder='Enter password' />
                    <Button basic color='yellow' onClick={this.setImage} value="http://icons.iconarchive.com/icons/chanut/role-playing/256/King-icon.png">
                        Change name
                    </Button>
                </div>
                <div id="modalAccountPassInput">
                    <h4>Change password</h4>
                    <Input type="password" label="Old password" placeholder='Enter old password' />
                    <Input type="password" label="New password" placeholder='Enter new password' />
                    <Input type="password" label="Confirm password" placeholder='Enter confirm password' />
                    <Button basic color='yellow' onClick={this.setImage} value="http://icons.iconarchive.com/icons/chanut/role-playing/256/King-icon.png">
                        Change password
                    </Button>
                </div>
            </div>
        );
    }
}

export default AccountModal;
