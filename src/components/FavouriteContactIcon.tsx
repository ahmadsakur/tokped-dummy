import { colors } from "@/utils/colors";
import { TContact } from "@/utils/queryType";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: start;
  padding: 0.5rem;
  border-radius: 20rem;
  min-width: 10rem;
  align-items: center;
  background-color:rgba(0,0,0,0.1);
  cursor: pointer;
`;
const Avatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  background-color: ${colors.green500};
`;

const ContactName = styled.div`
  font-weight: bold;
`;

const ContactPhone = styled.div`
  font-weight: light;
  font-size: 0.8rem;
  color: #a0aec0;
`;

interface IFavouriteContactProps {
  contact: TContact;
  toggleDetailModal: () => void;
}
const FavouriteContactIcon = ({
  contact,
  toggleDetailModal,
}: IFavouriteContactProps) => {
  const { first_name, last_name, phones } = contact;

  return (
    <Wrapper onClick={() => toggleDetailModal()}>
      <Avatar
        src={`https://api.dicebear.com/7.x/open-peeps/svg?seed=${first_name}+${last_name}`}
        alt="john doe"
      />
      <div
        style={{
          marginRight: "1rem",
        }}
      >
        <ContactName>
          {first_name} {last_name}
        </ContactName>
        <ContactPhone>{phones[0].number}</ContactPhone>
      </div>
    </Wrapper>
  );
};

export default FavouriteContactIcon;
