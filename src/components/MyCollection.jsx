import React, { useContext, useState } from "react";
import NftCard from "./NftCard";
import { PlusIcon } from "lucide-react";
import { PostsContext } from "../context/PostsContext";
import { useNavigate } from "react-router-dom";

const FilterValue = ({ value, setFilter, filter }) => {
  return (
    <div
      className={`w-1/6 flex justify-center py-1 rounded-lg cursor-pointer ${
        filter === value ? "bg-[#9e74eb] text-white" : "bg-gray-200 hover:bg-[#9e74eb] text-gray-900 hover:text-white"
      }`}
      onClick={() => setFilter(value)}
    >
      <span>{value}</span>
    </div>
  );
};

const MyCollection = ({ classType }) => {
  const { forYouPosts } = useContext(PostsContext);
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="h-screen overflow-y-scroll space-y-10 w-full px-3 mt-4 pb-5 bg-white rounded-md">
        
        <section className="p-3">
          {classType === "forYou" && (
            <div className="w-full text-sm flex justify-between">
              <span className="font-bold text-gray-900">Posts For You</span>
            </div>
          )}

            <div onClick={() => navigate("/publish_post")} className="w-full flex justify-end">
              <button className="w-fit flex items-center gap-2 cursor-pointer text-center bg-[#9e74eb] hover:opacity-90 text-white px-6 py-3 rounded-xl transition duration-300 shadow-md">
              <span className="text-sm">Publish</span>
              <PlusIcon className="w-5 h-5" />
              </button>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
          {forYouPosts.length > 0 && forYouPosts.filter((post) => post.username === "@undefined").map((post) => (
            <NftCard
              key={post.id}
              {...post}
              classType={"collection"}
            />
          ))}
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default MyCollection;
