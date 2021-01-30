

import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            width: "98.2%",
            padding: "0 10px",
            height: "60px",
            backgroundColor: "#eb984e0f",
            position: "absolute",
            bottom: "0"

        }
    })
);

function Footer(){
    const classes = useStyles();
    return (
        <div className={classes.container}>
            {/* This is footer */}
        </div>
    );
}

export default Footer;
