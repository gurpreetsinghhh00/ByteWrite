import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import storageService from "../appwrite/storageService";
import databaseService from "../appwrite/databaseService";
import Input from "./Input";
import RTE from "./RTE";
import Button from "./Button";
import Select from "../Components/Select";

const PostForm = ({ post }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  // console.log(errors);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await storageService.uploadFile(data.image[0])
        : null;

      if (file) {
        storageService.deleteFile(post.featuredImage);
      }

      const dbPost = await databaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const file = await storageService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await databaseService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d]+/g, "-");

      return "";
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setValue, slugTransform]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex gap-2 sm:px-2 py-2 flex-wrap"
    >
      <div className="w-full lg:w-[65%] px-2 space-y-5">
        <Input
          label="Title: "
          placeholder="Title"
          {...register("title", {
            required: { value: true, message: "Please provide a title" },
          })}
        />
        {"title" in errors && (
          <p className="px-2 text-sm text-red-500">{errors.title.message}</p>
        )}
        <Input
          label="Slug: "
          placeholder="Slug"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-full lg:w-[34%] px-2 space-y-5">
        <Input
          label="Featured Image: "
          type="file"
          accept="image/png image/jpg image/jpeg image/gif"
          className="py-[6px]"
          {...register("image", {
            required: { value: !post, message: "Image is required" },
          })}
        />
        {"image" in errors && (
          <p className="px-2 text-sm text-red-500">{errors.image.message}</p>
        )}
        {post && (
          <div>
            <img
              className="rounded-lg"
              src={storageService.getFilePreview(post.featuredImage)}
              alt={post.title}
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status: "
          {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined}>
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
