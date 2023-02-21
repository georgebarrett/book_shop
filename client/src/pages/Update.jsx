import axios from 'axios';
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Update = () => {

  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: ""
  });

  const [error, setError] = useState(false)

  const navigate = useNavigate();

  const location = useLocation();

  const bookId = location.pathname.split("/")[2]

  // console.log(location.pathname.split("/")[2])

  const handleChange = (e) => {
    setBook((prev) => ({...prev, [e.target.name]: e.target.value }));
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book)
      navigate("/")
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  // console.log(book)

  return (
    <div className="form">
      <h1>Update book details</h1>
      <input type="text" placeholder="Book title" onChange={handleChange} name="title" />
      <textarea rows={5} type="text" placeholder="Book Description" onChange={handleChange} name="desc" />
      <input type="number" placeholder="Book price" onChange={handleChange} name="price" />
      <input type="text" placeholder="Book cover" onChange={handleChange} name="cover" />
      <button className="formButton" onClick={handleClick}>Update</button>

      {error && "Something went wrong."}

      <Link to="/">See all books</Link>
    </div>
  );
};

export default Update;