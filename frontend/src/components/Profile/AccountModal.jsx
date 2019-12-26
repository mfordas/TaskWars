import React from 'react';
import { Input, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import "./style-accountModal.css";
import setHeaders from '../../utils/setHeaders';

class AccountModal extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            newName: '',
            id: this.props.id,
            email: this.props.email,
            userName: this.props.userName
        };
    }

    componentDidMount() {
          this.setState({
              id: this.props.id,
              email: this.props.email,
              userName: this.props.userName
          })
      } 

    handleNewPassChange = (event) => {
        this.setState({newPassword: event.target.value});
    }

    handleConfirmPassChange = (event) => {
        this.setState({confirmPassword: event.target.value});
    }

    onPassButtonSubmit = async () => {
        {
            console.log(this.state.confirmPassword);
            console.log(this.state.newPassword);
            console.log(this.state.id)
            if(this.state.confirmPassword===this.state.newPassword) {
                const data = {
                    email: this.state.email,
                    password: this.state.newPassword
                };
                let params = {...setHeaders(), body: JSON.stringify(data), method: "PUT"};
                const response = await fetch(`/api/users/${this.state.id}/password`, params);
            }
        }
    }

    render() {
        return (
            <div className="modalAccount">
                <div className="modalAccountHeader">
                        <h3>Change account data</h3>
                </div>
                <div id="modalAccountNameInput">
                    <h4>Change name</h4>
                    <Input onChange={this.handleChange} label="New name" placeholder='Enter new name' />
                    <Input onChange={this.handleChange} type="password" label="Password" placeholder='Enter password' />
                    <Button basic color='yellow' onClick={this.onNameButtonSubmit} value="">
                        Change name
                    </Button>
                </div>
                <div id="modalAccountPassInput">
                    <h4>Change password</h4>
                    {/* <Input onChange={this.handleChange} type="password" label="Old password" placeholder='Enter old password' /> */}
                    <Input onChange={this.handleNewPassChange} type="password" label="New password" placeholder='Enter new password' />
                    <Input onChange={this.handleConfirmPassChange} type="password" label="Confirm password" placeholder='Enter confirm password' />
                    <Button basic color='yellow' onClick={this.onPassButtonSubmit} value="">
                        Change password
                    </Button>
                </div>
            </div>
        );
    }
}

export default AccountModal;
