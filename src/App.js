import React, { useState, useEffect } from 'react';

function App() {
  // State for items
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Effect to log changes (just to show useEffect)
  useEffect(() => {
    console.log('Items updated:', items);
  }, [items]);

  // Add or update item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    if (editIndex !== null) {
      const updated = [...items];
      updated[editIndex] = input;
      setItems(updated);
      setEditIndex(null);
    } else {
      setItems([...items, input]);
    }
    setInput('');
  };

  // Edit item
  const handleEdit = (index) => {
    setInput(items[index]);
    setEditIndex(index);
  };

  // Delete item
  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📝 Item Manager</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter item"
        />
        <button type="submit">{editIndex !== null ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {items.length === 0 && <p>No items yet.</p>}
        {items.map((item, index) => (
          <li key={index}>
            {item}
            {' '}
            <button onClick={() => handleEdit(index)}>Edit</button>
            {' '}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
