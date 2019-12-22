import React from 'react';
import { Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class Avatar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="avatarHover">
            <h1>zmien</h1>
            <div className='avatarDiv'>
               <Image id='avatar' src={this.props.avatar} size='medium' rounded />
            </div>
            </div>
        );
    }
}

export default Avatar