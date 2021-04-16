import React from 'react';
import classes from './ProfileInfo.module.css'



class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }


    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateUserStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
       if(prevProps.status != this.props.status) {
           this.setState({
               status: this.props.status
           })
       }
    }
    
    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}> {this.props.status || 'No status'}</span>
                    </div>
                }

                {this.state.editMode &&
                    <div>
                        {/* onBlur вначале? */}
                        <input autoFocus={true} onChange={this.onStatusChange} value={this.state.status} type="text" onBlur={this.deactivateEditMode} />
                    </div>
                }
            </div>

        )

    }
}

export default ProfileStatus;