import React from 'react';
import { Avatar, HealthBar, ExperienceBar, Statistics, Details, Guilds, AccountButton} from '../../components/Profile'
import setHeaders from '../../utils/setHeaders';

class Profile extends React.Component {

  state = {
    name: "",
    level: 0,
    guilds: [],
    health: 50,
    exp: 50,
    class: "",
    avatar: "",
    physical: 0,
    magical: 0,
    guildsNames: [],
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
        class: body.charClass,
        avatar: body.avatar,
        physical: body.physical_power,
        magical: body.magical_power
      })

      this.fetchGuilds(body.guilds);
  }

  fetchGuilds = async (idList) => {
    const names = [];
    const requests = idList.map(async (id) => {
        const response = await fetch(`/api/guilds/${id}`, setHeaders());
        const body = await response.json();
        names.push(body.name);
    })

    Promise.all(requests).then(() => {
      this.setState({
        guildsNames: names
      })
    })
}

  render() {
    return (
      <div className="profileViewDiv">
        <div className="profileCharacterDetails">
          <h1>Character Details</h1>
            <Avatar avatar={this.state.avatar}/>
            <Details name={this.state.name} level={this.state.level}/>
          <div className="progress">
            <HealthBar health={this.state.health}/>
            <ExperienceBar exp={this.state.exp}/>
            </div>
        </div>
        <div className="profileViewGroup">
          <AccountButton />
          <div className="profileCharacterGuilds">
            <Guilds guilds={this.state.guildsNames}/>
          </div>
          <div className="profileCharacterStatistics">
            <Statistics class={this.state.class} physical={this.state.physical} magical={this.state.magical}/>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;
