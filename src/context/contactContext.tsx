import { TContact } from "@/utils/queryType";
import { createContext, useContext, useState } from "react";

interface ContactContextValue {
  contacts: TContact[];
  setContacts: React.Dispatch<React.SetStateAction<TContact[]>>;
  favContacts: TContact[];
  setFavContacts: React.Dispatch<React.SetStateAction<TContact[]>>;
}

const ContactContext = createContext<ContactContextValue | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export function useContactContext() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContactContext must be used within a ContactProvider");
  }
  return context;
}

export const ContactProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [contacts, setContacts] = useState<TContact[]>([]);
  const [favContacts, setFavContacts] = useState<TContact[]>([]);
  const contextValue: ContactContextValue = {
    contacts,
    setContacts,
    favContacts,
    setFavContacts,
  };

  return (
    <ContactContext.Provider value={contextValue}>
      {children}
    </ContactContext.Provider>
  );
};
