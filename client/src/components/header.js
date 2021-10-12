import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Header = () => {
    const [random, setRandom] = useState({});
    const randomRef = useRef();
    const colors = ['#62bccc', '#337ac0', '#ee9323', '#F2b922'];

    const getRandomColor = () => colors[randomNumber(colors.length - 1)]

    const randomNumber = (num) => {
        return Math.ceil(Math.random() * num);

    }
    useEffect(() => {
        randomRef.current.style.backgroundColor = getRandomColor();
        (async() => {
            const randomQuote = await axios.get('/api/quotes/random/');
            setRandom(randomQuote.data)
        })();
    }, [])
    return (
        <section className='randomQuote' ref={randomRef}>
            <header>QUOTE API</header>
            <div className='quote'>
            <h1>"{random.quote}"</h1>
            <p>-{random.author}</p>
            </div>
            <div className='scrollDown'>
            <i class="fa fa-angle-double-down"></i>
            </div>
        </section>
    )
}

export default Header
