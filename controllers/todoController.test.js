/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const todoController = require('./todoController');

// Testimi për getAllTasks (test për rastin e suksesit)
test('should return all tasks', async () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    json: jest.fn()
  };

  await todoController.getAllTasks(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalled();
});

// Testimi për createTask (krijimi i një task-i të ri) - Test për rastin e suksesit
test('should create a new task', async () => {
  const req = {
    body: {
      title: 'test jest',
      description: 'test jest',
      category: 1,
      due_date: '2026-07-31'
    }
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn()
  };

  await todoController.createTask(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalled();
});

// Testimi për updateTask (përditësimi i një task-i) - Test për rastin e suksesit
test('should update an existing task', async () => {
  const req = {
    params: {
      taskId: 94 // Zëvendëso me një task ID të ekzistueshëm nga baza e të dhënave
    },
    body: {
      title: 'Updated Task',
      description: 'This isupdated',
      category: 1,
      due_date: '2026-08-15'
    }
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn()
  };

  await todoController.updateTask(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalled();
});

// Testimi për deleteTask (fshirja e një task-i) - Test për rastin e suksesit
test('should delete an existing task', async () => {
  const req = {
    params: {
      taskId: 94 // Zëvendëso me një task ID të ekzistueshëm nga baza e të dhënave
    }
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn()
  };

  await todoController.deleteTask(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ message: 'Task was deleted' }); // Verifikoni përgjigjen e pritur
});

// Testimi për rastet kur testohen gabimet
test('should handle error when creating a new task', async () => {
  const req = {
    body: {
      // Të dhënat e nevendosura me qëllim që të ketë gabim gjatë validimit
      title: 'T',
      description: 'T',
      category: 1,
      due_date: 'invalid-date'
    }
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn()
  };

  try {
    await todoController.createTask(req, res);
  } catch (error) {
    // Verifikoni se si kontrolleri trajton gabimin dhe kthen status code dhe mesazh të gabimit të duhur
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Validation failed', message: 'Invalid input data' });
  }
});

test('should handle error when updating a task', async () => {
  const req = {
    params: {
      taskId: 300 // Këtu vendosim një ID të pavlefshëm për të provuar gabimin
    },
    body: {
      title: 'Updated Task',
      description: 'This is an updated task',
      category: 1,
      due_date: '2025-08-15'
    }
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn()
  };

  const next = jest.fn(); // Shtoni "next" si variabël dhe shfrytëzojeni në thirrjen e funksionit "updateTask"

  try {
    await todoController.updateTask(req, res, next); // Shtoni "next" si argument të funksionit "updateTask"
  } catch (error) {
    // Verifikoni se si kontrolleri trajton gabimin dhe kthen status code dhe mesazh të gabimit të duhur
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error', message: 'Something went wrong' });
  }
});

test('should handle error when deleting a task', async () => {
  const req = {
    params: {
      taskId: 300 // Këtu vendosim një ID të pavlefshëm për të provuar gabimin
    }
  };
  const res = {
    status: jest.fn(() => res),
    json: jest.fn()
  };

  try {
    await todoController.deleteTask(req, res);
  } catch (error) {
    // Verifikoni se si kontrolleri trajton gabimin dhe kthen status code dhe mesazh të gabimit të duhur
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Not Found', message: 'Task not found' });
  }
});
