import { GET_CONTACT_DETAIL } from "@/lib/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import CustomInput from "@/components/Input";
import { FlexContainer } from "@/components/utility/layout";
import { PiPen } from "react-icons/pi";
import { UPDATE_WITH_ID_MUTATION } from "@/lib/graphql/mutation";
import toast from "react-hot-toast";
import EditPNModal from "@/components/modal/EditPNModal";
import { BsPhone, BsPerson } from "react-icons/bs";
import Button from "@/components/Button";
import BackNav from "@/components/BackNav";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  align-items: start;
  justify-content: start;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
interface FormData {
  first_name: string;
  last_name: string;
  phones: string[];
}

const EditContact = () => {
  const { id } = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    phones: [],
  });
  const [selectedPN, setSelectedPN] = useState<string>("");
  const { loading, error, data, refetch } = useQuery(GET_CONTACT_DETAIL, {
    variables: { id },
  });

  useEffect(() => {
    if (data) {
      setFormData({
        first_name: data.contact_by_pk.first_name,
        last_name: data.contact_by_pk.last_name,
        phones: data.contact_by_pk.phones.map(
          (phone: { number: string }) => phone.number
        ),
      });
    }
  }, [data]);

  const [updateContactMutation] = useMutation(UPDATE_WITH_ID_MUTATION);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, first_name: value });
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, last_name: value });
  };

  const handleUpdatePN = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    phone: string
  ) => {
    e.preventDefault();
    setSelectedPN(phone);
    setIsEditModalOpen(true);
  };

  const updateContactHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const updateContact = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const { data } = await updateContactMutation({
          variables: {
            id: id,
            _set: {
              first_name: formData.first_name,
              last_name: formData.last_name,
            },
          },
        });

        refetch();
        console.log("Mutation response:", data);
      } catch (error) {
        console.error("Mutation error:", error);
      }
    };

    toast.promise(updateContact(), {
      loading: "Updating contact...",
      success: "Contact updated successfully!",
      error: "Something went wrong!",
    });
  };

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      <h2>Edit Contact</h2>
      <BackNav path="/contact" />
      <Container>
        <div
          style={{
            width: "100%",
            display: "flex",
            aspectRatio: "2/1",
            backgroundColor: "#ebffefff",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderRadius: "0.5rem",
          }}
        ></div>
        <div
          style={{
            width: "100%",
          }}
        >
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data?.contact_by_pk ? (
            <form
              onSubmit={updateContactHandler}
              style={{
                width: "100%",
              }}
            >
              <CustomInput
                type="text"
                id="first_name"
                label="First Name"
                value={formData.first_name}
                onValueChange={handleFirstNameChange}
                icon={<BsPerson />}
              />
              <CustomInput
                type="text"
                id="last_name"
                label="Last Name"
                value={formData.last_name}
                onValueChange={handleLastNameChange}
                icon={<BsPerson />}
              />
              {formData.phones.map((phone, index) => (
                <FlexContainer key={index} alignItems="center">
                  <CustomInput
                    id={`phone-${index}`}
                    label={`Phone ${index + 1}`}
                    placeholder={`Phone ${index + 1}`}
                    type="text"
                    value={phone}
                    readonly
                    icon={<BsPhone />}
                  />
                  <div
                    style={{
                      height: "100%",
                    }}
                  >
                    <Button onClick={(e) => handleUpdatePN(e, phone)}>
                      <PiPen />
                    </Button>
                  </div>
                </FlexContainer>
              ))}
              <Button
                type="submit"
                buttonType="PRIMARY"
                style={{
                  fontWeight: "bold",
                }}
              >
                Update Contact
              </Button>
            </form>
          ) : (
            "no data"
          )}
          {isEditModalOpen && (
            <EditPNModal
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
              selectedPN={selectedPN}
              id={id}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default EditContact;
