import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/databaseService";
import Container from "../Components/Container";
import PostCard from "../Components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { addPosts } from "../Utils/postSlice";
import Shimmer from "../Components/Shimmer";

const Home = () => {
  // const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    setLoading(true);
    databaseService.getPosts().then((posts) => {
      if (posts) {
        // setPosts(posts.documents);
        dispatch(addPosts(posts.documents));
        // console.log(posts.documents);
      }
    });
    setLoading(false);
  }, []);

  return loading ? (
    <Shimmer />
  ) : (
    <div className="md:px-4 py-8">
      <Container>
        <div className="grid grid-col-1 gap-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
          {posts.map((post) => (
            <div key={post.$id}>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
