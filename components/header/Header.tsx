import React from "react";

function Header({ menu }: any) {
  return (
    <nav className="w-full p-1 py-8 bg-gray-500">
      <div className="w-full max-w-6xl mx-auto flex flex-row items-center"></div>
      {menu?.map((item: any) => (
        <a
          key={item.node.id}
          href={item.node.path}
          className="text-white hover:text-gray-300 px-4 py-2"
        >
          {item.node.label}
        </a>
      ))}
    </nav>
  );
}

export default Header;
