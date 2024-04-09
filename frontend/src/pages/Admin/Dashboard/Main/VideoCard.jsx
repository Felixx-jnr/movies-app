const VideoCard = ({ image, title, date, comments }) => {
  return (
    <>
      <div className="flex items-center max-w-[100%] mt-5 mx-auto">
        <div>
          <img
            src={image}
            alt="Card"
            className="h-[3rem]"
          />
        </div>

        <div className="ml-4">
          <h2 className="text-lg text-white">{title}</h2>
          <p className="text-gray-500 ">{date}</p>
        </div>

        <div className="flex-grow mb-5 flex justify-end items-center">
          <div className="text-white text-lg">{comments}</div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
