import {
  queryByText,
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import React from 'react';

beforeEach(() => {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

it('should render shopping list', () => {
  screen.getByText('Dog Treat');
});

it('should delete an item', () => {
  const book = screen.getByText('Book');
  // await waitForElementToBeRemoved(() => book);
  const deleteButton = screen.getAllByText('Delete')[0];
  userEvent.click(deleteButton);
  expect(book).not.toBeInTheDocument();
});

it('should edit an item', async () => {
  const editButton = screen.getAllByText('Edit')[0];
  userEvent.click(editButton);
  const book = screen.getByDisplayValue('Book');
  userEvent.type(book, '2');
  const bookSave = screen.getByText('Save');
  userEvent.click(bookSave);
  const editedBook = await screen.findByText('Book2');
  expect(editedBook).toBeInTheDocument();
});

it('should add an item', async () => {
  //grab the input
  const newInput = screen.getByPlaceholderText('New');
  //grab the button
  const addButton = screen.getByText('Add Item');
  //get the typed input
  userEvent.type(newInput, 'Noodles');
  //click the add button
  userEvent.click(addButton);
  //grab the newBook that's rendered
  const newBook = await screen.findByText('Noodles');
  //check render
  expect(newBook).toBeInTheDocument();
});
