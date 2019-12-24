import React from 'react';
import { Segment, Button, Header, TransitionablePortal, Dimmer, Icon, Transition } from 'semantic-ui-react';

class TopPortal extends React.Component {
    constructor(props) {
        super(props);

        this.state = { portalOpen: false };
    }

    handleClose = () => this.setState({ portalOpen: false });
    handleOpen = async () => {
        this.setState({ portalOpen: true });
        await new Promise(resolve => setTimeout(resolve, 10000));
        this.setState({ portalOpen: false });
    };

    render() {
        return (
            <TransitionablePortal
                open={this.state.portalOpen}
                onClose={this.handleClose}
                transition={{ animation: 'fly down', duration: '1500' }}>
                <Segment
                    style={{
                        left: '40%',
                        position: 'fixed',
                        top: '0',
                        zIndex: 1000,
                    }}
                >
                    <Header textAlign='center'>{this.props.header}</Header>
                    <p >{this.props.description}</p>

                    <Button color='green'
                        content='Close'
                        onClick={this.handleClose}
                        fluid
                    />
                    <Dimmer active={this.state.portalOpen} animation='scale' inverted page />
                </Segment>
            </TransitionablePortal>

        );
    }
}

export default TopPortal;