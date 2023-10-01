import Button from "src/components/Button";
import { FlexContainer } from "src/components/utility/layout";
import { GET_CONTACT_LIST } from "src/lib/graphql/query";
import { colors } from "src/utils/colors";
import { useQuery } from "@apollo/client";
import { TContact } from "src/utils/queryType";
import ContactCard from "src/components/ContactCard";
import styled from "@emotion/styled";
import { ChangeEvent, useEffect, useState } from "react";
import DeleteModal from "src/components/modal/DeleteModal";
import { NavLink } from "react-router-dom";
import DetailModal from "src/components/modal/DetailModal";
import { BsArrowRight, BsFillPersonPlusFill, BsSearch } from "react-icons/bs";
import { useDebounce } from "src/hooks/useDebounce";
import CustomInput from "src/components/Input";
import FavouriteContactIcon from "src/components/FavouriteContactIcon";
import { useContactContext } from "src/context/contactContext";

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
  const [keyword, setKeyword] = useState<string>("");
  const debouncedKeywordValue = useDebounce<string>(keyword, 500);
  const { favContacts, removeFromFavorite } = useContactContext();
  const [filteredContact, setFilteredContact] = useState<TContact[]>([]);
  const [selectedId, setSelectedId] = useState(-1);
  const [page, setPage] = useState(1);

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  const { loading, error, data, refetch } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit: 10,
      offset: page * 10 - 10,
    },
  });

  useEffect(() => {
    refetch({
      where: {
        _or: [
          { first_name: { _ilike: `%${debouncedKeywordValue}%` } },
          { last_name: { _ilike: `%${debouncedKeywordValue}%` } },
          { phones: { number: { _ilike: `%${debouncedKeywordValue}%` } } },
        ],
      },
    });
  }, [debouncedKeywordValue, refetch]);

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

  useEffect(() => {
    if (data) {
      // check if favContacts is in data fetched from server, if not, then its stale, remove it

      favContacts.forEach((favContact: TContact) => {
        const isFavContactInData = data.contact.some(
          (contact: TContact) => contact.id === favContact.id
        );
        if (!isFavContactInData) {
          // remove from favContacts
          removeFromFavorite(favContact);
        }
      });

      // remove element from data if it is in favContacts
      const filteredData = data.contact.filter((contact: TContact) => {
        return !favContacts.some(
          (favContact: TContact) => favContact.id === contact.id
        );
      });
      setFilteredContact(filteredData);
    }
  }, [favContacts, data]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "2rem 0",
      }}
    >
      <FlexContainer justifyContent="flex-end" alignItems="start">
        <div
          style={{
            width: "min(100%, 20rem)",
          }}
        >
          <CustomInput
            icon={<BsSearch />}
            id="search-input"
            type="text"
            value={keyword}
            onValueChange={handleKeywordChange}
            placeholder="search name, or phone number"
          />
        </div>
        <NavLink to="/contact/create">
          <Button
            buttonType="PRIMARY"
            style={{
              padding: ".8rem 1rem",
            }}
          >
            Create
            <BsFillPersonPlusFill />
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
        <NavLink
          to="/favourite"
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            textDecoration: "none",
          }}
        >
          View All
          <BsArrowRight />
        </NavLink>
      </FlexContainer>
      <FlexContainer
        justifyContent="start"
        style={{
          overflowX: "scroll",
        }}
      >
        {favContacts?.length > 0 ? (
          favContacts?.map((contact: TContact) => {
            return (
              <FavouriteContactIcon
                contact={contact}
                key={contact.id}
                toggleDetailModal={() => {
                  setIsDetailModalOpen(true), setSelectedId(contact.id);
                }}
              />
            );
          })
        ) : (
          <p
            style={{
              textAlign: "center",
            }}
          >
            No Favourite Contact yet,{" "}
            <span style={{ color: "#03ac0eff" }}>start adding one!</span>
          </p>
        )}
      </FlexContainer>
      <div>
        {loading && <div>Loading...</div>}
        {error && <div>Error...</div>}
        {filteredContact && filteredContact.length > 0 ? (
          <>
            <h4
              style={{
                marginTop: "1rem",
              }}
            >
              All Contacts
            </h4>
            <ContactGridContainer>
              {filteredContact.map((contact: TContact) => {
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
          {data?.contact?.length >= 10 && (
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
