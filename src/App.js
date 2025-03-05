import './App.css';
import AllBlocks from './components/AllBlocks';
import Header from './components/Header';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rooms from './components/Rooms';
import Book from './components/Book';
import Confirmation from './components/Confirmation';
import Footer from './components/Footer'
import SeminarAudi from './components/SeminarAudi';
import BookSeminar from './components/BookSeminar';
import ConfirmationSeminar from './components/ConfirmationSeminar';
import Admin from './components/Admin';
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [user,setUser]=useState(null)
  return (
    <>
      <Router>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path='/' element={<><Header /><AllBlocks /><Footer /></>} />
          <Route path='/:place/:block_code' element={<Rooms user={user}/>} />
          <Route path='/book/:place/:block_code/:room_no/:day/:slot' element={<Book user={user}/>} />
          <Route path='/confirmation/:place/:block_code/:room_no/:day/:slot' element={<Confirmation />} />
          <Route path='/seminarAudi/:block_code' element={<SeminarAudi user={user}/>} />
          <Route path='bookSeminar/:block_code/:seminar/:date/:slot' element={<BookSeminar user={user}/>}/>
          <Route path='confirmationSeminar/:block_code/:seminar/:date/:slot' element={<ConfirmationSeminar/>}/>
          <Route path='/pendingRequests' element={<Admin user={user}/>}/>
          <Route path='/login' element={<Login setUser={setUser}/>} />
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
