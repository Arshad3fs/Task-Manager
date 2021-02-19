export const SELECT_USER_BY_EMAIL = "SELECT * FROM USERS WHERE USEREMAIL=$1";
export const SELECT_USER_ID_BY_EMAIL = "SELECT USERID FROM USERS WHERE USEREMAIL=$1";
export const SELECT_USER_ID_BY_EMAIL_AND_PASSWORD = "SELECT USERID FROM USERS WHERE USEREMAIL=$1 AND PASSWORD=$2";
export const INSERT_USER = "INSERT INTO USERS(userEmail, PASSWORD, FIRSTNAME, LASTNAME, CREATEDON) VALUES($1, $2, $3, $4, $5)";
export const INSERT_TASK = "INSERT INTO TASK(USERID, TITLE, CATEGORY, STATUS, DESCRIPTION, STARTdATE, ENDDATE, CREATEDON) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)";
export const UPDATE_TASK = "UPDATE TASK SET TITLE=$1, CATEGORY=$2, STATUS=$3, DESCRIPTION=$4, STARTdATE=$5, ENDDATE=$6 WHERE TASKID=$7";
export const SELECT_TASK_BY_TITLE = "SELECT * FROM TASK WHERE upper(TITLE)=$1";
export const DELETE_TASK_BY_ID = "DELETE FROM TASK WHERE TASKID=$1";
export const SELECT_TASKS_BY_USER_ID = "SELECT * FROM TASK WHERE USERID=$1";