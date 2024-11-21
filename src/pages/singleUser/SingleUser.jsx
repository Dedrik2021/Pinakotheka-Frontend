import { useParams } from 'react-router';

import './singleUser.scss';

const SingleUser = () => {
    const {userId} = useParams()

    return ( 
        <div className='single-user'>{userId}</div>
    );
}

export default SingleUser;