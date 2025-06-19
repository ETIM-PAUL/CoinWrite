import React, { useContext, useState } from 'react'
import { ArrowLeftIcon, Calendar, PlusIcon, User } from "lucide-react";
import { PostsContext } from '../context/PostsContext';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { TiPi } from 'react-icons/ti';
import { GiMoneyStack } from 'react-icons/gi';
import NFT1 from "../assets/NFTs/NFT1.png";
import TipModal from './TipModal';
import darkMarket from "../assets/icons/darkMarket.svg";
import PurchaseModal from './PurchaseModal';

const BlogPostDetails = () => {
  const { forYouPosts } = useContext(PostsContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const post = forYouPosts.find((post) => post.id === Number(id));


  if (!post?.id) {
    return <div className='text-center mt-4 text-2xl h-screen flex items-center justify-center'>Post not found</div>;
  }


  return (
    <div className="bg-white px-5 min-h-screen text-gray-800">

      {/* Back Button */}
      <div className="flex items-center gap-2 pt-4">
        <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700 flex items-center gap-2 cursor-pointer">
          <ArrowLeftIcon className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Banner */}
      <div className="relative mt-4">
        <img
          src={post?.nftImg}
          alt="Banner"
          className="w-full h-[60vh] object-cover rounded-3xl shadow-lg"
        />
        <div className="absolute rounded-b-3xl flex items-center justify-center top-0 bottom-0 left-0 right-0">
          <h1 className="text-5xl md:text-6xl text-white font-extrabold text-center drop-shadow-xl">
            {post?.nftName}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center w-full gap-4 text-gray-500 text-sm mb-8">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post?.username}</span>
          </div>
          <div className="flex w-full items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{post?.date}</span>
          </div>

          <div className="flex items-center w-full">
            {post?.forSale && (
              <div className="w-full flex justify-end">
                <button
                  onClick={() => setIsPurchaseModalOpen(true)}
                className="w-fit flex items-center gap-2 cursor-pointer text-center bg-[#9e74eb] hover:opacity-90 text-white px-6 py-3 rounded-xl transition duration-300 shadow-md"
              >
                <span className="text-sm">Purchase Content</span>
                <img src={darkMarket} alt="" className="w-5 h-5" />
              </button>
            </div>
            )}
            <div className="w-full flex justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-fit flex items-center gap-2 cursor-pointer text-center bg-[#9e74eb] hover:opacity-90 text-white px-6 py-3 rounded-xl transition duration-300 shadow-md"
              >
                <span className="text-sm">Tip Content</span>
                <GiMoneyStack className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>

        <div>
          {post?.content}
        </div>
      </div>

      {/* Tip Modal */}
      <TipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        amount={post?.amount}
        onClose={() => setIsPurchaseModalOpen(false)}
      />
    </div>
  )
}

export default BlogPostDetails