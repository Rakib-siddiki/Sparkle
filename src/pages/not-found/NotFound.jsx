const NotFound = () => {
  return (
    <div className="flex flex-col items-center h-screen justify-center text-center">
      <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl text-red-500">404 - Not Found😔</h1>
      <p className=" text-xl mt-2">The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
