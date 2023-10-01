import { render } from "@testing-library/react";
import ContactCard from "../ContactCard";
import "@testing-library/jest-dom";
import { TContact } from "src/utils/queryType";

describe("ContactCard", () => {
  const contact: TContact = {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    phones: [{ number: "123-456-7890" }],
    created_at: new Date().toISOString(),
  };

  it("renders contact information correctly", () => {
    const { getByText } = render(
      <ContactCard
        contact={contact}
        isExpanded={false}
        toggleDropdown={() => {}}
        toggleDeleteModal={() => {}}
        toggleDetailModal={() => {}}
      />
    );

    const contactName = getByText("John Doe");
    const contactPhone = getByText("123-456-7890");

    expect(contactName).toBeInTheDocument();
    expect(contactPhone).toBeInTheDocument();
  });

});
