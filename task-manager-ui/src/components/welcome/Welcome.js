import { createStyles, makeStyles } from "@material-ui/core";
import { apps } from "../../data/apps";
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useHistory } from 'react-router-dom';
import InsertChartIcon from '@material-ui/icons/InsertChart';

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            backgroundImage: "linear-gradient(45deg, #EB984E, transparent)",
            minHeight: "100vh",
            overflow: "hidden"
        },
        welcomeText: {
            padding: "70px 30px 40px 200px",
            fontSize: "35px",
            color: "#000000bf",
            fontWeight: "600"
        },
        appsContainer: {
            display: "grid",
            gridColumnGap: "60px",
            gridTemplateColumns: "repeat(auto-fit, 300px)",
            padding: "0px 200px"

        },
        appContainer: {
            width: "312px",
            height: "170px",
            overflow: "hidden",
            position: "relative",
            boxShadow: "0px 13px 10px -7px rgba(0, 0, 0,0.1)",
            transition: "all .4s cubic-bezier(0.175, 0.885, 0, 1)",
            marginRight: "24px",
            borderRadius: "3px",
            color: "#000000bf",
            fontWeight: "600",
            backgroundColor: "#FFFFFF",
            cursor: "pointer",
            "&:hover": {
                color: "#FFFFFF",
                transform: "scale(1.10, 1.10)",
                boxShadow: "0px 30px 18px -8px rgba(0, 0, 0,0.1)",
                backgroundColor: theme.palette.secondary.main
            }
        },
        titleContainer: {
            padding: "25px"
        },
        iconContainer: {
            float: "right",
            display: "inline"
        },
        appTitle: {
            fontSize: "20px",
            display: "inline"
        },
        appDesc: {
            padding: "25px",
            fontWeight: "400"
        }
    })
);

function Welcome(){
    const classes = useStyles();
    const history = useHistory();
    const handleClick = (app) => {
        history.push(app.path);
    }
    return <div className={classes.container}>
                <Header></Header>
                <div className={classes.welcomeText}>Welcome to Task Manager</div>
                <div className={classes.appsContainer}>
                    {apps.map((app, index) => {
                        return (
                        <div className={classes.appContainer} key={index} onClick={()=>handleClick(app)}>
                            <div className={classes.titleContainer}>
                                <div className={classes.appTitle}>{app.title}</div>
                                <div className={classes.iconContainer}> 
                                    {app.title === "My Tasks" ? 
                                        <FormatListBulleted /> : app.title === "My Reports" ? <InsertChartIcon /> : 
                                        <AssignmentIcon />}
                                </div>
                            </div>
                            <div className={classes.appDesc}>{app.desc}</div>
                        </div>)
                    })}
                </div>
                <Footer></Footer>
        </div>
}

export default Welcome;
