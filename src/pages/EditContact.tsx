import { GET_CONTACT_DETAIL } from "@/lib/graphql/query";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const EditContact = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CONTACT_DETAIL, {
    variables: { id },
  });
  return (
    <div>
      <h1>Edit Contact</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error :</p>}
      {data && <p>{JSON.stringify(data)}</p>}
    </div>
  );
};

export default EditContact;
