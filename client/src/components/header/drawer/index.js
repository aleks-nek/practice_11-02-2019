import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import LogOutIcon from '@material-ui/icons/ExitToApp';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import './index.css';

class RightDrawer extends React.Component {
    render() {
        return (
            <div>
                <Drawer anchor="right" open={this.props.isOpen} onClose={this.props.toggleDrawer}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.props.toggleDrawer}
                        onKeyDown={this.props.toggleDrawer}
                        className={'list'}
                    >
                        <ListItem button>
                            <ListItemIcon>
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <Link href="/root" underline="none" color="inherit">
                                Profile
                            </Link>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <Link href="/settings" underline="none" color="inherit">
                                Settings
                            </Link>
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={this.props.handleLogOutButton}>
                            <ListItemIcon>
                                <LogOutIcon />
                            </ListItemIcon>
                            <Link href="/settings" underline="none" color="inherit">
                                Log out
                            </Link>
                        </ListItem>
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default (RightDrawer);