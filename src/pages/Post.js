import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/databaseService";
import storageService from "../appwrite/storageService";
import Container from "../Components/Container";
import Button from "../Components/Button";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

const Post = () => {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    databaseService.deletePost(post.$id).then((status) => {
      if (status) {
        storageService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="md:px-4 py-10  w-[100%] sm:w-[90%] md:w-3/4 m-auto">
      <Container>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <img
            className="w-full h-96 rounded-lg"
            src={storageService.getFilePreview(post.featuredImage)}
            alt={post.title}
          />
          <div className="mt-10 space-y-4">
            <h1 className="font-bold text-3xl text-center underline">
              {post.title}
            </h1>
            <div>{parse(post.content)}</div>
          </div>
        </div>
        {isAuthor && (
          <div className="flex justify-between p-2">
            <Button
              bgColor="bg-transparent"
              textColor="black"
              className="text-xl hover:text-green-500 underline font-bold hover:bg-transparent w-fit"
            >
              <Link to={`/edit-post/${post.$id}`}>Edit Post</Link>
            </Button>

            <Button
              bgColor="bg-transparent"
              textColor="black"
              className="text-xl hover:text-red-500 underline font-bold hover:bg-transparent w-fit"
              onClick={deletePost}
            >
              Delete Post
            </Button>
          </div>
        )}
      </Container>
    </div>
  ) : null;
};

export default Post;
