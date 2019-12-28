import React, { useContext } from 'react';
import HomepageContent from '../../components/Homepage/HomepageContent';
import UserBox from '../../components/Homepage/UserBox';
import Store from '../../Store';
import { Container } from 'semantic-ui-react';

const Home = () => {
  const { isLogged } = useContext(Store);
  
  return (
    <div>
      <HomepageContent />
      <Container style={{margin: '10px'}}>
        {!isLogged && (<UserBox />)}
      </Container>
    </div>
  );
};

export default Home;



