import express from 'express';
import QuoteController from '../controllers/quotes';
import Middleware from '../middleware/middleware';

const route = express();
const quoteController = new QuoteController();
const middleware = new Middleware()

route.get('/', quoteController.getAllQuote);
route.get('/random', quoteController.getRandomQuote);
route.get('/:id', quoteController.getQuote);
route.delete('/:id', quoteController.deleteQuote);
route.patch('/:id', quoteController.updateQuote);
route.use('/:idOrUsername', middleware.checkParams)
route.post('/:idOrUsername', quoteController.createQuote);
route.get('/user/:idOrUsername', middleware.checkParams, quoteController.getQuoteByUser);

module.exports = route;