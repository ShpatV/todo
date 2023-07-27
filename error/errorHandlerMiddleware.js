// errorHandlerMiddleware.js

class ErrorHandlerMiddleware {
  handle(err, req, res, next) {
    // Trajtojme gabimin e parametrave të padërguar (400 Bad Request)
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({ error: 'Invalid JSON format' });
    }

    // Trajtojme gabime specifike për Task dhe Category
    if (err.type === 'TaskNotFound') {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (err.type === 'CategoryNotFound') {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Gabime të tjera që nuk janë kapur
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
}

function errorHandler(err, req, res, next) {
  const errorHandlerMiddleware = new ErrorHandlerMiddleware();
  errorHandlerMiddleware.handle(err, req, res, next);
}

module.exports = errorHandler;
