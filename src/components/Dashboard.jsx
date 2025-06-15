import React, { useState } from "react";
import NFT1 from "../assets/NFTs/NFT1.png";
import NFT2 from "../assets/NFTs/NFT2.png";
import NFT3 from "../assets/NFTs/NFT3.png";
import Profile from "../assets/icons/profile.svg";
import SidePanel from "./SidePanel";
import NftCard from "./NftCard";
import NftRowData from "./CategoriesData";
import Loved from "../assets/icons/loved.svg";
import Heart from "../assets/icons/heart.svg";

const CreatorFlex = ({ ...props }) => {
  return (
    <div className="mr-4 flex items-center justify-between">
      <div className="flex gap-1 items-center w-full">
        <img src={Profile} alt="" className="w-10 h-10" />
        <div className="grid gap-0">
          <span className="font-medium text-gray-900">{props.username}</span>
          <span className="text-gray-700">{props.posts} posts</span>
        </div>
      </div>
    </div>
  );
};

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

const Dashboard = () => {
  const [filter, setFilter] = useState("Art");

  return (
    <div className="flex">
      <div className="h-screen overflow-y-scroll space-y-10 w-9/12 px-3 mt-4 pb-5 bg-white rounded-md">
        
        <section className="p-3">
          <div className="w-full text-sm flex justify-between">
            <span className="font-bold text-gray-900">Top Posts For Sale</span>
            <span className="text-blue-500 mr-2 cursor-pointer">See more</span>
          </div>
          <div className="w-full flex gap-3 mt-3">
            <FilterValue value="Art" setFilter={setFilter} filter={filter} />
            <FilterValue value="Music" setFilter={setFilter} filter={filter} />
            <FilterValue value="Sport" setFilter={setFilter} filter={filter} />
            <FilterValue value="Photography" setFilter={setFilter} filter={filter} />
            <FilterValue value="Photos" setFilter={setFilter} filter={filter} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
            <NftCard
              nftImg={NFT1}
              category="Web3"
              nftName="ZoroChain SDK Practice"
              amount="12.5"
              username="@yur3i"
              loved={Loved}
              notLoved={Heart}
            />
            <NftCard
              nftImg={NFT2}
              category="Art"
              nftName="Time is money"
              amount="11.0"
              username="@undefined"
              loved={Loved}
              notLoved={Heart}
            />
            <NftCard
              nftImg={NFT3}
              category="Entertainment"
              nftName="Love is in the air"
              amount="10.2"
              username="@stark"
              notLoved={Heart}
              loved={Loved}
            />
          </div>
        </section>

        <section className="p-3">
          <div className="w-full text-sm flex justify-between">
            <span className="font-bold text-gray-900">Top Creators</span>
            <span className="text-blue-500 mr-2 cursor-pointer">See more</span>
          </div>
          <div className="py-2 px-2 mt-3 flex w-full bg-white rounded-lg shadow">
            <div className="flex w-full flex-wrap justify-between my-2 items-center gap-2">
              <CreatorFlex username="@annetteblack" posts="230,000" />
              <CreatorFlex username="@grandbrand" posts="205,000" />
              <CreatorFlex username="@yrestra" posts="300,000" />
              <CreatorFlex username="@natorcolors" posts="150,000" />
            </div>
          </div>
        </section>
        
        <section className="px-3 pt-3 pb-5">
          <div className="w-full text-sm flex justify-between">
            <span className="font-bold text-gray-900">Top Categories</span>
            <span className="text-blue-500 mr-2 cursor-pointer">See more</span>
          </div>
          <div className="py-2 px-2 mt-3 flex w-full bg-white rounded-lg shadow overflow-auto h-48">
            <table className="w-full">
              <thead className="text-gray-900">
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Volume</th>
                  <th className="px-4 py-2 text-left">24h</th>
                  <th className="px-4 py-2 text-left">Creators</th>
                </tr>
              </thead>
              <tbody>
                <tr className="">
                  <td className="px-4">
                    <span>Web3</span>
                  </td>
                  <td className="px-4">
                    <span>10</span>
                  </td>
                  <td className="px-4 text-red-500">
                    <span>-0.20%</span>
                  </td>
                  <td className="px-4">
                    <span>5</span>
                  </td>
                </tr>
                <tr className="">
                  <td className="px-4">
                    <span>Sports</span>
                  </td>
                  <td className="px-4">
                    <span>6</span>
                  </td>
                  <td className="px-4 text-green-500">
                    <span>+2.20%</span>
                  </td>
                  <td className="px-4">
                    <span>3</span>
                  </td>
                </tr>
                <tr className="">
                  <td className="px-4">
                    <span>Art</span>
                  </td>
                  <td className="px-4">
                    <span>12</span>
                  </td>
                  <td className="px-4 text-green-500">
                    <span>+10.20%</span>
                  </td>
                  <td className="px-4">
                    <span>6</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <SidePanel />
    </div>
  );
};

export default Dashboard;
