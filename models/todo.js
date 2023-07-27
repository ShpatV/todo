// eslint-disable-next-line @typescript-eslint/no-var-requires
const ErrorManager = require('../error/errorManager');

class Todo {
  constructor(id, title, categoryId, description, due_date) {
    if (!description) {
      throw new ErrorManager.BadRequest('Përshkrimi i taskut duhet të plotësohet.');
    }

    if (!due_date || new Date(due_date) < new Date()) {
      throw new ErrorManager.BadRequest('Data e percaktuar është në të kaluarën ose nuk është specifikuar.');
    }
    this.id = id;
    this.title = title;
    this.categoryId = categoryId;
    this.description = description;
    this.due_date = due_date;
  }
}

module.exports = Todo;