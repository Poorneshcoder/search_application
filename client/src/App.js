import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [name, setName] = useState([]);
  const [addItem, setAddItem] = useState({ name: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const results = await axios.get('/');
      const itemsWithId = results.data.map(item => ({ id: item._id, name: item.name }));
      setName(itemsWithId);
      setFilteredItems(itemsWithId); // Initially show all items
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  }

  const handleChange = (e) => {
    setAddItem({ ...addItem, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/', addItem);
      getData(); // Refresh the list after adding a new item
      setAddItem({ name: '' }); // Reset input field
    } catch (error) {
      console.error("There was an error adding the item!", error);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${id}`); 
      getData(); // Refresh the list after deleting an item
    } catch (error) {
      console.error("There was an error deleting the item!", error);
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm === '') {
      setFilteredItems(name); // Show all items if search term is empty
    } else {
      const filtered = name.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredItems(filtered);
    }
  }

  return (
    <div className="App">
      <h1>Simple Search</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={addItem.name}
          onChange={handleChange}
          placeholder="Add a new name"
        />
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search name"
        />
        <button type="submit">Search</button>
      </form>

      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <ul key={item.id}>
            <li>
              {item.name}
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
          </ul>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default App;
