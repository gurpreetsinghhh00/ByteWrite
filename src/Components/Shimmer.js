import Container from "./Container";
import ShimmerCard from "./ShimmerCard";

const Shimmer = () => {
  return (
    <div className="p-4">
      <Container>
        <div className="grid grid-cols-3 gap-6 animate-pulse">
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
