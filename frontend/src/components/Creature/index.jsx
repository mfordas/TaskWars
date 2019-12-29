import React from 'react';
import { Container } from 'semantic-ui-react';
import CreatureList from './creatureList';

const CreatureMenuContent = () => {
    return(
        <Container>
            Strona z potworami
            <CreatureList/>
        </Container>
    )
}

export default CreatureMenuContent;