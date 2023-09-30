import { colors } from "@/utils/colors";
import { TContact } from "@/utils/queryType";
import styled from "@emotion/styled";
import { FiDelete, FiEdit } from "react-icons/fi";
// import { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { NavLink } from "react-router-dom";

interface IContactCard {
  contact: TContact;
  toggleDropdown: () => void;
  isExpanded: boolean;
  toggleModal: () => void;
}

export const DropdownMenu = styled.div`
  position: absolute;
  right: 0;
  top: 100%;
  width: fit-content;
  height: fit-content;
  background-color: black;
  border-radius: 0.5rem;
  z-index: 10;
  padding: 0.5rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out;
`;

export const DropdownItem = styled.div<{ color: string }>`
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
  font-size: 0.8rem;
  &:hover {
    background-color: ${(props) => props.color || colors.gunmetal}}};
  }
`;
const ContactCardWrapper = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
`;

const AvatarImage = styled.img`
  border-radius: 100%;
  width: 50px;
  aspect-ratio: 1/1;
`;

const ContactName = styled.div`
  font-weight: bold;
`;

const ContactPhone = styled.div`
  font-weight: light;
  color: #a0aec0;
`;

const ContactCard = ({
  contact,
  isExpanded,
  toggleDropdown,
  toggleModal,
}: IContactCard) => {
  const { first_name, last_name, phones, id } = contact;
  return (
    <>
      <ContactCardWrapper>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <AvatarImage
            src={`https://ui-avatars.com/api/?name=${first_name}+${last_name}&background=random`}
            alt={`${first_name} ${last_name}`}
          />
          <div>
            <ContactName>
              {first_name} {last_name}
            </ContactName>
            <ContactPhone>{phones[0].number}</ContactPhone>
          </div>
        </div>
        <div
          style={{
            position: "relative",
            cursor: "pointer",
          }}
          onClick={() => toggleDropdown()}
        >
          <SlOptionsVertical />
          {isExpanded && (
            <DropdownMenu>
              <NavLink to={`/contact/edit/${id}`}>
                <DropdownItem color={colors.mint}>
                  <FiEdit /> Edit
                </DropdownItem>
              </NavLink>
              <DropdownItem
                color={colors.bittersweet}
                onClick={() => toggleModal()}
              >
                <FiDelete />
                Delete
              </DropdownItem>
            </DropdownMenu>
          )}
        </div>
      </ContactCardWrapper>
    </>
  );
};

export default ContactCard;
