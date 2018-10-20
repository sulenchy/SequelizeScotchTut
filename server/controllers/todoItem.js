import models from '../models';

const TodoItem = models.TodoItem;

export default class TodoItemController {
  static create(req, res) {
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId,
      })
      .then(todoItem => res.status(201).send(todoItem))
      .catch(error => res.status(400).send(error.message));
  }

  static update(req, res) {
    return TodoItem
      .find({
          where: {
            id: req.params.todoItemId,
            todoId: req.params.todoId,
          },
        })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }
  
        return todoItem
        .update(req.body, { fields: Object.keys(req.body) })
          .then(updatedTodoItem => res.status(200).send(updatedTodoItem))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  
  static destroy(req, res) {
    return TodoItem
      .find({
          where: {
            id: req.params.todoItemId,
            todoId: req.params.todoId,
          },
        })
      .then(todoItem => {
        if (!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }
  
        return todoItem
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};