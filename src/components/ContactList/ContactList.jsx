import { ContactListElement } from "./ContactList.styled";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contactsSlice";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <ContactListElement>
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </ContactListElement>
  );
};

export default ContactList;
