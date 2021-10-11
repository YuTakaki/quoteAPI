import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/random.scss';

const App = () => {
  const [random, setRandom] = useState()
  useEffect(() => {
      (async() => {
        const randomQuote = await axios.get('/api/quotes/random/');
        setRandom(randomQuote.data)
      })()
  }, [])
  return (
    <div className="App">
      <section className='randomQuote'>

      </section>
      <section className='instruction'>

      </section>

    </div>
  );
}

export default App;
