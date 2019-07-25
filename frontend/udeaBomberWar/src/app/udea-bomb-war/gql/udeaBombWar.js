import gql from "graphql-tag";


export const loginToGame = gql`
mutation loginToGame{
  loginToGame{
    code
    user_id
    character
  } 
}
`;

export const playerUpdates = gql `
subscription{
  playerUpdates{
    user_id
    character
  }
}`;

