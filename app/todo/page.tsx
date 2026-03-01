'use client';

import { useTodoStore } from '@/store/todoStore';
import { AddTodo } from '@/components/todo/AddTodo';
import { TodoItem } from '@/components/todo/TodoItem';

const TodoPage = () => {
  const todos = useTodoStore((state) => state.todos);

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-8 text-center">My To-Do List</h1>
        <AddTodo />
        <div className="mt-8 border rounded-lg bg-background/50">
          {todos.length > 0 ? (
            todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          ) : (
            <p className="p-8 text-center text-muted-foreground">Your to-do list is empty.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default TodoPage;
