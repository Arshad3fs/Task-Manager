import React from 'react';
import { Checkbox, FormControl, FormControlLabel, TextField } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import { USER_DETAILS } from '../../utils/AppConstants';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundImage: "linear-gradient(45deg, #EB984E, transparent)"
    },
    header: {
        textAlign: "center",
        padding: "20px",
        borderBottom: "1px solid #00000029"
    },
    headerText: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#00000091"
    },
    formStyle: {
        width: "300px",
        height: "545px",
        backgroundColor: "#F2F3F4",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column"
    },
    formElement: {
        margin: "10px 20px"
    },
    buttonStyle: {
        backgroundColor: "#EB984E",
        color: "white",
        fontWeight: "bold",
        padding: "10px 20px",
        border: "none",
        borderRadius: "3px",
        cursor: "pointer",
        outline: "none",
        fontSize: "14px"
    },
    hyperLink: {
        display: "inline-block",
        fontWeight: "bold",
        textDecoration: "none",
        float: "right",
        color: "#EB984E",
        cursor: "pointer"
    },
    signupControl: {
        fontSize: "14px",
        display: "inline"
    },
    rememberMeStyle: {
        marginTop: "-10px"
    }
  }),
);

function Signup(){
    
    const classes = useStyles();
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const history = useHistory();
    
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }
    const handleSignUp = (event) => {
        let users = JSON.parse(localStorage.getItem(USER_DETAILS));
        users = users ? users : [];
        users.push({firstName, lastName, email, password});        
        localStorage.setItem(USER_DETAILS, JSON.stringify(users));
        history.push("welcome");
    }

    return <div className={classes.container}>
        <form id="signinForm" noValidate autoComplete="off" className={classes.formStyle}>
            <div className={classes.header}>
                <label className={classes.headerText}>Task Manager</label>
            </div>
            <FormControl className={classes.formElement}>
                <TextField id="firstName" label="First Name" value={firstName} onChange={handleFirstNameChange} />
            </FormControl>
            <FormControl className={classes.formElement}>
                <TextField id="lastName" label="Last Name" value={lastName} onChange={handleLastNameChange} />
            </FormControl>
            <FormControl className={classes.formElement}>
                <TextField id="email" label="Email" value={email} onChange={handleEmailChange} />
            </FormControl>
            <FormControl className={classes.formElement}>
                <TextField id="password" type="password" label="Password" value={password} onChange={handlePasswordChange} />
            </FormControl>
            <FormControl className={classes.formElement}>
                <TextField id="confirmPassword" type="password" label="Confirm Password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            </FormControl>
            <FormControl className={[classes.formElement, classes.rememberMeStyle]} >
                <FormControlLabel control={ <Checkbox name="rememberMe" color="primary" /> }
                                  label="I accept terms & conditions"
                />
            </FormControl>
            <FormControl className={classes.formElement} >
                <button className={classes.buttonStyle} onClick={handleSignUp} >Sign Up</button>
            </FormControl>
            <FormControl className={[classes.formElement, classes.signupControl]} >
                <label>Already have an account?</label>
                <Link to="/signin" className={classes.hyperLink}> Sign In </Link>
            </FormControl>
        </form>
    </div>;
}

export default Signup;