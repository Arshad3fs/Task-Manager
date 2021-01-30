
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
        height: "355px",
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

function Signin(){
    
    const classes = useStyles();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();
    
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleSignIn = (event) => {
        const registeredUsers = JSON.parse(localStorage.getItem(USER_DETAILS));
        if(registeredUsers.some( user => user.email === email && user.password === password))
            history.push("welcome");
        return;
    }

    return <div className={classes.container}>
        <form id="signinForm" noValidate autoComplete="off" className={classes.formStyle}>
            <div className={classes.header}>
                <label className={classes.headerText}>Task Manager</label>
            </div>
            <FormControl className={classes.formElement}>
                <TextField id="email" label="Email" value={email} onChange={handleEmailChange} />
            </FormControl>
            <FormControl className={classes.formElement}>
                <TextField id="password" type="password" label="Password" value={password} onChange={handlePasswordChange} />
            </FormControl>
            <FormControl className={[classes.formElement, classes.rememberMeStyle]} >
                <FormControlLabel control={ <Checkbox name="rememberMe" color="primary" /> }
                                  label="Remember me"
                />
            </FormControl>
            <FormControl className={classes.formElement} >
                <button className={classes.buttonStyle} onClick={handleSignIn} >Sign In</button>
            </FormControl>
            <FormControl className={[classes.formElement, classes.signupControl]} >
                <label>No account yet?</label>
                <Link to="/signup" className={classes.hyperLink}> Sign Up </Link>
            </FormControl>
        </form>
    </div>;
}

export default Signin;
