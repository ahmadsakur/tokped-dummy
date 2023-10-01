import BackNav from "@/components/BackNav";
import Button from "@/components/Button";
import CustomInput from "@/components/Input";
import { FlexContainer } from "@/components/utility/layout";
import { CREATE_CONTACT_MUTATION } from "@/lib/graphql/mutation";
import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import React from "react";
import toast from "react-hot-toast";
import { BsPerson, BsPhone } from "react-icons/bs";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  align-items: start;
  justify-content: start;
  @media (min-width: 768px) {
    max-width: 35rem;
  }
`;

type TFormData = {
  first_name: string;
  last_name: string;
  phones: string[];
};

const CreateContact = () => {
  const [formData, setFormData] = React.useState<TFormData>({
    first_name: "",
    last_name: "",
    phones: [""],
  });

  const [createContactMutation] = useMutation(CREATE_CONTACT_MUTATION);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newPhones = [...formData.phones];
    newPhones[index] = e.target.value;
    setFormData({ ...formData, phones: newPhones });
  };

  const handleAddPhone = () => {
    setFormData({ ...formData, phones: [...formData.phones, ""] });
  };

  const handleResetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      phones: [""],
    });
  };
  const createContactHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const createContact = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const { data } = await createContactMutation({
          variables: {
            first_name: formData.first_name,
            last_name: formData.last_name,
            phones: formData.phones.map((number) => ({
              number: number,
            })),
          },
        });

        setFormData({
          first_name: "",
          last_name: "",
          phones: [""],
        });
        console.log("Mutation response:", data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Mutation error:", error.message);
        throw new Error(error);
      }
    };

    toast.promise(createContact(), {
      loading: "Creating contact...",
      success: "Contact updated successfully!",
      error: (error) => `${error.message}`,
    });
  };

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        padding: "2rem 0",
      }}
    >
      <Container>
        <h4>Create Contact</h4>
        <BackNav path="/contact" />
        <div
          style={{
            width: "100%",
            display: "flex",
            aspectRatio: "2/1",
            backgroundImage: `url("https://doodleipsum.com/700x394/outline?bg=03ac0e&i=9bddbb6ce41b114c417e179ddbc5c164")`,
            backgroundSize: "cover",
            borderRadius: "0.5rem",
          }}
        />
        <form
          onSubmit={createContactHandler}
          style={{
            width: "100%",
          }}
        >
          <CustomInput
            id="first_name"
            label="First Name"
            placeholder="First Name"
            type="text"
            value={formData.first_name}
            defaultValue={""}
            onValueChange={handleFormChange}
            icon={<BsPerson />}
          />
          <CustomInput
            id="last_name"
            label="Last Name"
            placeholder="Last Name"
            value={formData.last_name}
            type="text"
            onValueChange={handleFormChange}
            icon={<BsPerson />}
          />
          {formData.phones.map((phone, index) => (
            <FlexContainer key={index}>
              <CustomInput
                id={`phone-${index}`}
                label={`Phone ${index + 1}`}
                placeholder={`Phone ${index + 1}`}
                type="text"
                value={phone}
                onValueChange={(e) => handlePhoneChange(e, index)}
                icon={<BsPhone />}
              />
            </FlexContainer>
          ))}
          <div
            style={{
              display: "flex",
              gap: ".4rem",
              marginTop: ".6rem",
              justifyContent: "flex-end",
            }}
          >
            <Button onClick={handleAddPhone}>Add Phone</Button>
            <Button buttonType="SECONDARY" onClick={handleResetForm}>
              Reset
            </Button>
            <Button buttonType="PRIMARY" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default CreateContact;
