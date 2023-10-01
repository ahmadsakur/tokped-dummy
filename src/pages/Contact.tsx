import Button from "@/components/Button";
import { FlexContainer } from "@/components/utility/layout";
import { GET_CONTACT_LIST } from "@/lib/graphql/query";
import { colors } from "@/utils/colors";
import { useQuery } from "@apollo/client";
import { TContact } from "@/utils/queryType";
import ContactCard from "@/components/ContactCard";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import DeleteModal from "@/components/modal/DeleteModal";
import { PiArrowRight } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import DetailModal from "@/components/modal/DetailModal";

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
  display: none;
  @media (min-width: 768px) {
    border: none;
    background-color: ${colors.green500};
    padding: 0.5rem 1rem;
    border-radius: 0.2rem;
    cursor: pointer;
    color: ${colors.white};
    display: block;
  }
`;

const PaginationMoreButton = styled.button`
  border: none;
  background-color: ${colors.white};
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  margin-right: 1rem;
  cursor: pointer;
  color: ${colors.mint};

  @media (min-width: 768px) {
    display: none;
  }
`;
const Contact = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(-1);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(-1);
  const [page, setPage] = useState(1);

  const { loading, error, data, refetch } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit: 10,
      offset: page * 10 - 10,
    },
  });

  useEffect(() => {
    refetch({
      limit: 10,
      offset: page * 10 - 10,
    });
  }, [page, refetch]);

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

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
      }}
    >
      <FlexContainer justifyContent="space-between">
        <h2>Contact</h2>
        <NavLink to="/contact/create">
          <Button buttonType="PRIMARY">
            Create
            {/* <LuSettings2 /> */}
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
        {error && <div>Error...</div>}
        {data && data.contact.length > 0 ? (
          <>
            <h4
              style={{
                marginTop: "1rem",
              }}
            >
              All Contacts
            </h4>
            <ContactGridContainer>
              {data.contact.map((contact: TContact) => {
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
          <h2 style={{ 
            textAlign: "center",
           }}>No Contact Available</h2>
        )}
        <PaginationContainer>
          {page > 1 && (
            <PaginationButton onClick={() => handlePageChange("prev")}>
              Previous
            </PaginationButton>
          )}
          {/* {data && data.contact.length > 10 && ( */}
            <>
              <PaginationButton onClick={() => handlePageChange("next")}>
                Next
              </PaginationButton>
              <PaginationMoreButton>Load More</PaginationMoreButton>
            </>
          {/* )} */}
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
