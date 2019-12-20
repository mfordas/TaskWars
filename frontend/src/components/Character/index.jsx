import React from 'react';
import { Container} from 'semantic-ui-react';
import CharacterCreation from './characterCreation';

const CharacterCreationContent = () => {

  return (

      <Container text>
          <h3>Strona tworzenia postaci</h3>
        <CharacterCreation/>     
      </Container>
  );
};


export default CharacterCreationContent;