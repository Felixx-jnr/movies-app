import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainer";

const Home = () => {
  return (
    <>
      <Header />

      <section className="mt-10">
        <MoviesContainerPage />
      </section>
    </>
  );
};

export default Home;
