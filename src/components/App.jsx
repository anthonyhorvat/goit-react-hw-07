import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";
import ContactForm from "./ContactForm/ContactForm";
import Error from "./Error/Error";
import Loader from "./Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../redux/contactsOps";
import { useEffect } from "react";
import { selectLoading, selectError } from "../redux/contactsSlice";

import { AppContainer, ContactsTitle, FormTitle } from "./App.styled";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <AppContainer>
      <FormTitle>Phonebook</FormTitle>
      <ContactForm />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter />
      {error && <Error>Error</Error>}
      {loading && <Loader>Wait a sec...</Loader>}
      <ContactList />
    </AppContainer>
  );
};
export default App;
