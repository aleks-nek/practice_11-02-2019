import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import GridList from '@material-ui/core/GridList';

import {
    MAX_BRAND_LENGTH,
    MAX_MODEL_LENGTH,
    MAX_EQUIPMENT_LENGTH,
    MAX_APPEARANCE_LENGTH,
    MAX_PASSWORD_LENGTH_ON_CLIENT_DEVICE,
    MAX_DEFECT_LENGTH,
    MAX_RECEIVER_NOTES_LENGTH
} from "../../constants";


const styles = theme => ({
    addNewOrderFormWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        minWidth: '400px',
        padding: '20px',
    },
    formItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '350px',
        marginTop: '30px',
        marginRight: '30px',
    },
    propertyInput: {
        width: '250px',
        marginLeft: '10px',
    },
    saveButton: {
        marginRight: '5px',
    }
});

class RightDrawer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isQuickly: false,

            // выпадающие списки
            orderType: {
                id: -1
            },

            deviceType: {
                id: -1
            },

            client: {
                id: -1
            },

            // текстовые поля
            imei: {
                value: null
            },
            brand: {
                value: null
            },
            model: {
                value: null
            },
            equipment: {
                value: null
            },
            appearance: {
                value: null
            },
            password: {
                value: null
            },
            defect: {
                value: null
            },
            receiverNotes: {
                value: null
            },
            estimatedPrice: {
                value: null
            }
        }
    }

    render() {
        const {classes, toggleDrawer, isOpen} = this.props;
        const {clients, deviceTypes, orderTypes} = this.props;

        return (
            <div>
                <Drawer anchor="right" open={isOpen} onClose={toggleDrawer}>
                    <GridList cellHeight={'auto'} cols={1}>
                        <div className={classes.addNewOrderFormWrapper}>

                            <div className={classes.formItem}>
                                <Typography variant="h6">
                                    New order
                                </Typography>
                            </div>

                            {/*order type select*/}
                            <div className={classes.formItem}>
                                <InputLabel htmlFor="order-type-input">Order type</InputLabel>
                                <TextField
                                    id="order-type-input"
                                    select
                                    className={classes.propertyInput}
                                    value={this.state.orderType.id}
                                    onChange={this.handleSelectChange('orderType')}
                                >
                                    {orderTypes.map(option => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            {/*client select*/}
                            <div className={classes.formItem}>
                                <InputLabel htmlFor="client-input">Client</InputLabel>
                                <TextField
                                    id="client-input"
                                    select
                                    className={classes.propertyInput}
                                    value={this.state.client.id}
                                    onChange={this.handleSelectChange('client')}
                                >
                                    {clients.map(c => (
                                        <MenuItem key={c.id} value={c.id}>
                                            {c.name} ({c.phone})
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            {/*device type select*/}
                            <div className={classes.formItem}>
                                <InputLabel htmlFor="device-type-input">Device type</InputLabel>
                                <TextField
                                    id="device-type-input"
                                    select
                                    className={classes.propertyInput}
                                    value={this.state.deviceType.id}
                                    onChange={this.handleSelectChange('deviceType')}
                                >
                                    {deviceTypes.map(option => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            {/*imei*/}
                            <div className={classes.formItem}>
                                <InputLabel htmlFor="imei-input">IMEI</InputLabel>
                                <Input
                                    required
                                    id='imei-input'
                                    name='imei'
                                    className={classes.propertyInput}
                                    onChange={event => this.handleInputChange(event, this.validateImei)}
                                    error={this.state.imei.err}
                                />
                            </div>

                            {/*brand*/}
                            <div className={classes.formItem}>
                                <InputLabel htmlFor="brand-input">Brand</InputLabel>
                                <Input
                                    name='brand'
                                    id='brand-input'
                                    className={classes.propertyInput}
                                    onChange={event => this.handleInputChange(event, this.validateBrand)}
                                    error={this.state.brand.err}
                                />
                            </div>

                            {/*model*/}
                            <div className={classes.formItem}>
                                <InputLabel htmlFor="model-input">Model</InputLabel>
                                <Input
                                    name='model'
                                    id='model-input'
                                    className={classes.propertyInput}
                                    onChange={event => this.handleInputChange(event, this.validateModel)}
                                    error={this.state.model.err}
                                />
                            </div>

                            {/*defect*/}
                            <div className={classes.formItem}>
                                <InputLabel htmlFor="defect-input">Defect</InputLabel>
                                <Input
                                    name='defect'
                                    id='defect-input'
                                    className={classes.propertyInput}
                                    onChange={event => this.handleInputChange(event, this.validateDefect)}
                                    error={this.state.defect.err}
                                />
                            </div>

                            {/*equipment*/}
                            <div className={classes.formItem}>
                                <InputLabel htmlFor="equipment-input">Equipment</InputLabel>
                                <Input
                                    name='equipment'
                                    id='equipment-input'
                                    className={classes.propertyInput}
                                    onChange={event => this.handleInputChange(event, this.validateEquipment)}
                                    error={this.state.equipment.err}
                                />
                            </div>

                            {/*appearance*/}
                            <div className={classes.formItem}>
                                <InputLabel htmlFor="appearance-input">Appearance</InputLabel>
                                <Input
                                    name='appearance'
                                    id='appearance-input'
                                    className={classes.propertyInput}
                                    onChange={event => this.handleInputChange(event, this.validateAppearance)}
                                    error={this.state.appearance.err}
                                />
                            </div>

                            {/*password*/}
                            <div className={classes.formItem}>
                                <InputLabel htmlFor="password-input">Password</InputLabel>
                                <Input
                                    name='password'
                                    id='password-input'
                                    className={classes.propertyInput}
                                    onChange={event => this.handleInputChange(event, this.validatePassword)}
                                    error={this.state.password.err}
                                />
                            </div>

                            {/*receiverNotes*/}
                            <div className={classes.formItem}>
                                <InputLabel htmlFor="receiverNotes-input">Notes</InputLabel>
                                <Input
                                    name='receiverNotes'
                                    id='receiverNotes-input'
                                    className={classes.propertyInput}
                                    onChange={event => this.handleInputChange(event, this.validateReceiverNotes)}
                                    error={this.state.receiverNotes.err}
                                />
                            </div>

                            {/*estimatedPrice*/}
                            <div className={classes.formItem}>
                                <InputLabel htmlFor="estimatedPrice-input">Price</InputLabel>
                                <Input
                                    name='estimatedPrice'
                                    id='estimatedPrice-input'
                                    className={classes.propertyInput}
                                    onChange={event => this.handleInputChange(event, this.validateEstimatedPrice)}
                                    error={this.state.estimatedPrice.err}
                                />
                            </div>

                            {/*is quckly*/}
                            <div className={classes.formItem}>
                                <div>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.isQuickly}
                                                onChange={this.handleCheckBoxChange}
                                                color = 'primary'
                                            />
                                        }
                                        label="Quickly"
                                    />
                                </div>
                            </div>

                            {/*action buttons*/}
                            <div className={classes.formItem}>
                                <div>
                                    <Button onClick={this.handleSaveButton} disabled={this.isNotValidForm()} className={classes.saveButton} variant="contained" color="primary">
                                        Save
                                    </Button>
                                    <Button onClick={toggleDrawer} variant="contained" color="secondary">
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </GridList>
                </Drawer>
            </div>
        );
    }

    isNotValidForm = () => {
        let fields = this.state;


        // если id < 0, то пользователь еще ничего не выбрал из  select'а
        // по дефолту там -1
        let isNotValidOrderType     = fields.orderType.id < 0;
        let isNotValidDeviceType    = fields.deviceType.id < 0;

        let isNotValidImei           = fields.imei.err;
        let isNotValidBrand          = fields.brand.err;
        let isNotValidModel          = fields.model.err;
        let isNotValidEquipment      = fields.equipment.err;
        let isNotValidAppearance     = fields.appearance.err;
        let isNotValidPassword       = fields.password.err;
        let isNotValidDefect         = fields.defect.err;
        let isNotValidReceiverNotes  = fields.receiverNotes.err;
        let isNotValidEstimatedPrice = fields.estimatedPrice.err;

        return  isNotValidOrderType||
                isNotValidDeviceType||
                isNotValidImei||
                isNotValidBrand||
                isNotValidModel||
                isNotValidEquipment||
                isNotValidAppearance||
                isNotValidPassword||
                isNotValidDefect||
                isNotValidReceiverNotes||
                isNotValidEstimatedPrice;
    };

    handleSaveButton = () => {
        let s = this.state;

        let order = {
            imei: s.imei.value,
            brand: s.brand.value,
            model: s.model.value,
            equipment: s.equipment.value,
            appearance: s.appearance.value,
            password: s.password.value,
            defect: s.defect.value,
            receiverNotes: s.receiverNotes.value,
            estimatedPrice: s.estimatedPrice.value,
            isQuickly: s.isQuickly,
            orderType: {
                id: s.orderType.id
            },
            client: {
                id: s.client.id
            },
            deviceType: {
                id: s.deviceType.id
            }
            // company id на backend'е добавится
        };

        this.props.onClickSaveOrderButton(order);
    };

    handleCheckBoxChange = () => {
        let c = this.state.isQuickly;

        this.setState({
            isQuickly: !c
        })
    };

    handleInputChange = (event, validateFunction) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        const validation = validateFunction(inputValue);

        this.setState({
            [inputName]:{
                value: inputValue,
                err: validation.err
            }
        });
    };

    handleSelectChange = name => event => {
        this.setState({
            [name]: {
                id: event.target.value
            }
        });
    };

    validateImei = (imei) => {
        const PHONE_REGEX = RegExp('^[0-9, -]+$');

        if(!PHONE_REGEX.test(imei)){
            return {
                err: true
            }
        }

        return {
            err: false
        }
    };

    validateBrand = (brand) => {
        if(brand.length > MAX_BRAND_LENGTH){
            return {
                err: true,
            }
        }

        return {
            err: false,
        }
    };

    validateModel = (model) => {
        if(model.length > MAX_MODEL_LENGTH){
            return {
                err: true,
            }
        }

        return {
            err: false,
        }
    };

    validateEquipment = (equipment) => {
        if(equipment.length > MAX_EQUIPMENT_LENGTH){
            return {
                err: true,
            }
        }

        return {
            err: false,
        }
    };

    validateAppearance = (appearance) => {
        if(appearance.length > MAX_APPEARANCE_LENGTH){
            return {
                err: true,
            }
        }

        return {
            err: false,
        }
    };

    validatePassword = (password) => {
        if(password.length > MAX_PASSWORD_LENGTH_ON_CLIENT_DEVICE){
            return {
                err: true,
            }
        }

        return {
            err: false,
        }
    };

    validateDefect = (defect) => {
        if(defect.length > MAX_DEFECT_LENGTH){
            return {
                err: true,
            }
        }

        return {
            err: false,
        }
    };

    validateReceiverNotes = (receiverNotes) => {
        if(receiverNotes.length > MAX_RECEIVER_NOTES_LENGTH){
            return {
                err: true,
            }
        }

        return {
            err: false,
        }
    };

    validateEstimatedPrice = (price) => {
        const PRICE_REGEX = RegExp('^[0-9]+$');

        if(!PRICE_REGEX.test(price)){
            return {
                err: true,
            }
        }

        return {
            err: false,
        }
    };
}

export default withStyles(styles)(RightDrawer);