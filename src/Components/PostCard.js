import React from "react";
import storageService from "../appwrite/storageService";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PostCard = ({ $id, title, featuredImage }) => {
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <Link to={authStatus ? `/post/${$id}` : "/login"}>
      <div className="bg-white rounded-lg p-4 space-y-5">
        <img
          className="h-64 w-full rounded-lg"
          src={storageService.getFilePreview(featuredImage)}
          alt={title}
        />
        <h2 className="font-bold text-xl h-[3.8rem] overflow-hidden text-ellipsis py-1 text-center">
          {title}
        </h2>
      </div>
    </Link>
  );
};

export default PostCard;
