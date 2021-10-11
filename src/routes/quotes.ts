import express from 'express';
import QuoteController from '../controllers/quotes';

const route = express();
const quoteController = new QuoteController();

route.post('/:idOrUsername', quoteController.createQuote);
route.get('/:idOrUsername', quoteController.getQuoteByUser);

module.exports = route;