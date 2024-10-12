import { gql } from "graphql-tag";

const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      username
      email
      tel
      id_no
      token
    }
  }
`;


//login

const LOGIN_USER = gql`
mutation LoginUser (
    $loginInput: LoginInput
    
) {
    loginUser(loginInput: $loginInput) {
        username
        email
        tel
        id_no
        role
        token
    }
}
  

`;



//verifyToken



//logout






export { REGISTER_USER, LOGIN_USER };
