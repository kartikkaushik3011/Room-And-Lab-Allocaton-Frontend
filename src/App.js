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

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<><Header /><AllBlocks /><Footer /></>} />
          <Route path='/:place/:block_code' element={<Rooms />} />
          <Route path='/book/:place/:block_code/:room_no/:day/:slot' element={<Book />} />
          <Route path='/confirmation/:place/:block_code/:room_no/:day/:slot' element={<Confirmation />} />
          <Route path='/seminarAudi/:block_code' element={<SeminarAudi />} />
          <Route path='bookSeminar/:block_code/:seminar/:date/:slot' element={<BookSeminar/>}/>
          <Route path='confirmationSeminar/:block_code/:seminar/:date/:slot' element={<ConfirmationSeminar/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;