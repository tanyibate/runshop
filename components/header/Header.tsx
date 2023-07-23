import React from "react";

export default function index({ pageName }) {
  return (
    <header className="bg-white shadow w-screen w-100 fixed top-16 left-1/2 -translate-x-1/2 h-20 z-0">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="sm:text-xl font-bold tracking-tight text-gray-900">
          {pageName}
        </h1>
      </div>
    </header>
  );
}
