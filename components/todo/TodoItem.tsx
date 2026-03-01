'use client';

import { useTodoStore, Todo } from '@/store/todoStore';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { removeTodo, toggleTodo } = useTodoStore();

  return (
    <div className="flex items-center space-x-4 p-4 border-b">
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => toggleTodo(todo.id)}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-grow ${todo.completed ? 'text-muted-foreground line-through' : ''}`}>
        {todo.text}
      </label>
      <Button variant="ghost" size="icon" onClick={() => removeTodo(todo.id)}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
