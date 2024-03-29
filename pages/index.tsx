import Banner from "@/components/Banner";
import BannerBottom from "@/components/BannerBottom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { client, urlFor } from "../lib/sanity";
import type { Post } from "@/typings";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "slick-carousel/slick/slick.css";

export const revalidate = 10;

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  return (
    <main>
      <Header />
      <Banner />
      <div className="max-w-7xl mx-auto h-60 relative">
        <BannerBottom />
      </div>
      <div className="max-w-7xl px-4 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3 mx-auto py-6">
        {posts.map((post) => (
          <Link href={`/post/${post?.slug?.current}`} key={post?._id}>
            <div className="  border-[1px] border-secondaryColor border-opacity-40 h-[450px] group ">
              <div className=" h-3/5 w-full overflow-hidden">
                <Image
                  src={urlFor(post?.mainImage).url()!}
                  alt="Post mainImage"
                  width={380}
                  height={350}
                  className=" w-full h-full object-cover brightness-75 group-hover:brightness-100 duration-300 group-hover:scale-110"
                />
              </div>
              <div className="h-[30%] pt-10  w-full flex items-center justify-center flex-col">
                <div className=" w-full flex items-center gap-3 justify-between px-4 py-1 border-b-[1px] border-b-gray-500">
                  <p>{post.title}</p>
                  <img
                    src={urlFor(post.author.image).url()!}
                    alt="author image"
                    className=" w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <p className=" py-2 px-4 text-base">
                  {post.description.substring(0, 60)} ... by{" "}
                  <span className=" font-semibold text-[#3442ae]">
                    {post.author.name}
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </main>
  );
}

export async function getServerSideProps() {
  const query = `*[_type == "post"]{
        _id,
         title,
         author -> {
           name,
           image
         },
         description,
         mainImage,
         slug
       }`;
  const posts = await client.fetch(query);
  return {
    props: {
      posts,
    },
  };
}
