import { createStyles, TextField } from "@material-ui/core";
import Header from "../header/Header";
import { TASKS, TASK_CATEGORY, TASK_STATUS } from "../../utils/AppConstants";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import EnhancedTableHead from "../common/EnhancedTableHead";
import clsx from "clsx";
import ConfirmationDialog from "../confirmation-dialog/ConfirmationDialog"

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            minHeight: "100vh",
            overflow: "hidden"
        },
        containerBody: {
          padding: 10,
          paddingTop: 0,
          maxHeight: "calc(100vh - 73px)"
        },        
        taskActionContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "10vh",
            width: "100%"
        },
        filledButton: {
            padding: "10px 0px",
            backgroundColor: "#eb984ef2",
            border: "1.5px solid #eb984ef2",
            borderRadius: "30px",
            fontWeight: "bold",
            outline: "none",
            width: "250px",
            color: "#000000b3",
            cursor: "pointer"
        },
        secondaryButton: {
          backgroundColor: "white",
          color: "#e47a1b",
          borderColor: "#e47a1b",
        },
        root: {
            width: '100%',
          },
          paper: {
            width: '100%',
            marginBottom: theme.spacing(2),            
          },
          table: {
            minWidth: 750,
            maxHeight: "calc(100vh - 150px)",
            overflowY: "auto"
          },
          visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
          },
          highlightRow: {
            backgroundColor: "#eb984e36 !important"
          }
    })
)

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    { id: 'title', numeric: false, label: 'Title' },
    { id: 'category', numeric: false, label: 'Category' },
    { id: 'status', numeric: false, label: 'Status' },
    { id: 'desc', numeric: false, label: "Desc" },
    { id: 'Start Date', numeric: false, label: 'Start Date' },
    { id: 'Start Time', numeric: false, label: 'Start Time' },
    { id: 'End Date', numeric: false, label: 'End/Target Date' },
    { id: 'End Time', numeric: false, label: 'End/Target Time' },
  ];

function MyReporteesTasks (){
    const classes = useStyles();
    
    const [showDialog, setShowDialog] = React.useState(false);
    const [approve, setApprove] = React.useState(false);    
    const [contentText, setContentText] = React.useState('');
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('title');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    let tasks = JSON.parse(localStorage.getItem(TASKS));
    tasks = tasks.filter( task => task.status === TASK_STATUS.created && task.category === TASK_CATEGORY.office);
    const [rows, setRows] = React.useState(tasks ? tasks : []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, title) => {
    const selectedIndex = selected.indexOf(title);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, title);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (title) => selected.indexOf(title) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const handleAction = () => {
        tasks = JSON.parse(localStorage.getItem(TASKS));
        tasks.forEach( task => {
            if( selected.includes(task.title) ){
                task.status = approve ? 'APPROVED' : 'REJECTED';
            }                
        });
        localStorage.setItem(TASKS, JSON.stringify(tasks));
        tasks = tasks.filter( task => task.category === TASK_CATEGORY.office && task.status === TASK_STATUS.created );
        setRows(tasks);
        setShowDialog(!showDialog);
    }

    const handleDialog = () => setShowDialog(!showDialog);

    const setContext = (approve=false) => {
        if( !selected || selected.length === 0 )
          return;

        if( approve ){
            setContentText('Selected tasks will be approved. Are you sure you want to proceed?');
        } else {
            setContentText('Selected tasks will be rejected. Are you sure you want to proceed?');
        }
        setApprove(approve);
        setShowDialog(!showDialog)
    }

    const filterTasks = (event) => {
      let tasks = JSON.parse(localStorage.getItem(TASKS));
      tasks = tasks ? tasks : [];
      const filterText = event.target.value.toUpperCase();
      tasks = tasks.filter (task => {
        return task.title.toUpperCase().includes(filterText);
      });      
      setRows(tasks);
    }

    return (
        <div className={classes.container}>
                <Header></Header>
                {showDialog ? 
                    <ConfirmationDialog header={'Confirmation'} 
                                        contentText={contentText} 
                                        handleActionButton={handleAction} 
                                        handleClose={handleDialog}
                                        showDialog={showDialog} />: ""}
                <div className={classes.containerBody}>
                    <div className={classes.taskActionContainer}>
                        <button className={classes.filledButton} 
                                onClick={()=>setContext(true)}
                        >Approve Selected Tasks</button>
                        <div>
                          <TextField id="dd" label="Start typing here to filter tasks by Title"                       
                                    onChange={filterTasks}
                                    style={{width: 500}} />
                        </div>
                        <button className={clsx(classes.filledButton, classes.secondaryButton)}
                                onClick={()=>setContext(false)}
                        >Reject Selected Tasks</button>
                    </div>
                    <div className={classes.root}>
                      <Paper className={classes.paper}>
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={'medium'}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                  headCells={headCells}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.title);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.title}
                          selected={isItemSelected}
                          classes={{selected: classes.highlightRow}}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              color={"primary"}
                              onChange={(event) => handleClick(event, row.title)}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </TableCell>                          
                          <TableCell component="th" id={labelId} scope="row" padding="none">
                            {row.title}
                          </TableCell>
                          <TableCell align="left">{row.category}</TableCell>
                          <TableCell align="left">{row.status}</TableCell>
                          <TableCell align="left">{row.desc}</TableCell>
                          <TableCell align="left">{row.startDateStr}</TableCell>
                          <TableCell align="left">{row.startTimeStr}</TableCell>
                          <TableCell align="left">{row.targetDateStr}</TableCell>
                          <TableCell align="left">{row.targetTimeStr}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
                    </div>
                </div>

        </div>
    )
}

export default MyReporteesTasks;
