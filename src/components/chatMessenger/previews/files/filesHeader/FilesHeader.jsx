import { useDispatch, useSelector } from 'react-redux';
import { IoIosCloseCircleOutline } from 'react-icons/io';

import { clearFiles } from '../../../../../redux/slices/chatSlice';

import './filesHeader.scss';

const FilesHeader = ({activeIndex}) => {

    const { files } = useSelector((state) => state.chat);
    const dispatch = useDispatch();

    const clearFilesHandler = () => {
        dispatch(clearFiles());
    };

    return ( 
        <div className="files-header">
            <div className="files-header__wrapper">
                <button type='button' title='Close files' onClick={() => clearFilesHandler()} className="files-header__btn close-btn btn">
                    <IoIosCloseCircleOutline size={25} color="#ccc" />
                </button>
                <h1 className=''>{files[activeIndex]?.file?.name}</h1>
                <span></span>
            </div>
        </div>
    );
}

export default FilesHeader;