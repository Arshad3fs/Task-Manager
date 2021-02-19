// import { gql } from "@apollo/client";
import gql from 'graphql-tag';

export const SIGNIN_QUERY = gql(`
  query SinginUser($email: String!, $password: String!){
    signInUser(email: $email, password: $password)
  }
`);

export const SIGNUP_MUTATION = gql(`
  mutation RegisterUser( $firstName: String!, $lastName: String, $email: String!, $password: String!){
    registerUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password){
        status
    }
  }
`);

export const CREATE_TASK = gql(`
  mutation CreateTask($title: String!, $category: String!, $startDateTime: String, $endDateTime: String!, $email: String!, $desc: String, $status: String!){
    createTask(task: {title: $title, category: $category, startDateTime: $startDateTime, endDateTime: $endDateTime, email: $email, desc: $desc, status: $status}){
      status
    }
  }`
);

export const UPDATE_TASK = gql(`
  mutation UpdateTask($id: String!, $title: String!, $category: String!, $startDateTime: String, $endDateTime: String!, $desc: String, $status: String!){
    updateTask(task: {id: $id, title: $title, category: $category, startDateTime: $startDateTime, endDateTime: $endDateTime, desc: $desc, status: $status}){
      status
    }
  }`
);

export const MY_TASKS_QUERY = gql(`
  query GetMyTasks($email: String!){
    getMyTasks(email: $email){
      id
      title
      category
      email
      desc
      status
      startDateTime
      endDateTime
    }
  }
`);