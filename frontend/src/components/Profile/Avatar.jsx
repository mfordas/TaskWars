import React from 'react';
import { Image, Modal, Header} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import AvatarModal from './AvatarModal';
import { compareSync } from 'bcryptjs';
import setHeaders from '../../utils/setHeaders';
const _ = require('lodash')

class Avatar extends React.Component {
    constructor(props) {
        super(props);

    this.avatarHoverRef = React.createRef();
    this.state = {
        avatar: this.props.avatar,
        id: this.props.id
    }
    }

    componentDidMount() {
        this.avatarHoverRef.current.style.opacity="0%"
        this.avatarHoverRef.current.addEventListener("mouseover", this.onMouseOverAvatar);
        this.avatarHoverRef.current.addEventListener("mouseleave", this.onMouseLeaveAvatar);
    }

    componentDidUpdate(prevProps) {
        if(this.props.avatar !== prevProps.avatar)
        {
          this.setState({
              avatar: this.props.avatar,
              id: this.props.id
          })
        }
      } 

    onMouseOverAvatar = () => {
        this.avatarHoverRef.current.style.opacity="70%";
    }

    onMouseLeaveAvatar = () => {
        this.avatarHoverRef.current.style.opacity="0%";
    }

    handleClose = (img) => {
        this.img = img;
    }

    onModalClose = () => {
        // this.setState({avatar: this.img});
        // this.putAvatar(this.img);
        const creature_id = "5e091f6fbd2d8c0e68880044";
        const guild_id = "5e091f6fbd2d8c0e68880050";
        const guild_name = "Guild_0";
        const task_id = "5e091444a55839319cc93964"
        // this.addCreatureToFight(creature_id, guild_id, guild_name);
        this.addTaskToMemebers(task_id, guild_id);
    }

    addCreatureToFight = async (creature_id, guild_id, guild_name) => {
        const creatureResponse = await fetch(`/api/creatures/${creature_id}`, setHeaders());
        const creature = await creatureResponse.json();

        const data = {
            name: guild_name,
            current_fight: creature
        }
        const params = {...setHeaders(), body: JSON.stringify(data), method: "PUT"};
        const response = await fetch(`/api/guilds/${guild_id}/current_fight`, params);
    }

    addTaskToMemebers = async (task_id, guild_id) => {
        const guildResponse = await fetch(`/api/guilds/${guild_id}`, setHeaders());
        const guild = await guildResponse.json();

        const taskResponse = await fetch(`/api/tasks/${task_id}`, setHeaders());
        const task = await taskResponse.json();

        const data = _.omit(task, ['_id', '__v', '__proto']);
        const params = {...setHeaders(), body: JSON.stringify(data), method: "PUT"};

        guild.members.map(async (member_id) => {
            const memberResponse = await fetch(`/api/characters/${member_id}`, setHeaders());
            const member = await memberResponse.json();
            
            const memberTask = await fetch(`/api/questbook/${member.questbook_id}/task`, params);
            //modify current figthd
            console.log(memberTask._id)
        })
    }

    atackCreature(creature_id) {
        
    }

    putAvatar = async (img) => {
        const data = {
            avatar: img
        };
        let params = {...setHeaders(), body: JSON.stringify(data), method: "PUT"};
        const response = await fetch(`/api/characters/${this.props.id}/avatar`, params);
    }

    render() {
        return (
            <div className="avatarWrap">
                <Modal 
                size="small"
                trigger={
                    <div id='avatarHover' ref={this.avatarHoverRef}>
                        <h1>Change avatar</h1>
                    </div>
                }
                onClose={this.onModalClose}
                >
                <AvatarModal img={this.state.avatar} handleClose={this.handleClose}/>
                </Modal>
                <div className='avatarDiv'>
                    <Image id='avatar' src={this.state.avatar} size='medium' rounded />
                </div>
            </div>
        );
    }
}

export default Avatar