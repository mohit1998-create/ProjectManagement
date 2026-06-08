const Navbar = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">
        Dashboard
      </h2>

      <div>
        <p className="font-medium">
          {user?.name}
        </p>

        <p className="text-sm text-gray-500">
          {user?.role}
        </p>
      </div>
    </header>
  );
};

export default Navbar;