import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import TopHeader from '../components/TopHeader'
import { Copy, Wallet, Network, Coins } from "lucide-react";
import { useAccount, useBalance, useChains, useDisconnect } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { PostsContext } from '../context/PostsContext';
import { ethers } from 'ethers';
import { getProfileBalances } from '@zoralabs/coins-sdk';
import { formatEther } from 'ethers/lib/utils';
import TransferModal from '../components/TransferModal';
import ProvideLiquidityModal from '../components/ProvideLiquidityModal';

const MyWallet = () => {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const [coinBalances, setCoinBalances] = useState([]);
  const { chainId } = useAccount()
  const chains = useChains();
  const currentChain = chains.find(c => c.id === chainId);
  const { data: balance } = useBalance({
    address: address,
  })
  const { coinDetails } = useContext(PostsContext);
  const { disconnect } = useDisconnect()
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coinBalance, setCoinBalance] = useState(null);
  const [zoraBalance, setZoraBalance] = useState(null);
  const [isProvideLiquidityModalOpen, setIsProvideLiquidityModalOpen] = useState(false);

  const getUserBalance = async (erc20contract) => {
    // Initialize provider and contract
    const result = await getProfileBalances(
      {
        identifier: address, // Can also be zora user profile handle
        count: 50,        // Optional: number of balances per page
        after: undefined, // Optional: for pagination
      }
    )
    setCoinBalances(result?.data?.profile?.coinBalances?.edges);

    return result;
  };

  const getUserZoraBalance = async () => {
    //use etehrs and the provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const zoraContract = new ethers.Contract(
      '0x1111111111166b7fe7bd91427724b487980afc69',
      [
        'function balanceOf(address account) view returns (uint256)',
      ],
      signer
    );
    const zoraBalance = await zoraContract.balanceOf(address);
    const balanceInEth = ethers.utils.formatUnits(zoraBalance, 18);
    const formattedBalance = Number(balanceInEth).toFixed(4);
    console.log(formattedBalance);
    setZoraBalance(formattedBalance);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
  }

  const formatAddress = (addr) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

  const handleTransferClick = (coin, balance) => {
    setSelectedCoin(coin);
    setCoinBalance(balance);
    setIsTransferModalOpen(true);
  };

  const handleInvestClick = (coin, balance) => {
    setSelectedCoin(coin);
    setCoinBalance(balance);
    setIsProvideLiquidityModalOpen(true);
  };

  useEffect(() => {
    getUserBalance();
    getUserZoraBalance();
  }, [address]);

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
                          {coinBalances?.length > 0 && coinBalances.map((token, i) => (
                            <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                              <div className="flex items-center gap-2">
                              <img src={token?.node?.coin?.mediaContent?.previewImage?.medium} alt={token.symbol} className="w-10 h-10 rounded-full mr-4" />
                              
                              <div>
                                <div className="flex items-center gap-1">
                                  <div className="text-lg font-semibold">{Number(formatEther(token?.node?.balance)).toFixed(2)}</div>
                                  <div className="text-sm text-gray-600">{token.node?.coin?.symbol}</div>
                                </div>
                                <div className="text-sm text-gray-600">{token.node?.coin?.name}</div>
                              </div>
                              </div>

                              <div>
                                <div className="flex items-center gap-1">
                                  <button className="text-xs font-semibold bg-[#9e74eb] text-white px-2 py-1 rounded-md" onClick={() => handleTransferClick(token.node?.coin, token.node?.balance)}>Transfer</button>
                                  <button
                                    className="text-xs font-semibold bg-red-500 text-white px-2 py-1 rounded-md"
                                    onClick={() => handleInvestClick(token.node?.coin, token.node?.balance)}
                                  >
                                    Invest
                                  </button>
                                </div>
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

      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
        userCoinBalance={coinBalance}
        coinDetails={selectedCoin}
        getUserBalance={getUserBalance}
      />

      <ProvideLiquidityModal
        isOpen={isProvideLiquidityModalOpen}
        onClose={() => setIsProvideLiquidityModalOpen(false)}
        userCoinBalance={coinBalance}
        userZoraBalance={zoraBalance}
        coinDetails={selectedCoin}
        getUserBalance={getUserBalance}
        getUserZoraBalance={getUserZoraBalance}
      />
    </div>
  )
}

export default MyWallet