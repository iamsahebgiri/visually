import React from "react";

export default function IconButton(props) {
  return (
    <button
      type="button"
      className="py-2 px-4 text-sm select-none font-medium text-slate-900 bg-white rounded-full inline-flex items-center hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-blue-200"
      {...props}
    />
  );
}
