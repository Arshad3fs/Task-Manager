import { createStyles, makeStyles } from '@material-ui/core';
import React from 'react'
import { Pie } from 'react-chartjs-2';
import { TASKS, TASK_CATEGORY } from '../../utils/AppConstants';
import Header from "../header/Header";

const useStyles = makeStyles((theme) =>
    createStyles({
      reportsContainer: {
        overflowY: "auto",
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        padding: "10px"
      },
        container: {
            minHeight: "100vh",
            overflow: "hidden"
        },
        chartContainer: {
          width: "50%",
          height: "600px"
        }
      })
);

export default function MyReportsByCategory() {
  const classes = useStyles();    
  let tasks = JSON.parse(localStorage.getItem(TASKS));
  tasks = tasks ? tasks : [];
  
    const taskCountsByCategory = tasks.reduce((prev, current) => {
                          switch(current.category) {
                            case TASK_CATEGORY.office: 
                              prev.office = prev.office + 1
                              break;
                            case TASK_CATEGORY.personal: 
                              prev.personal = prev.personal + 1
                              break;
                            case TASK_CATEGORY.family: 
                              prev.family = prev.family + 1
                              break;
                            default:
                              break;
                          }
                          return prev;
                        }, {
                          family: 0,
                          personal: 0,
                          office: 0
                        });

    const dataByCategory = {
        labels: [ TASK_CATEGORY.family, TASK_CATEGORY.personal, TASK_CATEGORY.office ],        
        datasets: [{
            data: [ taskCountsByCategory.family, taskCountsByCategory.personal, taskCountsByCategory.office ],
            backgroundColor: [
                'rgb(210,105,30)',
                'rgb(34,139,34)',
                'rgb(220,20,60)',              
            ]
          }],
      }

    return (
      <div className={classes.container}>
        <Header></Header>
        <div className={classes.reportsContainer}> 
            <div className={classes.chartContainer}>
                <Pie data={{
                      labels: dataByCategory.labels,
                      datasets: dataByCategory.datasets
                    }}
                />
            </div>
        </div>
      </div>
    );
}