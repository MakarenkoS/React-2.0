import React, { useEffect, useState } from 'react';
import classes from './ProfileInfo.module.css'



const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status)


    useEffect( ()=> {
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateUserStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }


    return <div>
        {!editMode &&
            <div>
                <span onDoubleClick={activateEditMode}> {props.status || 'No status'}</span>
            </div>
        }

        {editMode &&
            <div>
                <input autoFocus={true} onChange={onStatusChange} value={status} onBlur={deactivateEditMode} type="text" />
            </div>
        }
    </div>
}


export default ProfileStatusWithHooks;