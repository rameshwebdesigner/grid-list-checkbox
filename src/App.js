import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/users")
      .then(res => {
        setUsers(res.data);
      })
      .catch(error => console.log(error));
  }, []);
  const handleChange = (record, event) => {
    const copyUsers = users;
    const modifiedUsers = copyUsers.find((item) => item.id === record.id);
    if (modifiedUsers) {
      modifiedUsers.checked = event.target.checked;
    }
    axios.put("http://localhost:3001/users/" + record.id, modifiedUsers)
      .then(res => {
        console.log(res.data);
        axios.get("http://localhost:3001/users")
          .then(res => {
            setUsers(res.data);
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error))
  }
  const handleDelete = (id) => {
    axios.delete("http://localhost:3001/users/" + id)
      .then(res => {
        console.log(res.data);
        axios.get("http://localhost:3001/users")
          .then(res => {
            setUsers(res.data);
          })
          .catch(error => console.log(error));
      })
  }
  return (
    <div className="container mt-5">
      <table className="table">
        <thead>
          <tr>
            <th >#</th>
            <td>Name</td>
            <td>Email</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {users.map((item) =>
            <tr key={item.id}>
              <td><input className="form-check-input mt-1" type="checkbox" checked={item.checked} onChange={(event) => handleChange(item, event)} /></td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.checked && (<button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
