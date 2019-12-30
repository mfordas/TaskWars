import React from 'react';
import { Container } from 'semantic-ui-react';
import Quote from '../../components/Homepage/Quote';
import Stats from '../../components/Homepage/Stats';

class HomepageContent extends React.Component {

    render() {
        
        return (
            <Container>
                <Quote />
                <Stats />
            </Container>
        );
    }
}

export default HomepageContent;