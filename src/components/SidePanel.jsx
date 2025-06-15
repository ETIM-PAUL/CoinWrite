import React from "react";
import Profile from "../assets/icons/profile.svg";
import darkMarket from "../assets/icons/darkMarket.svg";
import NFT4 from "../assets/NFTs/NFT4.png";
import NFT5 from "../assets/NFTs/NFT5.png";
import NFT6 from "../assets/NFTs/NFT6.png";
import { MdAlarm } from "react-icons/md";

const SidePanel = () => {

  const arraysUsers = [
    { username: "@crayionbin", items: 8.25 },
    { username: "@artcrafted", items: 3.2 },
    { username: "@3dmodel", items: 20.5 },
    { username: "@jullyboi", items: 8.23 },
    { username: "@babsonclr", items: 8.25 },
    { username: "@fruganfur", items: 3.16 },
  ];
  return (
    <div className="w-3/12 h-screen bg-white rounded-md mt-4 shadow-lg p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Top Posts</h2>
          <span className="text-blue-500 text-sm cursor-pointer">See more</span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
          <img src={Profile} alt="" className="w-10 h-10" />
            <div>
              <p className="text-sm text-gray-900">Blue Train</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img src={Profile} alt="" className="w-10 h-10" />
            <div>
              <p className="text-sm text-gray-900">Nature Boy</p>
              <p className="text-xs text-gray-500">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img src={Profile} alt="" className="w-10 h-10" />
            <div>
              <p className="text-sm text-gray-900">Coffee Cold</p>
              <p className="text-xs text-gray-500">20 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img src={Profile} alt="" className="w-10 h-10" />
            <div>
              <p className="text-sm text-gray-900">Autumn Leaves</p>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
