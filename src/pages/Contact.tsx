import Button from "@/components/Button";
import { FlexContainer } from "@/components/utility/layout";
import { GET_CONTACT_LIST } from "@/lib/graphql/query";
import { colors } from "@/utils/colors";
import { useQuery } from "@apollo/client";
import { LuSettings2 } from "react-icons/lu";
import { TContact } from "@/utils/queryType";
import ContactCard from "@/components/ContactCard";
import styled from "@emotion/styled";
import { useState } from "react";
import DeleteModal from "@/components/DeleteModal";
import { PiArrowRight } from "react-icons/pi";
import { useContactContext } from "@/context/contactContext";
import { NavLink } from "react-router-dom";

const ContactGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0 4rem;
  justify-content: space-between;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const Contact = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(-1);

  const { loading, error } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit: 10,
    },
    onCompleted: (data) => {
      setContacts(data.contact);
    },
  });

  const { contacts, setContacts } = useContactContext();
  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <FlexContainer justifyContent="space-between">
        <h2>Contact</h2>
        <NavLink to="/contact/create">
          <Button color={colors.mint}>
            Create
            <LuSettings2 />
          </Button>
        </NavLink>
      </FlexContainer>
      <FlexContainer
        justifyContent="space-between"
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <h4>Favourite</h4>
        <PiArrowRight />
      </FlexContainer>
      <FlexContainer
        justifyContent="start"
        style={{
          overflowX: "scroll",
        }}
      >
        <img src="https://ui-avatars.com/api/?name=john+doe" alt="" />
        <img src="https://ui-avatars.com/api/?name=john+doe" alt="" />
        <img src="https://ui-avatars.com/api/?name=john+doe" alt="" />
        <img src="https://ui-avatars.com/api/?name=john+doe" alt="" />
        <img src="https://ui-avatars.com/api/?name=john+doe" alt="" />
      </FlexContainer>
      <div>
        {loading && <div>Loading...</div>}
        {error ? (
          <div>Error...</div>
        ) : (
          <>
            <h4
              style={{
                marginTop: "1rem",
              }}
            >
              All Contacts
            </h4>
            <ContactGridContainer>
              {contacts.map((contact: TContact) => {
                return (
                  <ContactCard
                    contact={contact}
                    key={contact.id}
                    toggleDropdown={() => toggleDropdown(contact.id)}
                    toggleModal={() => {
                      setIsModalOpen(true), setSelectedId(contact.id);
                    }}
                    isExpanded={openDropdownIndex === contact.id}
                  />
                );
              })}
            </ContactGridContainer>
          </>
        )}
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedContact={selectedId}
      />
    </div>
  );
};

export default Contact;
