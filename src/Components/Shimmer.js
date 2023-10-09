import Container from "./Container";
import ShimmerCard from "./ShimmerCard";

const Shimmer = () => {
  return (
    <div className="p-4">
      <Container>
        <div className="grid grid-col-1 gap-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6 animate-pulse">
          {Array(6)
            .fill("")
            .map((_, index) => {
              return <ShimmerCard key={index} />;
            })}
        </div>
      </Container>
    </div>
  );
};

export default Shimmer;
