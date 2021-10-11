import express from 'express';
import QuoteController from '../controllers/quotes';

const route = express();
const quoteController = new QuoteController();

route.post('/:idOrUsername', quoteController.createQuote);
route.get('/random', quoteController.getRandomQuote);
route.get('/:id', quoteController.getQuote);
route.delete('/:id', quoteController.deleteQuote);
route.patch('/:id', quoteController.updateQuote);
route.get('/user/:idOrUsername', quoteController.getQuoteByUser);

module.exports = route;