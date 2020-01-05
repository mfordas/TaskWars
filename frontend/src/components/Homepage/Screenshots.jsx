import React from 'react';
import { Segment, Button, Image, Dimmer, DimmerDimmable, Dimmable, Grid, Header } from 'semantic-ui-react';
import ViewImage from './ViewImage';

class Screenshots extends React.Component {
    constructor(props) {
        super(props);

        this.state = { active: false };
    }

    handleShow = () => this.setState({ active: true })
    handleHide = () => this.setState({ active: false })

    render() {
        const { active } = this.state;
        return (
            <Segment color='green' inverted>
                <Segment inverted >
                    <Header as='h1' textAlign='center'>Gallery</Header>
                    <Grid columns='3' relaxed>
                        <Grid.Row>
                            <Grid.Column>
                                <ViewImage src={'https://i.imgur.com/owMelG2.png'} title={'Questbook'} />
                            </Grid.Column>
                            <Grid.Column>
                                <ViewImage src={'https://i.imgur.com/cHgoSS7.png'} title={'Tasks'} />
                            </Grid.Column>
                            <Grid.Column>
                                <ViewImage src={'https://i.imgur.com/cHgoSS7.png'} title={'Shop'} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <ViewImage src={'https://i.imgur.com/cHgoSS7.png'} title={'Tasks'} />
                            </Grid.Column>
                            <Grid.Column>
                                <ViewImage src={'https://i.imgur.com/cHgoSS7.png'} title={'Guild'} />
                            </Grid.Column>
                            <Grid.Column>
                                <ViewImage src={'https://i.imgur.com/cHgoSS7.png'} title={'Profile'} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Segment>
            </Segment>
        );
    }
}

export default Screenshots;