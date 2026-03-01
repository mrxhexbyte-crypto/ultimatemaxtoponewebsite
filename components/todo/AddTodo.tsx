'use client';

import { useState } from 'react';
import { useTodoStore } from '@/store/todoStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const AddTodo = () => {
  const [text, setText] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow"
      />
      <Button type="submit">Add Todo</Button>
    </form>
  );
};
