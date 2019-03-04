import React, { Component } from 'react';
import {connect} from 'react-redux';

import ProfileSettings from '../../components/settings/profile-settings';
class Settings extends Component {
    constructor(props){
        super(props);

        this.state = {
            value: 1
        }
    }
    render() {
        const value = this.state.value;
        return (
            <div>

                {value === 1 && <ProfileSettings />}
            </div>
        );
    }
}
export default connect(
    state => ({
        user: state.user
    })
)(Settings);