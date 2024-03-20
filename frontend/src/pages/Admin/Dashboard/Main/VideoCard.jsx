const VideoCard = ({ image, title, date, comments }) => {
  return (
    <>
      <div className="flex items-center ml-44 mr-5 max-w-[70%] sm:max-w-[60%] mt-5 mx-auto">
        <div>
          <img
            src={image}
            alt="Card"
            className="h-[3rem]"
          />
        </div>

        <div className="ml-4">
          <h2 className="text-lg text-white">{title}</h2>
          <p className="text-gray-500 mb-3">{date}</p>
        </div>

        <div className="flex-grow mb-5 flex justify-end items-center">
          <div className="text-white text-lg">{comments}</div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
