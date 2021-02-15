import { gql } from "@apollo/client";

export const SIGNIN_QUERY = gql(`
  query SinginUser($email: String!, $password: String!){
    signInUser(email: $email, password: $password)
  }
`)

export const SIGNUP_QUERY = gql(`
  mutation RegisterUser( $firstName: String!, $lastName: String, $email: String!, $password: String!){
    registerUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password){
        status
    }      
  }
`)