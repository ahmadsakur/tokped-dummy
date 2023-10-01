import { GET_CONTACT_DETAIL } from "@/lib/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import CustomInput from "@/components/Input";
import { FlexContainer } from "@/components/utility/layout";
import { PiPen } from "react-icons/pi";
import { UPDATE_WITH_ID_MUTATION } from "@/lib/graphql/mutation";
import toast from "react-hot-toast";
import EditPNModal from "@/components/modal/EditPNModal";
import { BsArrowLeft, BsCursorText, BsPhone } from "react-icons/bs";
import Button from "@/components/Button";
import styled from "@emotion/styled";
import { colors } from "@/utils/colors";

const StyledButton = styled.div`
  display: flex;
  width: fit-content;
  justify-content: flex-start;
  padding: 0.5rem 0;
  cursor: pointer;
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: ${colors.green400};
  }
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  font-size: 0.8rem;
  font-weight: bold;

  &:hover {
    color: ${colors.green400};
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: ${colors.dark};
    &.group-hover {
      color: ${colors.green400};
    }
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
      toast.success("Contact updated successfully!");
    } catch (error) {
      console.error("Mutation error:", error);
      toast.error("something went wrong!");
    }
  };

  return (
    <div>
      <NavLink to="/contact">
        <StyledButton>
          <IconContainer>
            <BsArrowLeft className="group-hover" />
          </IconContainer>
          <Text>Back</Text>
        </StyledButton>
      </NavLink>
      <h1>Edit Contact</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data?.contact_by_pk ? (
        <form onSubmit={updateContactHandler}>
          <CustomInput
            type="text"
            id="first_name"
            label="First Name"
            value={formData.first_name}
            onValueChange={handleFirstNameChange}
            icon={<BsCursorText />}
          />
          <CustomInput
            type="text"
            id="last_name"
            label="Last Name"
            value={formData.last_name}
            onValueChange={handleLastNameChange}
            icon={<BsCursorText />}
          />
          {formData.phones.map((phone, index) => (
            <FlexContainer key={index}>
              <CustomInput
                id={`phone-${index}`}
                label={`Phone ${index + 1}`}
                placeholder={`Phone ${index + 1}`}
                type="text"
                value={phone}
                readonly
                icon={<BsPhone />}
              />
              {formData.phones.length > 1 && (
                <button onClick={(e) => handleUpdatePN(e, phone)}>
                  <PiPen />
                </button>
              )}
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
  );
};

export default EditContact;
