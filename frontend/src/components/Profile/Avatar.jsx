import React from 'react';
import { Image, Modal, Header} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import AvatarModal from './AvatarModal';
import { compareSync } from 'bcryptjs';

class Avatar extends React.Component {
    constructor(props) {
        super(props);

    this.avatarHoverRef = React.createRef();
    this.state = {
        avatar: ''
    }
    }

    componentDidMount() {
        this.avatarHoverRef.current.style.opacity="0%"
        this.avatarHoverRef.current.addEventListener("mouseover", this.onMouseOverAvatar);
        this.avatarHoverRef.current.addEventListener("mouseleave", this.onMouseLeaveAvatar);
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
        this.setState({avatar: this.img});
    }

    render() {
        return (
            <div className="avatarWrap">
                <Modal 
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