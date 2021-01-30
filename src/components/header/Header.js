
import { createStyles, makeStyles, Tooltip } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { useHistory } from "react-router-dom";
import logo from '../../images/taskManagerLogo.png';
import { ROUTES } from "../../utils/AppConstants";

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            padding: "0 10px",
            height: "60px",
            backgroundImage: "linear-gradient(45deg, #eb984ecc, transparent)"
        },
        leftContainer: {
            display: "inline-block",
            padding: "10px",
            color: "#000000b3",
            fontSize: "25px",
            fontWeight: "bold",
            height: 50
        },
        rightContainer: {
            display: "inline-block",
            float: "right",
            padding: "15px",
            color: "#000000b3",
            cursor: "pointer"
        },
        iconStyle: {
            fontSize: "28px",
            "&:hover": {
                color: "#e47a1b"
            }
        },
        logo: {
            width: "150px",
            height: "150px",
            position: "absolute",
            top: "-43px",
            left: "15px",
            cursor: "pointer"
        }
    })
);

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      backgroundColor: theme.palette.common.black,
    },
  }));
  
  function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();
  
    return <Tooltip arrow classes={classes} {...props} />;
  }

function Header(){
    const classes = useStyles();
    const history = useHistory();

    const gotoWelcomePage = () => history.push(ROUTES.welcome);
    
    
    return (
        <div className={classes.container}>
            <div className={classes.leftContainer} onClick={gotoWelcomePage}>
                <img src={logo} className={classes.logo} alt="Task Manager" />
            </div>
            <div className={classes.rightContainer}>
            <BootstrapTooltip title="Manage Users">
                <SupervisedUserCircleIcon style={{marginRight: "10px"}} className={classes.iconStyle}></SupervisedUserCircleIcon>
            </BootstrapTooltip>
            <BootstrapTooltip title="My Account">
                <AccountCircleIcon className={classes.iconStyle}></AccountCircleIcon>
            </BootstrapTooltip>    
            </div>
        </div>
    );
}

export default Header;
