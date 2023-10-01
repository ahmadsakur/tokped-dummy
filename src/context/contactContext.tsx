import { TContact } from "@/utils/queryType";
import { createContext, useContext, useEffect, useState } from "react";

interface ContactContextValue {
  favContacts: TContact[];
  addToFavorite: (contact: TContact) => void;
  removeFromFavorite: (contact: TContact) => void;
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
  // const [contacts, setContacts] = useState<TContact[]>([]);
  const [favContacts, setFavContacts] = useState<TContact[]>([]);
 

  useEffect(() => {
    const localFavContacts = localStorage.getItem("favContacts");
    if (localFavContacts) {
      setFavContacts(JSON.parse(localFavContacts));
      console.log("localFavContacts", localFavContacts);
    }
  }, []);

  const addToFavorite = (contact: TContact) => {
    setFavContacts((prev) => [...prev, contact]);
    localStorage.setItem(
      "favContacts",
      JSON.stringify([...favContacts, contact])
    );
  };

  const removeFromFavorite = (contact: TContact) => {
    setFavContacts((prev) =>
      prev.filter((favContact) => favContact.id !== contact.id)
    );
    localStorage.setItem(
      "favContacts",
      JSON.stringify(
        favContacts.filter((favContact) => favContact.id !== contact.id)
      )
    );
  };

  const contextValue: ContactContextValue = {
    favContacts,
    addToFavorite,
    removeFromFavorite,
  };
  return (
    <ContactContext.Provider value={contextValue}>
      {children}
    </ContactContext.Provider>
  );
};
