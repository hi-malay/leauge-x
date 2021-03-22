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
import _ from "lodash";
import LinearProgress from '@material-ui/core/LinearProgress';

class GamePage extends React.Component<any,
    {
        name: string,
        nameError: boolean,
        nameErrorLabel: string,
        progress: any,
        date_match_modal: boolean,
        roomErrorLabel: string,
        roomError: boolean,
        room: string,
        incrementErrorLabel: string,
        incrementError: boolean,
        increment: any,
        redirect: boolean,
        questions_arr: any,
        newQuestion: any


    }> {

    constructor(props: any) {
        super(props);

        this.state =
        {

            name: '',
            nameError: false,
            nameErrorLabel: '',
            progress: 0,
            date_match_modal: false,
            roomErrorLabel: '',
            roomError: false,
            room: '',
            incrementErrorLabel: '',
            incrementError: false,
            increment: 1,
            redirect: false,
            newQuestion: {},
            questions_arr: [
                {
                    question: "If a leaf falls to the ground in a forest and no one hears it, does it make a sound? ",
                    option: ["Yes", "Option A", "Both", "All of the Above"],
                    correct: "All of the Above",
                    id: 1
                },
                {
                    question: "Divide 30 by half and add ten.",
                    option: ["40.5", "50", "10", "I know this is a trick question, so NONE. Ha!"],
                    correct: "I know this is a trick question, so NONE. Ha!",
                    id: 2
                },
                {
                    question: "which option is correct",
                    option: ["This", "Option A", "Both", "All of the Above"],
                    correct: "All of the Above",
                    id: 3
                },
                {
                    question: "Probablity you were right answering previous question",
                    option: ["10", "20", "50", "0"],
                    correct: "0",
                    id: 4
                },
            ]
        }
    }

    componentDidMount = () => {
        console.log("props", this.props.roomData)
        const timer = setInterval(() => {
            if (this.state.progress >= 100) {
                this.setState({ progress: 0 })
                this.newQuestion()
            }
            else {
                this.setState({ progress: this.state.progress + 10 })
            }
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }

    newQuestion = () => {
        // the commented line is for random question

        let randomVal = Math.floor(Math.random() * (this.state.questions_arr.length) + 1)
        let newQuestion = this.state.questions_arr.filter((data: any) => data.id === randomVal)
        console.log("ddd", randomVal)
        // this line is for series question
        // let newQuestion = this.state.questions_arr.filter((data: any) => data.id === this.state.increment)
        this.setState({ newQuestion: newQuestion, progress: 0 })

        // if (this.state.increment >= this.state.questions_arr.length) {
        //     this.setState({ increment: 1 })
        // }
        // else {
        //     this.setState({ increment: this.state.increment + 1 })
        // }
    }
    handleCloseSub = () => {
        this.setState({ date_match_modal: false })
    };
    match = (data: any) => {

        if (this.state.newQuestion[0].correct === data) {
            this.setState({ redirect: true })
        }
        else {
            this.setState({ redirect: false })
        }
        this.setState({ date_match_modal: true })
    }

    render() {
        return (
            <div>
                <Card className="home-card">
                    <div className="modal-title mb-4 mt-3">Question</div>
                    {this.state.newQuestion.length > 0 ?
                        <div className="row text-left pl-5 pr-4">
                            <div className="col-md-12 mt-3">
                                <div className="question">{this.state.newQuestion[0].question}</div>
                            </div>
                            {this.state.newQuestion[0].option.map((data: any, i: any) => {
                                return (
                                    <div className="col-md-6 mt-4 ">
                                        <div className="child-div option" onClick={() => this.match(data)}>{data}</div>
                                    </div>
                                )
                            })}
                        </div> : <div className="error_que">Please press <b>Next Question</b> to proceed</div>
                    }

                    <Button variant="contained" className="btn-class mt-4 " color="primary" onClick={() => this.newQuestion()}>Next Question</Button>
                </Card>
                <Dialog
                    open={this.state.date_match_modal}
                    onClose={this.handleCloseSub}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    {this.state.redirect ?
                        <h3 className="modal-title-green">Correct Answer</h3> : <h3 className="modal-title-red">Oops! Wrong Answer</h3>
                    }

                    <DialogActions>
                        <Button onClick={this.handleCloseSub} color="primary">
                            Close
                            </Button>
                    </DialogActions>
                </Dialog>
                <div className="mt-5">
                    <LinearProgress variant="determinate" value={this.state.progress} />
                </div>
            </div>
        );
    }
}

export default GamePage;