import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [
    createMovie,
    { isLoading: isCreatingMovie, error: createMovieErrorDetail },
  ] = useCreateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?._id || "",
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "genre") {
      const selectedGenre = genres.find((genre) => genre.name === value);

      setMovieData((prevData) => ({
        ...prevData,
        genre: selectedGenre ? selectedGenre._id : "",
      }));
    } else {
      setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleCreateMovie = async () => {
    try {
      if (!selectedImage) {
        toast.error("Please select an image");
        return;
      }

      // Step 1: Upload the image to get the `imageUrl`
      const formData = new FormData();
      formData.append("image", selectedImage);

      const uploadImageResponse = await uploadImage(formData);

      if (uploadImageResponse.data && uploadImageResponse.data.image) {
        const imageUrl = uploadImageResponse.data.image;

        // Step 2: Create the movie with the `imageUrl`
        const movieToCreate = {
          ...movieData,
          image: imageUrl, // Include the uploaded image URL
        };

        await createMovie(movieToCreate);

        // Success message and redirect
        toast.success("Movie created successfully");
        navigate("/admin/movies-list");
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error creating movie:", error);
      toast.error("An error occurred while creating the movie");
    }
  };

  return (
    <div className="max-w-[98%] mx-auto mt-4">
      <form className="max-w-[95%] sm:max-w-[85%] md:max-w-[60%] mx-auto">
        <p className="text-red-500 w-[50rem] text-4xl font-semibold mb-4">
          Create Movie
        </p>
        <div className="mb-4">
          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              value={movieData.name}
              onChange={handleChange}
              className="border px-2 py-2 w-full rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Year:
            <input
              type="number"
              name="year"
              value={movieData.year}
              onChange={handleChange}
              className="border px-2 py-2 w-full rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Detail:
            <textarea
              name="detail"
              value={movieData.detail}
              onChange={handleChange}
              className="border px-2 py-2 w-full rounded"
            ></textarea>
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Cast (comma-separated):
            <input
              type="text"
              name="cast"
              value={movieData.cast.join(", ")}
              onChange={(e) =>
                setMovieData({ ...movieData, cast: e.target.value.split(", ") })
              }
              className="border px-2 py-2 w-full rounded"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Genre:
            <select
              name="genre"
              value={movieData.genre}
              onChange={handleChange}
              className="border px-2 py-2 w-full rounded"
            >
              {isLoadingGenres ? (
                <option>Loading genres...</option>
              ) : (
                genres.map((genre) => (
                  <option
                    key={genre._id}
                    value={genre.id}
                  >
                    {genre.name}
                  </option>
                ))
              )}
            </select>
          </label>
        </div>

        <div className="mb-4">
          <label
            style={
              !selectedImage
                ? {
                    border: "1px solid #888",
                    borderRadius: "5px",
                    padding: "8px",
                  }
                : {
                    border: "0",
                    borderRadius: "0",
                    padding: "0",
                  }
            }
          >
            {!selectedImage && "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: !selectedImage ? "none" : "block" }}
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleCreateMovie}
          className="bg-red-500 text-white px-4 py-2  mb-5 rounded"
          disabled={isCreatingMovie || isUploadingImage}
        >
          {isCreatingMovie || isUploadingImage ? "Creating..." : "Create Movie"}
        </button>
      </form>
    </div>
  );
};
export default CreateMovie;
