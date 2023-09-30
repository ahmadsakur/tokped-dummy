import { useEffect, MouseEvent } from "react";
import styled from "@emotion/styled";
import { colors } from "@/utils/colors";
import { PiWarningCircleLight } from "react-icons/pi";
import { GrUndo } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import Button from "./Button";

interface IDeleteModal {
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
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
  background-color: ${colors.dark};
  color: white;
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

const DeleteModal: React.FC<IDeleteModal> = ({ isOpen, onClose }) => {
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
    <div>
      {isOpen && (
        <ModalOverlay id="modal-overlay" onClick={handleOutsideClick}>
          <ModalContent>
            <div style={{ 
              padding: "1rem",
              borderRadius: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              color: colors.bittersweet,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
             }}>
              <PiWarningCircleLight />
            </div>
            <h2>Delete Contact</h2>
            <p>
              Are you sure you want to delete this contact? This action cannot
              be undone.
            </p>
            <ModalButtonContainer>
              <Button
                color={colors.gunmetal}
                onClick={onClose}
                style={{
                  color: colors.white,
                }}
              >
                <GrUndo />
                Cancel
              </Button>
              <Button color={colors.bittersweet} onClick={onClose}>
                <MdOutlineCancel />
                Delete
              </Button>
            </ModalButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

export default DeleteModal;
