import React from 'react';
import { Image, Modal, Header} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import AvatarModal from './AvatarModal';

class Avatar extends React.Component {
    constructor(props) {
        super(props);

    this.avatarHoverRef = React.createRef();
    }

    componentDidMount() {
        this.avatarHoverRef.current.style.opacity="0%"
        this.avatarHoverRef.current.addEventListener("mouseover", this.onMouseOverAvatar);
        this.avatarHoverRef.current.addEventListener("mouseleave", this.onMouseLeaveAvatar)
    }

    onMouseOverAvatar = () => {
        this.avatarHoverRef.current.style.opacity="70%";
    }

    onMouseLeaveAvatar = () => {
        this.avatarHoverRef.current.style.opacity="0%";
    }

    render() {
        return (
            <div className="avatarWrap">
                <Modal trigger={
                    <div id='avatarHover' ref={this.avatarHoverRef}>
                        <h1>Change avatar</h1>
                    </div>
                }>
                    <AvatarModal avatar={this.props.avatar}/>
                </Modal>
                <div className='avatarDiv'>
                    <Image id='avatar' src={this.props.avatar} size='medium' rounded />
                </div>
            </div>
        );
    }
}

export default Avatar