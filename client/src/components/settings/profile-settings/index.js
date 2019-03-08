import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '80%',
        backgroundColor: theme.palette.background.paper,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    bootstrapRoot: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    bootstrapInput: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
    bootstrapFormLabel: {
        fontSize: 18,
    },
});

function SettingsList(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Paper>
                <Typography variant="title" gutterBottom>
                    Profile Settings
                </Typography>
                <div className="item">
                    {/*<Typography variant="h6" gutterBottom>*/}
                        {/*login*/}
                    {/*</Typography>*/}
                    {/*<InputBase*/}
                        {/*id="bootstrap-input"*/}
                        {/*defaultValue="react-bootstrap"*/}
                        {/*classes={{*/}
                            {/*root: classes.bootstrapRoot,*/}
                            {/*input: classes.bootstrapInput,*/}
                        {/*}}*/}
                    {/*/>*/}
                </div>

            </Paper>
        </div>
    );
}

SettingsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SettingsList);