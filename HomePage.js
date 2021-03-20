
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";
import { Button, Card, CardContent } from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import "./../style.css"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { PAGE_TWO_ERROR_TEXT } from './../common/constant';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from '@date-io/date-fns';
import DateTimePicker from 'react-datetime-picker';

const item = {
    id: v4(),
    taskName: "Clean the house",
    accountName: "Josh Biden",
    dueDate: "4",
    assignedTo: "ST"
}

const item2 = {
    id: v4(),
    taskName: "Wash the car",
    accountName: "Narender Modi",
    dueDate: "3",
    assignedTo: "ST"
}

const item3 = {
    id: v4(),
    taskName: "Do nothing",
    accountName: "Mamta Banerjee",
    dueDate: "1",
    assignedTo: "TT"
}

const InitialList = () => {

    const [openModal, setopenModal] = useState(false)
    const [text, setText] = useState("")
    const [textError, setTextError] = useState(false)
    const [textErrorLabel, setTextErrorLabel] = useState("")
    const [description, setDescription] = useState("")
    const [descriptionError, setDescriptionError] = useState(false)
    const [descriptionErrorLabel, setDescriptionErrorLabel] = useState("")
    const [account, setAccount] = useState("")
    const [accountError, setAccountError] = useState(false)
    const [accountErrorLabel, setAccountErrorLabel] = useState("")
    const [assignedTo, setAssignedTo] = useState("")
    const [assignedToError, setAssignedToError] = useState(false)
    const [assignedToErrorLabel, setAssignedToErrorLabel] = useState("")
    const [status, setStatus] = useState("")
    const [statusError, setStatusError] = useState(false)
    const [statusErrorLabel, setStatusErrorLabel] = useState("")
    const [priority, setPriority] = useState("")
    const [priorityError, setPriorityError] = useState(false)
    const [priorityErrorLabel, setPriorityErrorLabel] = useState("")
    const [dueDate, setDueDate] = useState(new Date())
    const [dueDateError, setDueDateError] = useState(true)
    const [dueDateErrorLabel, setDueDateErrorLabel] = useState("")
    const [dueTime, setDueTime] = useState(new Date())
    const [dueTimeError, setDueTimeError] = useState(true)
    const [dueTimeErrorLabel, setDueTimeErrorLabel] = useState("")
    const [weeks, setWeeks] = useState("")
    const [saveDetailsEnable, setSaveDetailsEnable] = useState(true)
    const [state, setState] = useState({
        "todo": {
            title: "Todo",
            items: [item, item2]
        },
        "in-progress": {
            title: "In Progress",
            items: [item3]
        },
        "done": {
            title: "Completed",
            items: []
        }
    })

    const handleDragEnd = ({ destination, source }) => {
        if (!destination) {
            return
        }

        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return
        }

        // Creating a copy of item before removing it from state
        const itemCopy = { ...state[source.droppableId].items[source.index] }

        setState(prev => {
            prev = { ...prev }
            // Remove from previous items array
            prev[source.droppableId].items.splice(source.index, 1)


            // Adding to new items array location
            prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

            return prev
        })
    }

    const addItem = () => {
        setState(prev => {
            return {
                ...prev,
                todo: {
                    title: "Todo",
                    items: [
                        {
                            id: v4(),
                            taskName: text,
                            accountName: account,
                            dueDate: weeks,
                            assignedTo: assignedTo


                        },
                        ...prev.todo.items
                    ]
                }
            }
        })
        setText("")
    }
    const handleAddSub = () => {
        setopenModal(true)
    };

    const handleDateChange = (event) => {
        setDueTimeError(false)
        setDueTimeErrorLabel("")
        setDueDateError(false)
        setDueDateError("")
        setSaveDetailsEnable(true)
        let dt1 = new Date()
        let dt2 = event
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 7);
        let weeks = Math.abs(Math.round(diff));
        // console.log(weeks)
        setWeeks(weeks)
    }

    const handleCloseSub = () => {
        setopenModal(false)
        setTextError(false)
        setTextErrorLabel("")
        setDescriptionError(false)
        setDescriptionErrorLabel("")
        setAccountError(false)
        setAccountErrorLabel("")
        setAssignedToError(false)
        setAssignedToErrorLabel("")
        setStatusError(false)
        setStatusErrorLabel("")
        setPriorityError(false)
        setPriorityErrorLabel("")
        setDueTimeError(false)
        setDueTimeErrorLabel("")
        setDueDateError(false)
        setDueDateError("")
        setSaveDetailsEnable(true)
    };

    const handleInputChange = (event, key) => {
        const value = event.target.value

        switch (key) {
            case 'text': setText(value)
                break;
            case 'description': setDescription(value)
                break;
            case 'account': setAccount(value)
                break;
            case 'assignedTo': setAssignedTo(value)
                break;
            case 'status': setStatus(value)
                break;
            case 'priority': setPriority(value)
                break;
        }

        setTextError(false)
        setTextErrorLabel("")
        setDescriptionError(false)
        setDescriptionErrorLabel("")
        setAccountError(false)
        setAccountErrorLabel("")
        setAssignedToError(false)
        setAssignedToErrorLabel("")
        setPriorityError(false)
        setPriorityErrorLabel("")
        setStatusError(false)
        setStatusErrorLabel("")
        setSaveDetailsEnable(true)
    }

    const validationDynamic = () => {
        if (text === "") {
            setSaveDetailsEnable(false)
            setTextError(true)
            setTextErrorLabel(PAGE_TWO_ERROR_TEXT.firstNameLabel)
            return
        }
        else if (description === "") {
            setSaveDetailsEnable(false)
            setDescriptionError(true)
            setDescriptionErrorLabel(PAGE_TWO_ERROR_TEXT.firstNameLabel)
            return;
        }
        else if (account === "") {
            setSaveDetailsEnable(false)
            setAccountError(true)
            setAccountErrorLabel(PAGE_TWO_ERROR_TEXT.firstNameLabel)
            return;
        }
        else if (assignedTo === "") {
            setSaveDetailsEnable(false)
            setAssignedToError(true)
            setAssignedToErrorLabel(PAGE_TWO_ERROR_TEXT.firstNameLabel)
            return;
        }
        else if (status === "") {
            setSaveDetailsEnable(false)
            setStatusError(true)
            setStatusErrorLabel(PAGE_TWO_ERROR_TEXT.firstNameLabel)
            return;
        }
        else if (priority === "") {
            setSaveDetailsEnable(false)
            setPriorityError(true)
            setPriorityErrorLabel(PAGE_TWO_ERROR_TEXT.firstNameLabel)
            return;
        }
        else if (weeks === "") {
            setSaveDetailsEnable(false)
            setDueDateError(true)
            setDueDateErrorLabel(PAGE_TWO_ERROR_TEXT.firstNameLabel)
            return;
        }
        else if (dueTime === "") {
            setSaveDetailsEnable(false)
            setDueTimeError(true)
            setDueTimeErrorLabel(PAGE_TWO_ERROR_TEXT.firstNameLabel)
            return;
        }
        setopenModal(false)
        addItem()
    }

    const draggableComponent = () => {

        return (
            <div className="row">
                <DragDropContext onDragEnd={handleDragEnd}>
                    {_.map(state, (data, key) => {

                        return (
                            <div key={key} className={""}>
                                <div className="col-md-3">
                                    <Card className="custom-card card-dashboard top-head">
                                        <CardContent >
                                            <h3 className="head-title"> {data.title} ({data.items.length})</h3>
                                        </CardContent>
                                    </Card>
                                    <Droppable droppableId={key}>
                                        {(provided, snapshot) => {

                                            return (
                                                <Card className="custom-card card-dashboard more-height"
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                >
                                                    {data.items.map((el, index) => {
                                                        // console.log("load2", el)
                                                        return (
                                                            <Draggable key={el.id} index={index} draggableId={el.id}>
                                                                {(provided, snapshot) => {
                                                                    // console.log('loadSnap', snapshot)
                                                                    return (
                                                                        <div className="background-grey mt-4"
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}>
                                                                            <div className="row">
                                                                                <div className="col-md-10">
                                                                                    <h3 className="intitle text-left">{el.taskName}</h3>
                                                                                </div>
                                                                                <div className="col-md-2 emoji text-right">
                                                                                    <SentimentVeryDissatisfiedIcon />
                                                                                </div>
                                                                                <div className="col-md-8">
                                                                                    <h3 className="intitle-account text-left">{el.accountName} </h3>
                                                                                </div>
                                                                                <div className="col-md-9">
                                                                                    <h3 className="intitle-due text-left mt-2">{el.dueDate} week(s)</h3>
                                                                                </div>
                                                                                <div className="col-md-2">
                                                                                    <h3 className="intitle-due text-right mt-2">{el.assignedTo} </h3>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }}
                                                            </Draggable>
                                                        )
                                                    })}
                                                    {provided.placeholder}
                                                </Card>
                                            )
                                        }}
                                    </Droppable>
                                </div>
                            </div>
                        )
                    })}
                </DragDropContext>
            </div>
        )
    }


    const drawerComponent = () => {
        return (
            <Dialog
                open={openModal}
                onClose={handleCloseSub}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <h3 className="modal-title">Add Task </h3>
                <div className="max-width-in">
                    <form noValidate autoComplete="off">
                        <div className="row mt-3" >
                            <div className="col-md-8 mt-3">
                                <TextField id="standard-basic" label="Task Name"
                                    value={text}
                                    error={textError}
                                    helperText={textErrorLabel}
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    className="custom-input"
                                    fullWidth
                                    //  disabled={isAccountDetailsDisabled}
                                    name="text"
                                    data-id="text"
                                    onChange={(event) =>
                                        handleInputChange(event, "text")
                                    }

                                />
                            </div>
                            <div className="col-md-12 mt-3">
                                <textarea rows={4} cols={48} className="lead-textarea custom-input full-width"
                                    value={description}
                                    name="remark"
                                    data-id="remark"
                                    onChange={(event) =>
                                        handleInputChange(event, "description")
                                    }
                                    placeholder="Description"
                                >
                                </textarea>
                                {descriptionError ?
                                    (<FormHelperText>{descriptionErrorLabel}</FormHelperText>
                                    ) : ""
                                }
                            </div>
                            <div className=" col-md-8 mt-3 ">
                                <TextField id="standard-basic" label="Account"
                                    value={account}
                                    error={accountError}
                                    helperText={accountErrorLabel}
                                    type="text"
                                    margin="normal"
                                    variant="outlined"
                                    fullWidth
                                    className="custom-input"
                                    // disabled={isAccountDetailsDisabled}
                                    name="account"
                                    data-id="account"
                                    onChange={(event) =>
                                        handleInputChange(event, "account")
                                    }
                                />
                            </div>

                            <div className="col-md-8 mt-3 form-select">
                                <FormControl >
                                    <InputLabel id="demo-simple-select-helper-label">Assigned To</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={assignedTo}
                                        onChange={(event) =>
                                            handleInputChange(event, "assignedTo")
                                        }
                                        fullWidth>
                                        <MenuItem value="ST">Support Team</MenuItem>
                                        <MenuItem value="TT">Tech Team</MenuItem>
                                        <MenuItem value="SlT">Sales Team</MenuItem>
                                    </Select>
                                    {assignedToError ?
                                        (<FormHelperText>{assignedToErrorLabel}</FormHelperText>
                                        ) : ""
                                    }
                                </FormControl>
                            </div>
                            <div className="col-md-8 mt-3 form-select">
                                <FormControl >
                                    <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={status}
                                        onChange={(event) =>
                                            handleInputChange(event, "status")
                                        }
                                        fullWidth>
                                        <MenuItem value="todo">ToDo</MenuItem>
                                        <MenuItem value="inProgress">In Progress</MenuItem>
                                        <MenuItem value="completed">Completed</MenuItem>
                                    </Select>
                                    {statusError ?
                                        (<FormHelperText>{statusErrorLabel}</FormHelperText>
                                        ) : ""
                                    }
                                </FormControl>
                            </div>
                            <div className="col-md-8 mt-3 form-select">
                                <FormControl >
                                    <InputLabel id="demo-simple-select-helper-label">Priority</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={priority}
                                        onChange={(event) =>
                                            handleInputChange(event, "priority")
                                        }
                                        fullWidth>
                                        <MenuItem value="todo">Low</MenuItem>
                                        <MenuItem value="inProgress">Medium</MenuItem>
                                        <MenuItem value="completed">High</MenuItem>
                                    </Select>
                                    {priorityError ?
                                        (<FormHelperText>{priorityErrorLabel}</FormHelperText>
                                        ) : ""
                                    }
                                </FormControl>
                            </div>

                            <div className="col-md-6 mt-3 form-select">
                                <div className="date-styling mt-4">
                                    <DateTimePicker
                                        disableClock={true}
                                        onChange={handleDateChange}
                                        value={dueDate}
                                        format="y-MM-dd"
                                        required={true}
                                    />
                                    {dueDateError ?
                                        (<FormHelperText className="mt-2">{dueDateErrorLabel}</FormHelperText>
                                        ) : ""
                                    }
                                </div>
                            </div>
                            <div className="col-md-6 mt-3 form-select">
                                <div className="date-styling mt-4">
                                    <DateTimePicker
                                        disableCalendar={true}
                                        onChange={handleDateChange}
                                        value={dueTime}
                                        format="h:mm:ss a"
                                        required={true}
                                    />
                                    {dueTimeError ?
                                        (<FormHelperText className="mt-2">{dueTimeErrorLabel}</FormHelperText>
                                        ) : ""
                                    }
                                </div>
                            </div>

                            <div className="col-md-6 mt-3">
                                <Button variant="contained" color="primary" className={(saveDetailsEnable === true) ? ("btn-class mt-4") : ("btn-class-default mt-4")} onClick={() => validationDynamic()}>Submit</Button>
                            </div>

                        </div>

                    </form>
                </div>

                <DialogActions>
                    <Button onClick={handleCloseSub} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <div>
            <div>
                <h3 className="modal-title-env">Environment: <b>{process.env.NODE_ENV} </b></h3>
                {console.log("yep", process.env)}
                <Button variant="contained" color="primary" className={"btn-class menu-icon mt-4"} onClick={handleAddSub}>Add task</Button>
            </div>

            {draggableComponent()}
            {drawerComponent()}
        </div>
    );
};

export default InitialList;