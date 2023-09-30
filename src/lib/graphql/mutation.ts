import { gql } from "@apollo/client";

export const DELETE_CONTACT_MUTATION = gql`
  mutation DeleteContact($id: Int!) {
    delete_contact_by_pk(id: $id) {
      id
      first_name
      last_name
    }
  }
`;