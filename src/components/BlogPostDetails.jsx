import React, { useContext, useState } from 'react'
import { ArrowLeftIcon, Calendar, PlusIcon, User } from "lucide-react";
import { PostsContext } from '../context/PostsContext';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { GiMoneyStack } from 'react-icons/gi';
import TipModal from './TipModal';
import darkMarket from "../assets/icons/darkMarket.svg";
import PromptModal from './PromptModal';
import { useAccount, useBalance } from 'wagmi';
import EthModal from './BuySellModal';

const BlogPostDetails = () => {
  const { address, isConnected } = useAccount();
  const { forYouPosts } = useContext(PostsContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isPutUpForSaleModalOpen, setIsPutUpForSaleModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [isRemoveFromSaleModalOpen, setIsRemoveFromSaleModalOpen] = useState(false);

  const post = forYouPosts.find((post) => post.id === Number(id));
  const { data: ethBalance } = useBalance({
    address: address,
  })

  const coinDetails = {
    caller: "0x1b6e16403b06a51C42Ba339E356a64fE67348e92",
    payoutRecipient: "0x1b6e16403b06a51C42Ba339E356a64fE67348e92",
    platformReferrer: "0x1b6e16403b06a51C42Ba339E356a64fE67348e92",
    currency: "0x0000000000000000000000000000000000000000",
    uri: "ipfs://QmQrmSrkhzzRtkqWRRbTwoMY5DM4PpwCQRa4DTByqoc6Ae",
    name: "Port Harcourt City",
    symbol: "PHC",
    coin: "0xabAc1Aad7123A3431529598f2624273454A73D3d",
    poolKey: {
      currency0: "0x0000000000000000000000000000000000000000",
      currency1: "0xabAc1Aad7123A3431529598f2624273454A73D3d",
      fee: 20000,
      tickSpacing: 200,
      hooks: "0xD7A343d20e4C8E9725416c5f1cfaAeD749d49040",
      poolKeyHash: "0xbaab19aab1c86c08cc574d8216d74459886c99aa99670a09061e8071000d228b",
      version: "1.0.0"
    }
    }


  if (!post?.id) {
    return <div className='text-center mt-4 text-2xl h-screen flex items-center justify-center'>Post not found</div>;
  }

  const handlePurchase = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsPurchaseModalOpen(false);
      toast.success('Purchase successful');
      onClose();
    }, 1000);
  };

  const handleRemoveFromSale = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Post updated successful');
      setIsRemoveFromSaleModalOpen(false);
    }, 1000);
  };

  const handlePutUpForSale = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Post updated successfully');
      setIsPutUpForSaleModalOpen(false);
    }, 1000);
  };

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
                <div className="w-full flex justify-end">
                  <button
                    onClick={() => setIsPurchaseModalOpen(true)}
                  className="w-fit flex items-center gap-2 cursor-pointer text-center bg-[#9e74eb] hover:opacity-90 text-white px-6 py-3 rounded-xl transition duration-300 shadow-md"
                >
                  <span className="text-sm">Purchase Coins</span>
                  <img src={darkMarket} alt="" className="w-5 h-5" />
                </button>
              </div>

              {post?.username !== "@undefined" && (
              <div className="flex items-center w-full">
                {/* {post?.forSale && (
                  <div className="w-full flex justify-end">
                    <button
                      onClick={() => setIsPurchaseModalOpen(true)}
                    className="w-fit flex items-center gap-2 cursor-pointer text-center bg-[#9e74eb] hover:opacity-90 text-white px-6 py-3 rounded-xl transition duration-300 shadow-md"
                  >
                    <span className="text-sm">Purchase Content</span>
                    <img src={darkMarket} alt="" className="w-5 h-5" />
                  </button>
                </div>
                )} */}
                <div className="w-full flex justify-end">
                  <button
                    onClick={() => isConnected ? setIsModalOpen(true) : toast.error('Please connect your wallet to tip content')}
                    className="w-fit flex items-center gap-2 cursor-pointer text-center bg-[#9e74eb] hover:opacity-90 text-white px-6 py-3 rounded-xl transition duration-300 shadow-md"
                  >
                    <span className="text-sm">Tip Creator</span>
                    <GiMoneyStack className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            </div>

          {/* {post?.username === "@undefined" && (
            <div className="flex items-center w-full">
              {post?.forSale ? (
                <div className="w-full flex justify-end">
                  <button
                    onClick={() => setIsRemoveFromSaleModalOpen(true)}
                  className="w-fit flex items-center gap-2 cursor-pointer text-center bg-[#9e74eb] hover:opacity-90 text-white px-6 py-3 rounded-xl transition duration-300 shadow-md"
                >
                  <span className="text-sm">Remove Post From Sale</span>
                  <img src={darkMarket} alt="" className="w-5 h-5" />
                </button>
              </div>
              ) : (
                <div className="w-full flex justify-end">
                  <button
                    onClick={() => setIsPutUpForSaleModalOpen(true)}
                  className="w-fit flex items-center gap-2 cursor-pointer text-center bg-[#9e74eb] hover:opacity-90 text-white px-6 py-3 rounded-xl transition duration-300 shadow-md"
                >
                  <span className="text-sm">Put Post Up For Sale</span>
                  <img src={darkMarket} alt="" className="w-5 h-5" />
                </button>
                </div>
              )}
            </div>
          )} */}
        </div>

        <div>
          {post?.content}
        </div>
      </div>

      {/* Tip Modal */}
      <TipModal
      coinDetails={coinDetails}
      address={address}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Prompt Modal */}
      <PromptModal
        isOpen={isPutUpForSaleModalOpen}
        heading="Put Post Up For Sale"
        description={`Put the blog post up for sale. If purchased, all new tips will be sent to new owner's wallet.`}
        handleAction={handlePutUpForSale}
        onClose={() => setIsPutUpForSaleModalOpen(false)}
        type="forSale"
        loading={loading}
        setLoading={setLoading}
        amount={amount}
        setAmount={setAmount}
      />

      {isPurchaseModalOpen && (
        <EthModal
          ethBalance={ethBalance?.formatted?.slice(0, 7)}
          onSell={handlePurchase}
          onBuy={handlePurchase}
          onClose={() => setIsPurchaseModalOpen(false)}
          loading={loading}
          setLoading={setLoading}
          coinDetails={coinDetails}
        />
      )}
      <PromptModal
        isOpen={isRemoveFromSaleModalOpen}
        heading="Remove Post From Sale"
        description={`Remove the blog post from sale. After removal, the post will no longer be available for purchase.`}
        handleAction={handleRemoveFromSale}
        onClose={() => setIsRemoveFromSaleModalOpen(false)}
        type="remove"
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  )
}

export default BlogPostDetails