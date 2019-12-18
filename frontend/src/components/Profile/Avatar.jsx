import React from 'react';
import { Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class Avatar extends React.Component {
    render() {
        return (
            <div className='avatarDiv'>
               <Image src='https://static.wikia.nocookie.net/1cf171b2-6efe-43de-9418-86d2b759b44a' size='medium' rounded />
            </div>
        );
    }
}

export default Avatar