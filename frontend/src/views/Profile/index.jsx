import React from 'react';
import { Avatar, HealthBar, ExperienceBar, Statistics, Details} from '../../components/Profile'
import { Container, Divider, Progress, Header } from 'semantic-ui-react'
import setHeaders from '../../utils/setHeaders';

class Profile extends React.Component {

  state = {
    name: "",
    level: 0,
    guilds: [],
    health: 50,
    exp: 50,
    class: "",
    physical: 0,
    magical: 0,
  } 

  componentDidMount() {
    this.fetchUser()
  }

  fetchUser = async () => {
    const response = await fetch('/api/users/me', setHeaders());
    const body = await response.json();
    this.fetchCharacter(body.character_id);
  };

  fetchCharacter = async (id) => {
      const response = await fetch(`/api/characters/${id}`, setHeaders());
      const body = await response.json();
      this.setState({
        name: body.name,
        level: body.level,
        guilds: body.guilds,
        health: body.health,
        exp: body.exp_points,
        class: body.class,
        physical: body.physical_power,
        magical: body.magical_power
      })
  }

  render() {
    return (
      <div className="profileViewDiv">
        <div className="profileCharacterDetails">
          <h1>Character details</h1>
            <Avatar />
            <Details name={this.state.name} level={this.state.level}/>
          <div className="progress">
            <HealthBar health={this.state.health}/>
            <ExperienceBar exp={this.state.exp}/>
            </div>
        </div>
        <div className="profileCharacterStatistics">
          <Statistics class={this.state.class} physical={this.state.physical} magical={this.state.magical}/>
        </div>
        <div className="profileCharacterGuilds">
          <Statistics class={this.state.class} physical={this.state.physical} magical={this.state.magical}/>
        </div>
      </div>
    );
  }
};

export default Profile;
