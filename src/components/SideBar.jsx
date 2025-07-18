import React from "react";
import LogoLight from "../assets/icons/logo.svg";
import Market from "../assets/icons/market.svg";
import Dashboard from "../assets/icons/dashboard.svg";
import Message from "../assets/icons/messages.svg";
import Setting from "../assets/icons/settings.svg";
import Wallet from "../assets/icons/wallet.svg";
import Col from "../assets/icons/collection.svg";
import MarketDark from "../assets/icons/marketDark.svg";
import DashboardDark from "../assets/icons/dashboardDark.svg";
import MessageDark from "../assets/icons/messagesDark.svg";
import SettingDark from "../assets/icons/settingsDark.svg";
import WalletDark from "../assets/icons/walletDark.svg";
import ColDark from "../assets/icons/collectionDark.svg";
import SideBarItem from "./SideBarItem";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";
import { useAccount } from "wagmi";

const SideBar = () => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();

  return (
    <div className="hidden lg:block px-2 mt-4">
      <div onClick={() => navigate('/')} className="flex p-3 gap-2 items-center cursor-pointer">
        <span className="font-bold text-white">
          <img src={LogoLight} alt="" className="w-8 h-8" />
        </span>
        <span className="font-bold text-black text-lg">Coinwrite</span>
      </div>

      <div className="mt-2 pt-5 px-3">
        <SideBarItem title="Dashboard" lightIcon={Dashboard} darkIcon={DashboardDark} link="/dashboard" />
        <SideBarItem title="For You" lightIcon={Market} darkIcon={MarketDark} link="/for-you" />
        {isConnected && (
          <SideBarItem title="My Collection" lightIcon={Col} darkIcon={ColDark} link="/collection" />
        )}
      </div>
      <div className="mt-5 pt-2 px-3">
        <span className="font-semibold text-gray-400">Profile</span>
        <SideBarItem title="My Wallet" lightIcon={Wallet} darkIcon={WalletDark} link="/my-wallet" />
        {/* <SideBarItem title="Settings" lightIcon={Setting} darkIcon={SettingDark} link="/settings" /> */}
      </div>

    </div>
  );
};

export default SideBar;
