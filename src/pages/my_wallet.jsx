import React from 'react'
import SideBar from '../components/SideBar'
import TopHeader from '../components/TopHeader'
import { Copy, Wallet, Network, Coins } from "lucide-react";
import { useAccount, useBalance, useChains, useDisconnect } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'

const MyWallet = () => {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { chainId } = useAccount()
  const chains = useChains();
  const currentChain = chains.find(c => c.id === chainId);
  const { data: balance } = useBalance({
    address: address,
  })
  const { disconnect } = useDisconnect()

  const tokens = [
    { name: "USDC", balance: "135.00", symbol: "USDC", icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png" },
    { name: "DAI", balance: "78.25", symbol: "DAI", icon: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png" },
    { name: "LINK", balance: "20.19", symbol: "LINK", icon: "https://cryptologos.cc/logos/chainlink-link-logo.png" },
  ]

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
  }

  const formatAddress = (addr) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

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
                  {!isConnected ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6">Connect Your Wallet</h2>
                      <button
                        onClick={() => open()}
                        className="bg-[#9e74eb] text-white px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-200 flex items-center gap-2"
                      >
                        <Wallet className="w-5 h-5" />
                        Connect Wallet
                      </button>
                    </div>
                  ) : (
                    <div id="wallet-card" className="max-w-4xl mx-auto space-y-6">
                      {/* Wallet Card */}
                      <div className="bg-white shadow-xl rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-600 mb-1 flex items-center gap-2">
                            <Wallet className="w-5 h-5 text-blue-500" /> Connected Wallet
                          </h2>
                          <div className="text-xl font-mono font-bold text-gray-800">{formatAddress(address)}</div>
                          <button onClick={handleCopy} className="text-sm mt-1 cursor-pointer text-blue-500 hover:underline">Copy</button>
                        </div>

                        <div className="mt-4 md:mt-0 flex flex-col items-end">
                          <h2 className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                            <Network className="w-4 h-4 text-indigo-500" /> Network
                          </h2>
                          <div className="text-md font-medium">{currentChain?.name || 'Unknown'}</div>
                          <button 
                            onClick={() => disconnect()}
                            className="text-sm text-red-500 hover:underline mt-2"
                          >
                            Disconnect
                          </button>
                        </div>
                      </div>

                      {/* Native Token Balance */}
                      <div className="bg-[#9e74eb] p-6 rounded-3xl shadow flex justify-between items-center">
                        <div>
                          <h3 className="text-md font-medium text-black">Your {currentChain?.nativeCurrency.symbol} Balance</h3>
                          <div className="text-3xl font-bold text-white mt-1">
                            {balance?.formatted?.slice(0, 7)} {currentChain?.nativeCurrency.symbol}
                          </div>
                        </div>
                        <Coins className="w-12 h-12 text-white" />
                      </div>

                      {/* Token Balances */}
                      <div className="bg-white rounded-3xl p-6 shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Other Token Balances</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {tokens.map((token, i) => (
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyWallet