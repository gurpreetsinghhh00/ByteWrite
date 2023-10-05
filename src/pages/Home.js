import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/databaseService";
import Container from "../Components/Container";
import PostCard from "../Components/PostCard";
import ShimmerCard from "../Components/ShimmerCard";
import { useDispatch, useSelector } from "react-redux";
import { addPosts } from "../Utils/postSlice";
import Shimmer from "../Components/Shimmer";

const Home = () => {
  // const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    databaseService.getPosts().then((posts) => {
      if (posts) {
        // setPosts(posts.documents);
        dispatch(addPosts(posts.documents));
        // console.log(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="px-4 py-8">
      <Container>
        <div className="grid grid-cols-3 gap-6">
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
