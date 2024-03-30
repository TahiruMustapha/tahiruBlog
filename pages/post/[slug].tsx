import Footer from "../../components/Footer";
import Header from "../../components/Header";
import React, { use, useState } from "react";
import { client, urlFor } from "../../lib/sanity";
import type { Post } from "../../typings";
import { GetStaticProps } from "next";
import { PortableText } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";

interface Props {
  post: Post;
}
type Inputs = {
  _id: string;
  name: string;
  email: string;
  comment: string;
};
const Post = ({ post }: Props) => {
  const { data: session } = useSession();
  const [submitted, setSubmitted] = useState(false);
  const [userError, setUserError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        setSubmitted(false);
      });
  };
  const SampleImageComponent = ({ value, isInline }: any) => {
    const { width, height } = getImageDimensions(value);

    return (
      <img
        src={urlBuilder(client)
          .image(value)
          .width(isInline ? 100 : 800)
          .fit("max")
          .auto("format")
          .url()}
        alt={value.alt || " mainImage"}
        loading="lazy"
        style={{
          // Display alongside text if image appears inside a block text span
          display: isInline ? "inline-block" : "block",

          // Avoid jumping around with aspect-ratio CSS property
          aspectRatio: width / height,
        }}
      />
    );
  };

  const components = {
    types: {
      image: SampleImageComponent,
      // Any other custom types you have in your content
      // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
    },
    block: {
      // Ex. 1: customizing common block types
      h2: ({ children }: any) => (
        <h2 className="text-2xl m-2 font-bold text-[#3442ae] pb-4 text-center">
          {children}
        </h2>
      ),
      h4: ({ children }: any) => (
        <h4 className="text-2xl font-bold text-[#3442ae]  text-center">
          {children}
        </h4>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-[#3442ae] text-base text-gray-500 border-l-[4px] tracking-wide m-4 p-3">
          {children}
        </blockquote>
      ),
    },

    listItem: {
      // Ex. 1: customizing common list types
      bullet: ({ children }: any) => (
        <li
          className=" m-3 tracking-wide"
          style={{ listStyleType: "disclosure-closed" }}
        >
          {children}
        </li>
      ),

      // Ex. 2: rendering custom list items
      checkmarks: ({ children }: any) => <li>✅ {children}</li>,
    },
  };
  const handleUserErr = () => {
    if (!session) {
      setUserError("Please signin to comment");
    }
  };
  return (
    <div>
      <Header />
      {/* MainImage */}

      <img
        className=" w-full h-96 object-cover"
        src={urlFor(post?.mainImage).url()!}
        alt="mainImage"
      />
      {/* MainImage */}
      {/* Articles */}
      <div className=" max-w-3xl mx-auto mb-10">
        <article className="w-full mx-auto bg-secondaryColor/20 p-5">
          <h1 className=" font-medium text-[32px] text-primaryColor border-b-[1px] border-b-cyan-800 mt-10 mb-3">
            {post?.title}
          </h1>
          <h2 className=" text-[18px] mb-2 text-gray-500">
            {post?.description}
          </h2>
          <div className=" w-full flex items-center gap-2">
            <img
              src={urlFor(post?.author.image).url()}
              alt="author"
              className=" w-12 h-12 object-cover rounded-full flex items-center"
            />
            <p className=" text-base">
              Blog post by ...{" "}
              <span className=" font-bold text-secondaryColor">
                {post?.author?.name}
              </span>{" "}
              - Published at {new Date(post?.publishedAt).toLocaleDateString()}
            </p>
          </div>
          <div className=" mt-10">
            <PortableText components={components} value={post.body} />
          </div>
        </article>
        <hr className=" max-w-lg my-5 mx-auto border-[1px] border-secondaryColor" />
        {submitted ? (
          <div className=" flex flex-col items-center gap-2 p-10 my-10 bg-bgColor text-white mx-auto">
            <h1 className=" text-2xl font-bold">
              Thank you for your comments!
            </h1>
            <p>Once it has been approved, it will appear below!</p>
          </div>
        ) : (
          <div>
            <p className=" text-xs uppercase font-bold text-secondaryColor">
              Enjoyed this article?
            </p>
            <h3 className=" text-3xl font-bold">Leave a Comment below </h3>
            <hr className=" py-3 mt-2" />
            {/* Form start */}
            <input
              {...register("_id")}
              type="hidden"
              name="_id"
              value={post._id}
            />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" mt-7 flex flex-col gap-6"
            >
              <label htmlFor="name" className=" flex flex-col">
                <span className=" font-semibold text-base">Name</span>
                <input
                  {...register("name", { required: true })}
                  id="name"
                  type="text"
                  className=" text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl shadow-secondaryColor"
                  placeholder="Enter Your Name"
                />
                {/* error name */}
                {errors.name && (
                  <p className=" text-sm font-semibold text-red-500 px-4 my-1">
                    <span className=" text-base font-bold italic mr-2">!</span>
                    Name is required!{" "}
                  </p>
                )}
              </label>
              <label htmlFor="email" className=" flex flex-col">
                <span className=" font-semibold text-base">Email</span>
                <input
                  {...register("email", { required: true })}
                  id="email"
                  type="email"
                  className=" text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl shadow-secondaryColor"
                  placeholder="Enter Your Email"
                />
                 {/* error email */}
                 {errors.email && (
                  <p className=" text-sm font-semibold text-red-500 px-4 my-1">
                    <span className=" text-base font-bold italic mr-2">!</span>
                    Email is required!{" "}
                  </p>
                )}
              </label>
              <label htmlFor="email" className=" flex flex-col">
                <span className=" font-semibold text-base">Comments</span>
                <textarea
                  {...register("comment", { required: true })}
                  id="message"
                  className=" text-base placeholder:text-sm border-b-[1px] border-secondaryColor py-1 px-4 outline-none focus-within:shadow-xl shadow-secondaryColor"
                  placeholder="Enter Your Comments"
                  rows={6}
                />
                 {/* error comment */}
                 {errors.comment && (
                  <p className=" text-sm font-semibold text-red-500 px-4 my-1">
                    <span className=" text-base font-bold italic mr-2">!</span>
                    Comment is required!{" "}
                  </p>
                )}
              </label>

              {session && (
                <button
                  type="submit"
                  className=" w-full  bg-secondaryColor text-white text-base font-semibold tracking-wider py-2 uppercase rounded-sm duration-300 hover:bg-bgColor"
                >
                  Submit
                </button>
              )}
            </form>
            {!session && (
              <button
                onClick={handleUserErr}
                type="submit"
                className=" w-full bg-secondaryColor text-white text-base font-semibold tracking-wider py-2 uppercase rounded-sm duration-300 hover:bg-bgColor"
              >
                Submit
              </button>
            )}
            {userError && (
              <p className="text-sm text-center font-semibold mt-2 text-red-500 underline underline-offset-2 mx-1 px-4 animate-bounce">
                <span className=" text-base font-bold italic mr-2">!</span>
                {userError}
              </p>
            )}
            {/* Form start */}
            {/* Comments */}
            <div className=" w-full flex flex-col p-10 my-10 mx-auto shadow-bgColor shadow-lg space-y-2">
              <h3 className=" text-3xl font-semibold">Comments</h3>
              <hr />
              {post.comments.map((comment) => (
                <div key={comment._id}>
                  <p>
                    {" "}
                    <span className=" text-secondaryColor">
                      {comment.name}
                    </span>{" "}
                    {comment.comment}
                  </p>
                </div>
              ))}
            </div>
            {/* Comments */}
          </div>
        )}
      </div>

      {/* Articles */}
      <Footer />
    </div>
  );
};

export default Post;

export async function getStaticPaths() {
  const query = `*[_type == "post"]{
    _id,
    slug{
      current
    } 
  }`;
  const posts = await client.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
   _id,
   publishedAt,
   title,
   author ->{
    name,
    image,
   },
   "comments":*[_type == "comment" && post._ref == ^ ._id && approved == true],
   description,
   mainImage,
   slug,
   body

  }`;
  const post = await client.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
