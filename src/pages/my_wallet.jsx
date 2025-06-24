import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import TopHeader from '../components/TopHeader'
import { Copy, Wallet, Network, Coins } from "lucide-react";

const MyWallet = () => {
    const tokens = [
    { name: "USDC", balance: "135.00", symbol: "USDC", icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png" },
    { name: "DAI", balance: "78.25", symbol: "DAI", icon: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png" },
    { name: "LINK", balance: "20.19", symbol: "LINK", icon: "https://cryptologos.cc/logos/chainlink-link-logo.png" },
    ]   
    const handleCopy = () => {
      navigator.clipboard.writeText(address);
    }   
    const [address, setAddress] = useState("0xFAKE123...ABCD");
    const [network, setNetwork] = useState("Ethereum");
    const [nativeToken, setNativeToken] = useState("ETH");
    const [nativeBalance, setNativeBalance] = useState("2.4893");
    const [tokenBalances, setTokenBalances] = useState(tokens);

  return (
    <div>
      <div className="w-full bg-[#f6f2ff]">
        <div className="flex p-4">
          <SideBar />
          <div className="block w-full lg:w-10/12">
            <TopHeader />
            <div className="p-4">
              <div className="bg-white rounded-xl p-4">
                <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 p-8">
                <div className="max-w-4xl mx-auto space-y-6">

                    {/* Wallet Card */}
                    <div className="bg-white shadow-xl rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-600 mb-1 flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-blue-500" /> Connected Wallet
                        </h2>
                        <div className="text-xl font-mono font-bold text-gray-800">{address}</div>
                        <button onClick={handleCopy} className="text-sm mt-1 cursor-pointer text-blue-500 hover:underline">Copy</button>
                    </div>

                    <div className="mt-4 md:mt-0">
                        <h2 className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                        <Network className="w-4 h-4 text-indigo-500" /> Network
                        </h2>
                        <div className="text-md font-medium">{network}</div>
                    </div>
                    </div>

                    {/* Native Token Balance */}
                    <div className="bg-[#9e74eb] p-6 rounded-3xl shadow flex justify-between items-center">
                    <div>
                        <h3 className="text-md font-medium text-black">Your {nativeToken} Balance</h3>
                        <div className="text-3xl font-bold text-white mt-1">{nativeBalance} {nativeToken}</div>
                    </div>
                    <Coins className="w-12 h-12 text-white" />
                    </div>

                    {/* Token Balances */}
                    <div className="bg-white rounded-3xl p-6 shadow-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Other Token Balances</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {tokenBalances.map((token, i) => (
                        <div key={i} className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <img src={token.icon} alt={token.name} className="w-10 h-10 rounded-full mr-4" />
                            <div>
                            <div className="text-lg font-semibold">{token.balance} {token.symbol}</div>
                            <div className="text-sm text-gray-600">{token.name}</div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>

                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyWallet;