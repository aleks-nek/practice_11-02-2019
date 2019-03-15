import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ClientsIcon from '@material-ui/icons/SupervisorAccount';
import OrdersListIcon from '@material-ui/icons/ListAlt';
import LogOutIcon from '@material-ui/icons/ExitToApp';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const styles = {
    list: {
        minWidth: '250px'
    }
};

class RightDrawer extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Drawer anchor="right" open={this.props.isOpen} onClose={this.props.toggleDrawer}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.props.toggleDrawer}
                        onKeyDown={this.props.toggleDrawer}
                        className={classes.list}
                    >
                        <ListItem button>
                            <ListItemIcon>
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <Link href="/root" underline="none" color="inherit">
                                Profile
                            </Link>
                        </ListItem>
                        <ListItem button >
                            <ListItemIcon>
                                <ClientsIcon />
                            </ListItemIcon>
                            <Link href="/clients" underline="none" color="inherit">
                                Clients
                            </Link>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <OrdersListIcon />
                            </ListItemIcon>
                            <Link href="/orders" underline="none" color="inherit">
                                Orders
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

export default withStyles(styles)(RightDrawer);