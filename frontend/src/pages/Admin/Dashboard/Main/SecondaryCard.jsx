const SecondaryCard = ({ pill, content, gradient }) => {
  return (
    <div
      className={`w-[15rem] max-sm:w-[10rem] h-[8rem] sm:text-1xl relative mr-5 mt-5 bg-gradient-to-b ${gradient} rounded-lg shadow-lg ml-5 `}
    >
      <div className=" flex items-center justify-center h-full">
        <h2 className="text-2xl sm:text-2xl font-bold text-white mr-2">
          {content}
        </h2>
        <div className=" font-bold ">{pill}</div>
      </div>
    </div>
  );
};

export default SecondaryCard;
