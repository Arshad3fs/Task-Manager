import { executeQuery } from '../db-client/client.js'
import { INSERT_USER, SELECT_USER_BY_EMAIL, SELECT_USER_ID_BY_EMAIL_AND_PASSWORD, SELECT_USER_ID_BY_EMAIL, INSERT_TASK, SELECT_TASK_BY_TITLE, DELETE_TASK_BY_ID, UPDATE_TASK, SELECT_TASKS_BY_USER_ID } from '../utils/constants/Queries.js';
import { formatParams, isValidTask } from '../utils/task/utils.js';

export default {
  Query: {
  getUserDetails: async (parent, args) => {      
      let user = null;       
      if( !args.email )
        return user;
      
      await executeQuery(SELECT_USER_BY_EMAIL, [args.email.toLowerCase()]).then( r => {
        if( r.rowCount > 0 ){
          const row = r.rows[0];
          user = { id: row.userid, firstName: row.firstname, lastName: row.lastname, email: row.useremail, 
                   isManager: row.ismanager === 'Y', registeredOn: new Date(row.createdon).toUTCString() 
                 };
        }
      }).catch(e => console.log(e));
       return user; 
  },
  getTaskDetails: async (parent, args) => {
    let tasks = [];
    if( !args.title )
      return tasks;
    
    await executeQuery(SELECT_TASK_BY_TITLE, [args.title.toUpperCase()]).then( r => {
      if( r.rowCount > 0){
        r.rows.forEach( row => {
          tasks.push({
            id: row.taskid,
            title: row.title,
            category: row.category,
            startDateTime: row.startdatetime,
            endDateTime: row.enddatetime,          
            desc: row.description,
            status: row.status,
          });
        })        
      }
    }).catch( e => console.log(e));
    return tasks;
  },
  signInUser: async (parent, args) => {
    let isSignInSuccessfull = false;       
    if( !args.email || !args.password )
      return isSignInSuccessfull;
    
    await executeQuery(SELECT_USER_ID_BY_EMAIL_AND_PASSWORD, [args.email.toLowerCase(), args.password]).then( r =>{
      isSignInSuccessfull = r.rowCount > 0;
    }).catch(e => console.log(e))
     return isSignInSuccessfull; 
  },
  getMyTasks: async (parent, args) => {    
    const response = [];
    if( !args.email ){
      return response;
    }
    const userId = await getUserId(args.email)
    await executeQuery(SELECT_TASKS_BY_USER_ID, [userId]).then( r => {
      if( r.rowCount > 0){
        r.rows.forEach( row => {
          response.push({
            id: row.taskid,
            title: row.title,
            category: row.category,
            startDateTime: row.startdatetime,
            endDateTime: row.enddatetime,          
            desc: row.description,
            status: row.status
          });
        })
      }  
    }).catch( e => console.log(e));
    return response;
  }
},
  Mutation: {
    registerUser: async (parent, args) => {
      const response = { status: false, message: "" };
      if( !args.firstName || !args.email  || !args.password ) {
        response.message = "Please enter mandatory fields"
        return response;   
      }
      
      if( await isUserRegisterd(args.email) ) {
        response.message = `User is already registered with ${args.email}`;
        return response;
      }

      const params = [ args.email.toLowerCase(), args.password, args.firstName ];
      params.push( args.lastName ? args.lastName : null );
      params.push( new Date() );
      await executeQuery( INSERT_USER, params ).then( r => {
        response.status = true;
        response.message = "User created successfully";        
      }).catch(e => console.log(e));
      return response;
    },
    createTask: async (parent, args) => {
      const response = { status: false, message: "" };
      if( !isValidTask(args) ){
        response.message = "Please check the mandatory fields."
        return response;
      }
      const params = formatParams(args);
      params.unshift(await getUserId(args.task.email));

      await executeQuery(INSERT_TASK, params).then( r => {
        if( r.rowCount > 0 ){
          response.message = "Task created successfully";
          response.status = true;
        }
      }).catch( e => console.log(e));
      return response;
    },
    updateTask: async (parent, args) => {
      const response = { status: false, message: "" };
      if( !isValidTask(args) && !isValidUpdateTask(args) ){
        response.message = "Please check the mandatory fields."
        return response;
      }
      const params = formatParams(args);
      params.pop();
      params.push(args.task.id);

      await executeQuery(UPDATE_TASK, params).then( r => {
        if( r.rowCount > 0 ){
          response.message = "Task updated successfully";
          response.status = true;
        }
      }).catch( e => console.log(e));
      return response;
    },    
    deleteTask: async (parent, args) => {
      const response = { status: false, message: "" };
      if( !args.id ){
        response.message = "Please pass the Task ID."
      }

      await executeQuery(DELETE_TASK_BY_ID, [args.id]).then( r => {
        if( r.rowCount > 0 ){
          response.message = "Task deleted successfully."
          response.status = true;
        }
      }).catch( e => console.log(e));
      return response;
    }    
  }    
}

const getUserId = async ( email ) => {
  let userID = null;
  await executeQuery( SELECT_USER_ID_BY_EMAIL, [email.toLowerCase()] ).then( r => {
    if( r.rowCount > 0 )
      userID = r.rows[0].userid;
  }).catch(e => console.log(e));
  return userID;
}

const isUserRegisterd = async ( email ) => {
  let isUserAlreadyRegistered = false;
  await executeQuery( SELECT_USER_ID_BY_EMAIL, [email.toLowerCase()] ).then( r => {
    isUserAlreadyRegistered = r.rowCount > 0;
  }).catch(e => console.log(e));
  return isUserAlreadyRegistered;
}
