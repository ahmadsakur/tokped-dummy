import { useEffect, MouseEvent } from "react";
import styled from "@emotion/styled";
import { colors } from "@/utils/colors";
import { PiWarningCircleLight } from "react-icons/pi";
import Button from "../Button";
import { DELETE_CONTACT_MUTATION } from "@/lib/graphql/mutation";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

interface IDeleteModal {
  isOpen: boolean;
  onClose: () => void;
  selectedContact: number;
}

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  padding: 1rem;
`;

const ModalContent = styled.div`
  position: absolute;
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
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.green100};
  color: ${colors.green500};
  border-radius: 100%;
  padding: 1rem;
`;

const DeleteModal: React.FC<IDeleteModal> = ({
  isOpen,
  onClose,
  selectedContact,
}) => {
  const [deleteContactMutation] = useMutation(DELETE_CONTACT_MUTATION);

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

  const handleDeleteContact = async (selectedContactId: number) => {
    try {
      await deleteContactMutation({
        variables: { id: selectedContactId },
        update: (cache) => {
          cache.modify({
            fields: {
              contact(existingContacts = [], { readField }) {
                return existingContacts.filter(
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (contactRef: any) =>
                    selectedContactId !== readField("id", contactRef)
                );
              },
            },
          });
        },
      });
      toast.success("Contact deleted successfully");
      onClose();
    } catch (error) {
      toast.error("An error occurred while deleting the contact");
      console.error("An error occurred while deleting the contact:", error);
    }
  };

  return (
    isOpen && (
      <ModalOverlay id="modal-overlay" onClick={handleOutsideClick}>
        <ModalContent>
          <IconContainer>
            <PiWarningCircleLight />
          </IconContainer>
          <h2>Delete Contact</h2>
          <p>
            Are you sure you want to delete this contact? This action cannot be
            undone.
          </p>
          <ModalButtonContainer>
            <Button buttonType="SECONDARY" onClick={onClose}>
              Cancel
            </Button>
            <Button
              buttonType="PRIMARY"
              onClick={() => handleDeleteContact(selectedContact)}
            >
              Delete
            </Button>
          </ModalButtonContainer>
        </ModalContent>
      </ModalOverlay>
    )
  );
};

export default DeleteModal;
