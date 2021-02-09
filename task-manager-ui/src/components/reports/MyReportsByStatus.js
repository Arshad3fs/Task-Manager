import { createStyles, makeStyles } from '@material-ui/core';
import React from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2';
import { TASKS, TASK_STATUS } from '../../utils/AppConstants';
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
        pieChartContainer: {
          width: "50%",
          height: "370px",
          border: "1px solid #eb984e47"
        },
        lineChartContainer: {
          width: "48.5%",
          height: "370px",
          border: "1px solid #eb984e47",
          borderLeft: "none"
        },
        barChartContainer: {
          width: "98.5%",
          height: "300px",
          border: "1px solid #eb984e47",
          borderTop: "none"
        },
        reportHeader: {
          textAlign: "center",
          fontSize: "18px",
          fontWeight: "600",
          color: "#00000094"
        }
      })
);

export default function MyReportsByStatus() {
  const classes = useStyles();    
  let tasks = JSON.parse(localStorage.getItem(TASKS));
  tasks = tasks ? tasks : [];
  const taskCounts = tasks.reduce((prev, current) => {
                          switch(current.status) {
                            case TASK_STATUS.created: 
                              prev.created = prev.created + 1
                              break;
                            case TASK_STATUS.inProgress: 
                              prev.inProgress = prev.inProgress + 1
                              break;
                            case TASK_STATUS.complated: 
                              prev.complated = prev.complated + 1
                              break;
                            case TASK_STATUS.cancelled: 
                              prev.cancelled = prev.cancelled + 1
                              break;
                            default:
                              break;
                          }
                          return prev;
                        }, {
                          created: 0,
                          inProgress: 0,
                          complated: 0,
                          cancelled: 0
                        });

    const data = {
        labels: [ TASK_STATUS.created, TASK_STATUS.inProgress, TASK_STATUS.complated, TASK_STATUS.cancelled ],        
        datasets: [{
            data: [taskCounts.created, taskCounts.inProgress, taskCounts.complated, taskCounts.cancelled],
            backgroundColor: [
                '#2980B9',
                '#F39C12',
                '#2ECC71',
                '#E74C3C',              
            ]
          }],
      }

      const lineData = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Firday', 'Saturday', 'Sunday'],
        datasets: [
          {
            label: 'CREATED',
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#2980B9',
            borderColor: '#2980B9',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#2980B9',
            pointBackgroundColor: '#2980B9',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#2980B9',
            pointHoverBorderColor: '#2980B9',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [5, 10, 5, 20, 15, 30, 8]
          },
          {
            label: 'IN-PROGRESS',
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#F39C12',
            borderColor: '#F39C12',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#F39C12',
            pointBackgroundColor: '#F39C12',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#F39C12',
            pointHoverBorderColor: '#F39C12',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [7, 10, 5, 10, 20, 15, 0]
          },
          {
            label: 'COMPLETED',
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#2ECC71',
            borderColor: '#2ECC71',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#2ECC71',
            pointBackgroundColor: '#2ECC71',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#2ECC71',
            pointHoverBorderColor: '#2ECC71',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [5, 20, 10, 7, 10, 17, 20]
          },
          {
            label: 'CANCELLED',
            fill: false,
            lineTension: 0.1,
            backgroundColor: '#E74C3C',
            borderColor: '#E74C3C',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#E74C3C',
            pointBackgroundColor: '#E74C3C',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#E74C3C',
            pointHoverBorderColor: '#E74C3C',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [0, 2, 1, 5, 0, 10, 1]
          }
        ]
      };

      const barData = {
        labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguest', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'CREATED',
            backgroundColor: '#2980B9',            
            borderWidth: 1,
            hoverBackgroundColor: '#2980B9',            
            data: [65, 59, 80, 81, 56, 55, 40, 60, 70, 20, 40, 20]
          },
          {
            label: 'IN-PROGRESS',
            backgroundColor: '#F39C12',            
            borderWidth: 1,
            hoverBackgroundColor: '#F39C12',            
            data: [30, 25, 40, 5, 10, 5, 60, 40, 30, 20, 40, 20]
          },
          {
            label: 'COMPLETED',
            backgroundColor: '#2ECC71',            
            borderWidth: 1,
            hoverBackgroundColor: '#2ECC71',            
            data: [40, 35, 50, 55, 45, 35, 20, 10, 33, 22, 8, 11]
          },
          {
            label: 'CANCELLED',
            backgroundColor: '#E74C3C',            
            borderWidth: 1,
            hoverBackgroundColor: '#E74C3C',            
            data: [5, 7, 0, 8, 6, 5, 0, 6, 10, 20, 2, 15]
          }
        ]
      };

    return (
      <div className={classes.container}>
        <Header></Header>
        <div className={classes.reportsContainer}> 
            <div className={classes.pieChartContainer}>                
                <Pie data={{ labels: data.labels, datasets: data.datasets }} options={{ 
                  maintainAspectRatio: false,
                  title: {
                    display: true,
                    text: "Total Tasks By Status",
                    fontSize: 16,
                    fontWeight: "bold",
                    fontColor: "#00000094"
                  }
                 }}
                />
            </div>
            <div className={classes.lineChartContainer}>
                <Line data={lineData} options={{ 
                  maintainAspectRatio: false,
                  title: {
                    display: true,
                    text: "Last Week Tasks By Status",
                    fontSize: 16,
                    fontWeight: "bold",
                    fontColor: "#00000094"
                  }
                 }}/>
            </div>
            <div className={classes.barChartContainer}>
                <Bar data={barData} options={{ 
                  maintainAspectRatio: false,
                  title: {
                    display: true,
                    text: "Last Year Tasks By Status",
                    fontSize: 16,
                    fontWeight: "bold",
                    fontColor: "#00000094"
                  }
                 }}/>
            </div>
        
        </div>
      </div>
    );
}