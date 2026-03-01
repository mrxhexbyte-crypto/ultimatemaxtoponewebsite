"use client";

import React from 'react';

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <p className="text-lg mt-4">{error.message}</p>
      <button
        onClick={reset}
        className="mt-8 px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
