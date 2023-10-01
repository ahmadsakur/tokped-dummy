import CustomInput from "@/components/Input";
import { FlexContainer } from "@/components/utility/layout";
import { CREATE_CONTACT_MUTATION } from "@/lib/graphql/mutation";
import { useMutation } from "@apollo/client";
import React from "react";
import toast from "react-hot-toast";

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

  const createContactHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
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
      toast.success("Contact created successfully!");
    } catch (error) {
      console.error("Mutation error:", error);
      toast.error("Data already been used!");
    }
  };

  return (
    <div>
      <form onSubmit={createContactHandler}>
        <CustomInput
          id="first_name"
          label="First Name"
          placeholder="First Name"
          type="text"
          value={formData.first_name}
          defaultValue={""}
          onValueChange={handleFormChange}
        />
        <CustomInput
          id="last_name"
          label="Last Name"
          placeholder="Last Name"
          value={formData.last_name}
          type="text"
          onValueChange={handleFormChange}
        />
        {formData.phones.map((phone, index) => (
          <FlexContainer key={index}>
            <CustomInput
              id={`phone-${index}`}
              label={`Phone ${index + 1}`}
              placeholder={`Phone ${index + 1}`}
              type="text"
              value={phone}
              defaultValue={phone}
              onValueChange={(e) => handlePhoneChange(e, index)}
            />
            {index === formData.phones.length - 1 && (
              <button type="button" onClick={handleAddPhone}>
                Add Phone
              </button>
            )}
          </FlexContainer>
        ))}
        <button type="submit">Submit</button>
      </form>
      {JSON.stringify(formData)}
    </div>
  );
};

export default CreateContact;
