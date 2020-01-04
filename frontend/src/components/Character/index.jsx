import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import CharacterCreation from './characterCreation';

const CharacterCreationContent = () => {
  return (
    <Container text>
      <Header>Create your character!</Header>
      <CharacterCreation />
    </Container>
  );
};

export default CharacterCreationContent;
