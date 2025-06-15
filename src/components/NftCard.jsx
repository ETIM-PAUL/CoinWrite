import React, { useState } from "react";
import Profile from "../assets/icons/profile.svg";
import darkMarket from "../assets/icons/darkMarket.svg";
import fire from "../assets/icons/fire.svg";

const NftCard = ({ ...props }) => {

  const [loved, setLoved] = useState(true);
  return (
    <div className="py-2 px-2 bg-white rounded-lg shadow relative">
      <img src={props.nftImg} alt="" className="w-full h-auto" />
      <img
        src={loved ? props.loved : props.notLoved}
        alt=""
        className="rounded-full cursor-pointer p-2 absolute top-5 right-7 bg-gray-800 bg-opacity-50"
        style={{ width: "30px", height: "30px" }}
        onClick={() => setLoved(!loved)}
      />
      <button
        className="w-1/2 bg-gray-800 bg-opacity-50 text-white p-2 mt-3 absolute top-40 left-5 flex justify-center gap-2 items-center rounded-lg"
      >
        <img src={fire} alt="" />
        <span className="font-semibold">{props.category}</span>
      </button>
      <div className="flex justify-between my-2 items-center">
        <div className="flex gap-1 items-center">
          <img src={Profile} alt="" className="w-10 h-10" />
          <span className="text-gray-900">{props.username}</span>
        </div>
        <span className="font-semibold text-gray-900">{props.amount} ETH</span>
      </div>
      <div className="flex justify-between">
        <span className="font-semibold text-gray-900">{props.nftName.length > 20 ? props.nftName.slice(0, 20) + "..." : props.nftName}</span>
      </div>
      <button
        className="w-full bg-[#9e74eb] cursor-pointer hover:opacity-90 text-white p-2 mt-3 flex justify-center gap-2 items-center rounded-lg"
      >
        <img src={darkMarket} alt="" />
        <span className="font-semibold">Purchase</span>
      </button>
    </div>
  );
};

export default NftCard;
