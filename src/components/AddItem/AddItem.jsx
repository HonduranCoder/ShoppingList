import { useState } from 'react';

export default function addItem({ onAddItem }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setText('');
    onAddItem(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="New"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}
