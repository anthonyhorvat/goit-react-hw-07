import { nanoid } from "nanoid";
import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, deleteContact, addContact } from "./contactsOps";
import { createSelector } from "@reduxjs/toolkit";
import { selectTextFilter } from "./filtersSlice";

const oldContacts = [
  { name: "Rosie Simpson", number: "459-12-56" },
  { name: "Hermione Kline", number: "443-89-12" },
  { name: "Eden Clements", number: "645-17-79" },
  { name: "Annie Copeland", number: "227-91-26" },
];

const items = oldContacts.map((contact) => {
  contact.id = nanoid();
  return contact;
});

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items,
    loading: false,
    error: null,
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(deleteContact.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteContact.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addContact.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state) => {
        state.loading = false;
        state.error = true;
      }),
});

export default contactsSlice.reducer;

export const selectLoading = (state) => state.contacts.loading;

export const selectError = (state) => state.contacts.error;

export const selectContacts = (state) => state.contacts.items;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectTextFilter],
  (contacts, textFilter) => {
    console.log("selectFilteredContacts");
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(textFilter.toLowerCase())
    );
  }
);
