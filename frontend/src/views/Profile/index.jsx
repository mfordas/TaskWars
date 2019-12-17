import React from 'react';
import { Avatar, HealthBar, ExperienceBar, Statistics} from '../../components/Profile'
import { Container, Divider, Progress, Header } from 'semantic-ui-react'


const Profile = () => {
  return (
    <div>
      <Avatar />
      <HealthBar />
      <ExperienceBar />
      <Statistics />
    </div>
   
  );
};

export default Profile;
