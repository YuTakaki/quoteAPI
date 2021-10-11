import { useEffect } from 'react';
import axios from 'axios';

const App = () => {
  useEffect(() => {
      (async() => {
        const randomQuote = await axios.get('/api/quotes/random/');
        console.log(randomQuote);
      })()
  }, [])
  return (
    <div className="App">

    </div>
  );
}

export default App;
