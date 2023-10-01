import { useEffect, MouseEvent } from "react";
import styled from "@emotion/styled";
import { colors } from "src/utils/colors";

import Button from "src/components/Button";
import { useQuery } from "@apollo/client";
import { GET_CONTACT_DETAIL } from "src/lib/graphql/query";
import { useContactContext } from "src/context/contactContext";
import { BsStar, BsStarFill } from "react-icons/bs";
import toast from "react-hot-toast";

interface IDetailModal {
  isOpen: boolean;
  onClose: () => void;
  contactId: number;
}

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 100;
  padding: 1rem;
`;

const ModalContent = styled.div`
  position: relative;
  width: calc(100% - 4rem);
  top: 50%;
  left: 1rem;
  right: 1rem;
  transform: translate(0, -50%);
  background-color: ${colors.white};
  color: black;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  h2 {
    font-size: 1.5rem;
  }
  p {
    font-size: 0.8rem;
    color: ${colors.silver};
  }
  button {
    width: fit-content;
  }

  @media (min-width: 768px) {
    left: 50%;
    max-width: 400px;
    transform: translate(-50%, -50%);
`;

const ModalButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ProfileImage = styled.img`
  width: max(30%, 100px);
  aspect-ratio: 1/1;
  top: 0;
  transform: translate(0, -50%);
  border-radius: 100%;
  position: absolute;

  background-color: ${colors.green500};
`;

const DetailModal: React.FC<IDetailModal> = ({
  isOpen,
  onClose,
  contactId,
}) => {
  const { loading, error, data } = useQuery(GET_CONTACT_DETAIL, {
    variables: {
      id: contactId,
    },
  });

  const { favContacts, addToFavorite, removeFromFavorite } =
    useContactContext();
  const isFav = favContacts.some((favContact) => favContact.id === contactId);

  const handleFav = () => {
    if (isFav) {
      removeFromFavorite(data.contact_by_pk);
      toast.success("Contact removed from favourite");
    } else {
      addToFavorite(data.contact_by_pk);
      toast.success("Contact added to favourite");
    }
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleOutsideClick = (event: MouseEvent<HTMLDivElement>) => {
    if (
      event.target instanceof HTMLDivElement &&
      event.target.id === "modal-overlay"
    ) {
      onClose();
    }
  };

  return (
    isOpen && (
      <ModalOverlay id="modal-overlay" onClick={handleOutsideClick}>
        {loading ? (
          <ModalContent>
            <h2>Loading...</h2>
          </ModalContent>
        ) : error ? (
          <ModalContent>
            <h2>Error</h2>
            <p>{error.message}</p>
            <Button buttonType="PRIMARY" onClick={onClose}>
              Close
            </Button>
          </ModalContent>
        ) : (
          <ModalContent>
            <ProfileImage
              src={`https://api.dicebear.com/7.x/open-peeps/svg?seed=${data.contact_by_pk.first_name}+${data.contact_by_pk.last_name}`}
            />
            <div
              style={{
                paddingTop: "100px",
              }}
            >
              <h2>
                {data.contact_by_pk.first_name} {data.contact_by_pk.last_name}
              </h2>
              {data.contact_by_pk.phones.map(
                (phone: { number: string }, index: number) => (
                  <p key={index}>{phone.number}</p>
                )
              )}
              <ModalButtonContainer>
                <Button onClick={onClose} buttonType="SECONDARY">
                  Close
                </Button>
                <Button onClick={handleFav} buttonType="PRIMARY">
                  {isFav ? (
                    <>
                      <BsStar />
                      Remove from Favourite
                    </>
                  ) : (
                    <>
                      <BsStarFill />
                      Add to Favourite
                    </>
                  )}
                </Button>
              </ModalButtonContainer>
            </div>
          </ModalContent>
        )}
      </ModalOverlay>
    )
  );
};

export default DetailModal;
