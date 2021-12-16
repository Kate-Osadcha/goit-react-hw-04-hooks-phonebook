import { useState, useEffect } from 'react';
import Container from './components/Container';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

import s from './App.module.scss';

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsStorage = JSON.parse(localStorage.getItem('contacts'));
    if (contactsStorage) {
      setContacts(contactsStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const normalizedName = data.name.toLowerCase();
    const uniqId = Date.now().toString();
    if (contacts.some(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts.`);
    } else {
      const contact = {
        id: uniqId,
        name: normalizedName,
        number: data.number,
      };
      setContacts([contact, ...contacts]);
    }
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const normalizeFilter = filter.toLowerCase();
  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizeFilter),
  );

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };
  return (
    <Container>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className={s.title}>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={filterContacts} onDeleteContact={deleteContact} />
    </Container>
  );
}
