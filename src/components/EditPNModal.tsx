import { useEffect, MouseEvent, useState } from "react";
import styled from "@emotion/styled";
import { colors } from "@/utils/colors";
import { GrUndo } from "react-icons/gr";
import { MdUpdate } from "react-icons/md";
import Button from "./Button";
import toast from "react-hot-toast";
import CustomInput from "./Input";
import { useMutation } from "@apollo/client";
import { UPDATE_PN_MUTATION } from "@/lib/graphql/mutation";
import { GET_CONTACT_DETAIL } from "@/lib/graphql/query";

interface IUpdatePNModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPN: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id: any;
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

const EditPNModal: React.FC<IUpdatePNModalProps> = ({
  isOpen,
  onClose,
  selectedPN,
  id,
}) => {
  const [updatedPN, setUpdatedPN] = useState("");

  const [updatePN] = useMutation(UPDATE_PN_MUTATION);
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

  const handleUpdatePN = async () => {
    try {
      await updatePN({
        variables: {
          pk_columns: {
            number: selectedPN,
            contact_id: id,
          },
          new_phone_number: updatedPN,
        },

        update: (cache) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const existingContactDetail:any = cache.readQuery({
            query: GET_CONTACT_DETAIL,
            variables: { id: id },
          });

          if (existingContactDetail) {
            const updatedContactDetail = {
              ...existingContactDetail,
              contact_by_pk: {
                ...existingContactDetail.contact_by_pk,
                phones: [
                  ...existingContactDetail.contact_by_pk.phones.map(
                    (phone: { id: number }) => {
                      if (phone.id === id) {
                        return {
                          ...phone,
                          number: updatedPN,
                        };
                      }
                      return phone;
                    }
                  ),
                ],
              },
            };

            console.log("updatedContactDetail", updatedContactDetail)

            cache.writeQuery({
              query: GET_CONTACT_DETAIL,
              variables: { id: id },
              data: updatedContactDetail,
            });
          }
        },
      });
      toast.success("Contact updated successfully");
      onClose();
    } catch (error) {
      toast.error("An error occurred while updating the contact");
      console.error("An error occurred while updating the contact:", error);
    }
  };

  return (
    isOpen && (
      <ModalOverlay id="modal-overlay" onClick={handleOutsideClick}>
        <ModalContent>
          <h3
            style={{
              textAlign: "center",
            }}
          >
            Update Phone Number
          </h3>
          <CustomInput
            type="text"
            id="phone"
            label="Phone Number"
            value={selectedPN}
            readonly
          />
          <CustomInput
            type="text"
            id="new-phone"
            label="New Phone Number"
            value={updatedPN}
            onValueChange={(e) => setUpdatedPN(e.target.value)}
          />

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
            <Button color={colors.dodgerBlue} onClick={handleUpdatePN}>
              <MdUpdate />
              Update
            </Button>
          </ModalButtonContainer>
        </ModalContent>
      </ModalOverlay>
    )
  );
};

export default EditPNModal;
