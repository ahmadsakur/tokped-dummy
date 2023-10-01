import { colors } from "@/utils/colors";
import { TContact } from "@/utils/queryType";
import styled from "@emotion/styled";
import { useState } from "react";
import DeleteModal from "@/components/modal/DeleteModal";
import DetailModal from "@/components/modal/DetailModal";
import { useContactContext } from "@/context/contactContext";
import ContactCard from "@/components/ContactCard";

const ContactGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0 4rem;
  justify-content: space-between;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

const PaginationButton = styled.button`
  border: none;
  background-color: ${colors.green500};
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
  cursor: pointer;
  color: ${colors.white};
  display: block;
`;


const Contact = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(-1);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(-1);
  const [page, setPage] = useState(1);

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const { favContacts } = useContactContext();

  const handlePageChange = (type: "prev" | "next") => {
    if (type === "prev") {
      setPage((prevPage) => prevPage - 1);
    } else {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "2rem 0",
      }}
    >
      <div>
        {favContacts && favContacts.length > 0 ? (
          <>
            <h4
              style={{
                marginTop: "1rem",
              }}
            >
              Your Favorite People
            </h4>
            <ContactGridContainer>
              {favContacts.map((contact: TContact) => {
                return (
                  <ContactCard
                    contact={contact}
                    key={contact.id}
                    toggleDropdown={() => toggleDropdown(contact.id)}
                    toggleDetailModal={() => {
                      setIsDetailModalOpen(true), setSelectedId(contact.id);
                    }}
                    toggleDeleteModal={() => {
                      setisDeleteModalOpen(true), setSelectedId(contact.id);
                    }}
                    isExpanded={openDropdownIndex === contact.id}
                  />
                );
              })}
            </ContactGridContainer>
          </>
        ) : (
          <h2
            style={{
              textAlign: "center",
            }}
          >
            No Contact Available
          </h2>
        )}
        <PaginationContainer>
          {page > 1 && (
            <PaginationButton onClick={() => handlePageChange("prev")}>
              Previous
            </PaginationButton>
          )}
          {favContacts?.length >= 10 && (
            <PaginationButton onClick={() => handlePageChange("next")}>
              Next
            </PaginationButton>
          )}
        </PaginationContainer>
      </div>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setisDeleteModalOpen(false)}
        selectedContact={selectedId}
      />
      <DetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        contactId={selectedId}
      />
    </div>
  );
};

export default Contact;
