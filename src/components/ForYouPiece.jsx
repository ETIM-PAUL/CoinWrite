import React, { useState } from "react";
import NFT1 from "../assets/NFTs/NFT1.png";
import NFT2 from "../assets/NFTs/NFT2.png";
import NFT3 from "../assets/NFTs/NFT3.png";
import NftCard from "./NftCard";
import Loved from "../assets/icons/loved.svg";
import Heart from "../assets/icons/heart.svg";
import { PlusIcon } from "lucide-react";

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

const ForYouPiece = ({ classType }) => {
  const [filter, setFilter] = useState("Art");

  return (
    <div className="flex">
      <div className="h-screen overflow-y-scroll space-y-10 w-full px-3 mt-4 pb-5 bg-white rounded-md">
        
        <section className="p-3">
          {classType === "forYou" && (
            <div className="w-full text-sm flex justify-between">
              <span className="font-bold text-gray-900">Posts For You</span>
            </div>
          )}
          {classType !== "collection" && (
          <div className="w-full flex gap-3 mt-3">
            <FilterValue value="Art" setFilter={setFilter} filter={filter} />
            <FilterValue value="Music" setFilter={setFilter} filter={filter} />
            <FilterValue value="Sport" setFilter={setFilter} filter={filter} />
            <FilterValue value="Photography" setFilter={setFilter} filter={filter} />
            <FilterValue value="Photos" setFilter={setFilter} filter={filter} />
          </div>
          )}
          {classType === "collection" && (
            <div className="w-full flex justify-end">
              <button className="w-fit flex items-center gap-2 cursor-pointer text-center bg-[#9e74eb] hover:opacity-90 text-white px-6 py-3 rounded-xl transition duration-300 shadow-md">
              <span className="text-sm">Publish</span>
              <PlusIcon className="w-5 h-5" />
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
            <NftCard
              nftImg={NFT1}
              category="Web3"
              nftName="ZoroChain SDK Practice"
              amount="12.5"
              username="@yur3i"
              loved={Loved}
              notLoved={Heart}
              type="forYou"
              classType={classType}
            />
            <NftCard
              nftImg={NFT1}
              category="Web3"
              nftName="ZoroChain SDK Practice"
              amount="12.5"
              username="@yur3i"
              loved={Loved}
              notLoved={Heart}
              type="forYou"
              classType={classType}
            />
            <NftCard
              nftImg={NFT1}
              category="Web3"
              nftName="ZoroChain SDK Practice"
              amount="12.5"
              username="@yur3i"
              loved={Loved}
              notLoved={Heart}
              type="forYou"
              classType={classType}
            />
            <NftCard
              nftImg={NFT2}
              category="Art"
              nftName="Time is money"
              amount="11.0"
              username="@undefined"
              loved={Loved}
              notLoved={Heart}
              type="forYou"
              classType={classType}
            />
            <NftCard
              nftImg={NFT2}
              category="Art"
              nftName="Time is money"
              amount="11.0"
              username="@undefined"
              loved={Loved}
              notLoved={Heart}
              type="forYou"
              classType={classType}
            />
            <NftCard
              nftImg={NFT2}
              category="Art"
              nftName="Time is money"
              amount="11.0"
              username="@undefined"
              loved={Loved}
              notLoved={Heart}
              type="forYou"
              classType={classType}
            />
            <NftCard
              nftImg={NFT3}
              category="Entertainment"
              nftName="Love is in the air"
              amount="10.2"
              username="@stark"
              notLoved={Heart}
              loved={Loved}
              type="forYou"
              classType={classType}
            />
            <NftCard
              nftImg={NFT3}
              category="Entertainment"
              nftName="Love is in the air"
              amount="10.2"
              username="@stark"
              notLoved={Heart}
              loved={Loved}
              type="forYou"
              classType={classType}
            />
            <NftCard
              nftImg={NFT3}
              category="Entertainment"
              nftName="Love is in the air"
              amount="10.2"
              username="@stark"
              notLoved={Heart}
              loved={Loved}
              type="forYou"
              classType={classType}
            />
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default ForYouPiece;
