import React from 'react';
import { Segment, Grid, Divider, Button, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class UserBox extends React.Component {



    render() {

        return (
            <Segment textAlign='center' color='purple'>
                <Grid columns={2} relaxed={'very'} stackable>
                    <Grid.Column>
                        <Icon name='pencil' size='huge' color='blue' />
                        <h2 style={{ marginTop: '10px' }}>Join us now by registering...</h2>
                        <Button as={NavLink} to={'/register'} color='green'>
                            Register!
                        </Button>
                    </Grid.Column>

                    <Grid.Column>
                        <Icon name='address card' size='huge' color='blue' />
                        <h2 style={{ marginTop: '10px' }}>...let's get to work by logging in</h2>
                        <Button as={NavLink} to={'/login'} color='green'>
                            Login!
                        </Button>
                    </Grid.Column>
                </Grid>

                <Divider vertical>
                    OR
                </Divider>
            </Segment>
        );
    }
}

export default UserBox;