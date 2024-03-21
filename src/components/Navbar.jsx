import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-zinc-900 text-white py-4">
      <div className="logo">
        <span className="font-bold text-xl mx-9">Tasks-todo</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer px-4 hover:font-bold transition-all duration-50">
          Home
        </li>
        <li className="cursor-pointer hover:font-bold transition-all duration-50">
          Tasks
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
