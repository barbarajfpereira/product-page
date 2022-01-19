import { useState } from 'react';
import './App.scss';
import Header from './components/Header/Header.jsx';
import Display from './components/Display/Display.jsx';

function App() {
  const [isWishlist, setIsWishlist] = useState(false);

  const toggleIsWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  return (
    <div className='app'>
      <Header isWishlist={isWishlist} toggleIsWishlist={toggleIsWishlist} />

      <Display isWishlist={isWishlist} />
    </div>
  );
}

export default App;
