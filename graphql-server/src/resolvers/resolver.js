import { executeQuery } from '../db-client/client.js'
import { INSERT_USER, SELECT_USER_BY_EMAIL, SELECT_USER_ID_BY_EMAIL_AND_PASSWORD, SELECT_USER_ID_BY_EMAIL } from '../utils/constants/Queries.js';

export default {
  Query: {
    getUserDetails: async (parent, args) => {
      
      let user = null;       
      if( !args.email )
        return user;
      
      await executeQuery(SELECT_USER_BY_EMAIL, [args.email.toLowerCase()]).then( r => {
        if( r.rowCount > 0 ){
          const row = r.rows[0];
          user = { firstName: row.firstname, lastName: row.lastname, email: row.useremail, 
                   isManager: row.ismanager === 'Y', registeredOn: new Date(row.createdon).toUTCString() 
                 };
        }
      }).catch(e => console.log(e));
       return user; 
  },
  signInUser: async (parent, args) => {
    let isSignInSuccessfull = false;       
    if( !args.email || !args.password )
      return isSignInSuccessfull;
    
    await executeQuery(SELECT_USER_ID_BY_EMAIL_AND_PASSWORD, [args.email.toLowerCase(), args.password]).then( r =>{
      isSignInSuccessfull = r.rowCount > 0;
    }).catch(e => console.log(e))
     return isSignInSuccessfull; 
  }
},
  Mutation: {
    registerUser: async (parent, args) => {
      const response = { status: false, message: "" };
      if( !args.firstName || !args.email  || !args.password ) {
        response.message = "Please enter mandatory fields"
        return response;   
      }
      
      if( isUserRegisterd(args.email) ) {
        response.message = `User is already registered with ${args.email}`;
        return response;
      }

      const params = [ args.email.toLowerCase(), args.password, args.firstName ];
      params.push( args.lastName ? args.lastName : null );
      params.push( new Date() );
      await executeQuery( INSERT_USER, params ).then( r => {
        response.status = true;
        response.message = "User created successfully";
        console.log(r);
      }).catch(e => console.log(e));
      return response;
    }
  }    
}

const isUserRegisterd = async ( email ) => {
  let isUserAlreadyRegistered = false;
  await executeQuery( SELECT_USER_ID_BY_EMAIL, [email.toLowerCase()] ).then( r => {
    isUserAlreadyRegistered = r.rowCount > 0;
  }).catch(e => console.log(e));
  return isUserAlreadyRegistered;
}
