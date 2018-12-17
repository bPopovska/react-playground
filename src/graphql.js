import gql from "graphql-tag";

const getItemsQuery = gql`
    query getItems($status: String!) {
      items(status: $status) {
        duration
        name
        status
      }
    }
`;

const addItemMutation = gql`
  mutation addItem($name: String!, $duration: String!, $status: String!) {
    addItem(name: $name, duration: $duration, status: $status) {
       name
       duration
       status
    }
  }
`;

export {
  getItemsQuery,
  addItemMutation
}
