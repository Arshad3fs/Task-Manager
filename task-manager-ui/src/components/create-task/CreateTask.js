
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import { Checkbox, createStyles, FormControl, FormControlLabel, FormGroup, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import clsx from 'clsx';
import { TASKS, TASK_CATEGORY, TASK_STATUS } from '../../utils/AppConstants';

const Transition = React.forwardRef(function Transition( props, ref ) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) =>
    createStyles({
        title: {
          fontSize: "20px",
          color: "#000000a6",
          fontWeight: "600",
          textAlign: "center"
        },
        inputField: {
          width: "100%",
          marginTop: "10px"
        },
        secDivider: {
          borderBottom: ".5px solid #00000024",
          marginTop: "25px"
        },
        datePicker: {
          width: "48%"
        },
        timePicker: {
          width: "48%",
          marginLeft: "15px"
        },
        filledButton: {
          padding: "10px 40px",
          backgroundColor: "#eb984ef2",
          border: "1.5px solid #eb984ef2",
          borderRadius: "3px",
          fontWeight: "bold",
          outline: "none",
          color: "#000000b3",
          cursor: "pointer"
      },
      disabledButton: {
        opacity: .5,
        cursor: "default"
      },
      secondaryButton: {
        backgroundColor: "white",
        borderColor: "#000000b3",
      },
      actionButton: {
        width: "48.5%"
      },
      error: {
        color: "red"
      }
  })
);

export default function CreateTask(props) {
  const classes = useStyles();
  const { taskToEdit } = props;
  const [formData, setFormData] = React.useState({
    title: taskToEdit ? taskToEdit.title : "",
    category: taskToEdit ? taskToEdit.category : "",
    desc: taskToEdit ? taskToEdit.desc : "",
    status: taskToEdit ? taskToEdit.status : "",
    startDate: taskToEdit ? taskToEdit.startDate : null,
    startTime: taskToEdit ? taskToEdit.startTime : null,
    targetDate: taskToEdit ? taskToEdit.targetDate : null,
    targetTime: taskToEdit ? taskToEdit.targetTime : null,
    isOngoingTask: false
  });

  const reset = () => {
    setFormData({
      title: taskToEdit ? taskToEdit.title : "",
      category: taskToEdit ? taskToEdit.category : "",
      desc: taskToEdit ? taskToEdit.desc : "",
      status: taskToEdit ? taskToEdit.status : "",    
      startDate: taskToEdit ? taskToEdit.startDate : null,
      startTime: taskToEdit ? taskToEdit.startTime : null,
      targetDate: taskToEdit ? taskToEdit.targetDate : null,
      targetTime: taskToEdit ? taskToEdit.targetTime : null,
      isOngoingTask: false
    });
  }

  const formatFormDate = () => {
    const newTask = { ...formData, status: formData.isOngoingTask ? TASK_STATUS.inProgress : taskToEdit ? formData.status : TASK_STATUS.created };
    newTask['startDateStr'] = formData.startDate ? typeof formData.startDate === 'string' ? formData.startDate : formData.startDate.toDateString() : "";
    newTask['targetDateStr'] = formData.targetDate ? typeof formData.targetDate === 'string' ? formData.targetDate : formData.targetDate.toDateString() : "";
    newTask['startTimeStr'] = formData.startTime ? typeof formData.startTime === 'string' ? formData.startTime : formData.startTime.toLocaleTimeString() : "";
    newTask['targetTimeStr'] = formData.targetTime ? typeof formData.targetTime === 'string' ? formData.targetTime : formData.targetTime.toLocaleTimeString() : "";
    return newTask;
  }

  const createNewTask = () => {
    let tasks = JSON.parse(localStorage.getItem(TASKS));
    tasks = tasks ? tasks : [];
    
    const newTask = formatFormDate();
    
    if( taskToEdit ) {
      const indexOfTask = tasks.findIndex(task => task.title === taskToEdit.title );
      tasks[indexOfTask] = newTask;
    } else {
      tasks.push(newTask);
    }      
    localStorage.setItem(TASKS, JSON.stringify(tasks));
    props.setShowDialog(false);
  }

  const handleChange = (event, property) => {
    let value = '';
    if(property === 'isOngoingTask')
       value = !formData.isOngoingTask;
    else if(property.includes('Date') || property.includes('Time'))
      value = event;
    else
      value = event.target.value;
    setFormData( {...formData, [property]: value} );
  }

  return (
    <div>
      <Dialog
        open={props.showDialog}
        TransitionComponent={Transition}
        keepMounted
        className={classes.dialog}
        onClose={props.setShowDialog}
        aria-labelledby="create-task-title"
        aria-describedby="create-task-description"
      >
        <DialogContent>
          <div>
            <div className={classes.title}> {taskToEdit ? "Update " : "Create New" } Task Form</div>
            <div className={classes.secDivider}></div>
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <form noValidate autoComplete="off">
                <TextField label="Title*" value={formData.title} 
                           onChange={(event)=>handleChange(event, 'title')} 
                           id="create-task-title" className={classes.inputField} 
                />
                {!formData.title ? <div className={classes.error}>Please enter value for Title.</div> : ""}
                <FormControl className={classes.inputField}>
                    <InputLabel id="category-select-label">Category*</InputLabel>
                    <Select
                        labelId="category-select-label"
                        id="category"                        
                        value={formData.category}
                        onChange={(event)=>handleChange(event, 'category')}
                      >
                        <MenuItem value={TASK_CATEGORY.office}>{TASK_CATEGORY.office}</MenuItem>
                        <MenuItem value={TASK_CATEGORY.personal}>{TASK_CATEGORY.personal}</MenuItem>
                        <MenuItem value={TASK_CATEGORY.family}>{TASK_CATEGORY.family}</MenuItem>
                    </Select>
                </FormControl>
                {!formData.category ? <div className={classes.error}>Please select value for Category.</div> : ""}
                { taskToEdit ?
                  <FormControl className={classes.inputField}>
                    <InputLabel id="status-select-label">Status*</InputLabel>
                    <Select
                        labelId="status-select-label"
                        id="category"                        
                        value={formData.status}
                        onChange={(event)=>handleChange(event, 'status')}
                      >
                        <MenuItem value={TASK_STATUS.created}>{TASK_STATUS.created}</MenuItem>                        
                        <MenuItem value={TASK_STATUS.inProgress}>{TASK_STATUS.inProgress}</MenuItem>
                        <MenuItem value={TASK_STATUS.complated}>{TASK_STATUS.complated}</MenuItem>
                        <MenuItem value={TASK_STATUS.cancelled}>{TASK_STATUS.cancelled}</MenuItem>
                    </Select>
                </FormControl>
                : ""
              }
              { taskToEdit && !formData.status ? <div className={classes.error}>Please select value for Status.</div> : "" }
                <div>
                  <KeyboardDatePicker
                    className={classes.datePicker}
                    disableToolbar
                    autoOk={true}
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="start-date-picker-inline"
                    label="Start Date"
                    value={formData.startDate}
                    onChange={(event)=>handleChange(event, 'startDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <KeyboardTimePicker
                    className={classes.timePicker}
                    margin="normal"
                    autoOk={true}
                    id="start-time-picker"
                    label="Time"
                    value={formData.startTime}
                        onChange={(event)=>handleChange(event, 'startTime')}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                </div>
                <div>
                  <KeyboardDatePicker
                    className={classes.datePicker}
                    disableToolbar
                    autoOk={true}
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="target-date-picker-inline"
                    label="End/Target Date*"
                    value={formData.targetDate}
                    onChange={(event)=>handleChange(event, 'targetDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <KeyboardTimePicker
                    className={classes.timePicker}
                    autoOk={true}
                    margin="normal"
                    id="time-picker"
                    label="Time"
                    value={formData.targetTime}
                    onChange={(event)=>handleChange(event, 'targetTime')}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
                  />
                  {!formData.targetDate ? <div className={classes.error}>Please select value for End/Target Date.</div> : ""}
                </div>
                <TextField
                  style={{width: "100%"}}
                  id="desc-multiline-flexible"
                  label="Description"
                  multiline
                  rows={3}
                  rowsMax={4}
                  value={formData.desc}
                  onChange={(event)=>handleChange(event, 'desc')}                  
                />
                {!taskToEdit ? 
                  <FormGroup row>
                    <FormControlLabel
                      control={<Checkbox 
                                  checked={formData.isOngoingTask} 
                                  onChange={(event)=>handleChange(event, 'isOngoingTask')} name="ongoingTask" 
                                  color="primary" />
                                }
                      label="Is this task already inprogress?"
                    />
                  </FormGroup>
                  : ""
                }
              </form>
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.secDivider} style={{marginBottom: "25px"}}></div>
            <div style={{marginBottom: "20px"}}>
              <button style={{marginRight: "10px"}} 
                      className={clsx(classes.filledButton, classes.secondaryButton, classes.actionButton)}
                      onClick={reset}
              > Reset </button>
              <button className={clsx(classes.filledButton, classes.actionButton, 
                                      (!formData.title || !formData.category || !formData.targetDate ? classes.disabledButton : "")
                                    )} 
                      onClick={createNewTask}
                      disabled={!formData.title || !formData.category || !formData.targetDate}>
                      {taskToEdit ? "Update" : "Create New" } Task
              </button>
            </div>            
          </div>          
        </DialogContent>
      </Dialog>
    </div>
  );
}

