import React from "react";

export default function IconButton(props) {
  return (
    <button
      type="button"
      className="py-2 px-3 text-sm font-medium text-gray-900 bg-white rounded-full inline-flex items-center border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    >
      {props.children}
    </button>
  );
}
