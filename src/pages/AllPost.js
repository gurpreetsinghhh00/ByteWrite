import React, { useEffect, useState } from "react";
import databaseService from "../appwrite/databaseService";
import PostCard from "../Components/PostCard";
import Container from "../Components/Container";
import { Query } from "appwrite";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Shimmer from "../Components/Shimmer";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [isShimmer, setIsShimmer] = useState(true);

  const userData = useSelector((store) => store.auth.userData);
  useEffect(() => {
    const queries = [Query.equal("userId", userData.$id)];
    databaseService.getUserPosts(queries).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      setIsShimmer(false);
    });
  }, []);

  return isShimmer ? (
    <Shimmer />
  ) : (
    <div className="p-4">
      <Container>
        {posts.length === 0 ? (
          <h1 className="py-10 font-bold text-2xl text-center">
            <Link to="/add-post" className="hover:text-orange-500">
              Make your first post...
            </Link>
          </h1>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {posts.map((post) => {
              return <PostCard {...post} key={post.$id} />;
            })}
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllPost;
