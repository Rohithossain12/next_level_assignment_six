

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div className="md:w-14 md:h-14 w-12 h-12 border-4 border-t-4 border-t-rose-500  rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;