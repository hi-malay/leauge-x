import { Card } from '@material-ui/core';
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { PAGE_TWO_ERROR_TEXT } from './../common/Drawer/constant';
import { Redirect } from "react-router-dom";
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ContextMain } from "./../common/Drawer/ContextMain"
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import deleteIcon from "../HomePage/ic_close_blue.svg"
import GamePage from "../GamePage/GamePage"
class HomePage extends React.Component<any,
    {
        name: string,
        nameError: boolean,
        nameErrorLabel: string,
        saveDetailsEnable: any,
        date_match_modal: boolean,
        room_arr: any,
        roomErrorLabel: string,
        roomError: boolean,
        room: string,
        room2ErrorLabel: string,
        room2Error: boolean,
        room2: string,
        redirect: boolean



    }> {

    constructor(props: any) {
        super(props);

        this.state =
        {

            name: '',
            nameError: false,
            nameErrorLabel: '',
            saveDetailsEnable: true,
            date_match_modal: false,
            roomErrorLabel: '',
            roomError: false,
            room: '',
            room2ErrorLabel: '',
            room2Error: false,
            room2: '',
            redirect: false,
            room_arr: []

        }

    }

    handleCloseSub = () => {
        this.setState({ date_match_modal: false, name: "", nameError: false, nameErrorLabel: "", saveDetailsEnable: true })
    };
    openModal = () => {
        this.setState({ date_match_modal: true })
    }
    handleInputChange = (event: any, type: any) => {
        console.log("av", event.target.value)
        if (type === "name") {
            this.setState({ name: event.target.value });
        }
        else if (type === "room") {
            this.setState({ room: event.target.value });
        }
        else if (type === "room2") {
            this.setState({ room2: event.target.value });
        }


        this.setState({
            nameError: false,
            nameErrorLabel: '',
            roomError: false,
            roomErrorLabel: '',
            room2Error: false,
            room2ErrorLabel: '',
            saveDetailsEnable: true
        })
    };

    validationDynamic = (event: any, type: any) => {
        if (this.state.name === "") {
            this.setState({ nameError: true, nameErrorLabel: PAGE_TWO_ERROR_TEXT.firstNameLabel, saveDetailsEnable: false })
            return;
        }

        const room_arr = [...this.state.room_arr];
        if (type === "add") {
            if (this.state.name !== "") {
                room_arr.push(this.state.name);
                this.setState({ room_arr, name: "", date_match_modal: false })
            }
        }
        else if (type === "delete") {

            const index = room_arr.indexOf(event)
            room_arr.splice(index, 1);
            this.setState({ room_arr });
        }
    }

    enterGame = () => {
        if (this.state.room !== this.state.room2 || this.state.room == "" || this.state.room2 == "") {
            this.setState({ roomError: true, roomErrorLabel: PAGE_TWO_ERROR_TEXT.roomErrorLabel, saveDetailsEnable: false })
            return;
        }
        this.setState({ redirect: true })

    }

    render() {
        if (this.state.redirect) {
            return (
                // <GamePage />
                <Redirect to={{
                    pathname: `/game`
                }} />
            )
        }
        return (
            <div>
                <Card className="home-card">
                    <Button variant="contained" className="btn-class mt-4" color="primary" onClick={() => this.openModal()}>Create Room</Button>
                    <hr></hr>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="modal-title mb-4">Room Lists</div>
                            {this.state.room_arr.length >= 1 ? (this.state.room_arr.map((data: any, index: any) => {
                                return (
                                    <div className="tag" key={index} >
                                        <Chip
                                            variant="outlined"
                                            label={data}
                                            deleteIcon={
                                                <img src={deleteIcon} className="chip-icon" alt="icom" />
                                            }
                                            className="mb-2 chips-style"
                                            data-id="delete"
                                            //onClick={(data) => this.handleAddPerson(data)}
                                            onDelete={(data) => this.validationDynamic(data, "delete")}
                                        />
                                    </div>
                                );
                            })) : <div className="modal-subtitle">No rooms found</div>}


                        </div>
                        <div className="col-md-6">

                            <div className="modal-title mb-4">Select Room for User</div>
                            <div className="row">
                                <div className="col-md-12">
                                    <FormControl >
                                        <InputLabel id="demo-simple-select-helper-label">User1</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={this.state.room}
                                            onChange={(event) => this.handleInputChange(event, "room")}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {this.state.room_arr.length !== undefined
                                                ? this.state.room_arr.map((row: any, i: any) => (
                                                    <MenuItem value={row}>{row}</MenuItem>
                                                ))
                                                : (<CircularProgress color="inherit" size={30} className="table-loader" />)
                                            }

                                        </Select>

                                    </FormControl>
                                </div>
                                <div className="col-md-12 mt-3">
                                    <FormControl >
                                        <InputLabel id="demo-simple-select-helper-label">User2</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={this.state.room2}
                                            onChange={(event) => this.handleInputChange(event, "room2")}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {this.state.room_arr.length !== undefined
                                                ? this.state.room_arr.map((row: any, i: any) => (
                                                    <MenuItem value={row}>{row}</MenuItem>
                                                ))
                                                : (<CircularProgress color="inherit" size={30} className="table-loader" />)
                                            }

                                        </Select>

                                    </FormControl>
                                </div>

                            </div>
                        </div>
                    </div>
                    {this.state.roomError ?
                        (<div className="error_box">{this.state.roomErrorLabel}</div >
                        ) : ""
                    }
                    <Button variant="contained" className="btn-class mt-4 text-right" color="primary" onClick={() => this.enterGame()}>Enter Game</Button>
                    <Dialog
                        open={this.state.date_match_modal}
                        onClose={this.handleCloseSub}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <h3 className="modal-title">Add Room</h3>
                        <div className="max-width-in">
                            <form noValidate autoComplete="off">
                                <div className="row mt-3" >
                                    <div className="col-md-8 mt-3">
                                        <TextField id="standard-basic" label="Room Name"
                                            value={this.state.name}
                                            error={this.state.nameError}
                                            helperText={this.state.nameErrorLabel}
                                            type="text"
                                            margin="normal"
                                            variant="outlined"
                                            className="custom-input"
                                            fullWidth
                                            //  disabled={isAccountDetailsDisabled}
                                            name="text"
                                            data-id="text"
                                            onChange={(event) =>
                                                this.handleInputChange(event, "name")
                                            }
                                        />
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        <Button variant="contained" color="primary" className={(this.state.saveDetailsEnable === true) ? ("btn-class mt-4") : ("btn-class-default mt-4")} onClick={(data) => this.validationDynamic(data, "add")}>Submit</Button>
                                    </div>

                                </div>

                            </form>
                        </div>

                        <DialogActions>
                            <Button onClick={this.handleCloseSub} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Card>

            </div>
        );
    }
}

export default HomePage;