import React, { useState } from "react";
import { parseEther } from "ethers";
import { usePublicClient } from "wagmi";
// import { simulateBuy } from "@zoralabs/coins-sdk";

export default function EthModal({ ethBalance, onBuy, onSell, onClose, loading, setLoading, coinDetails }) {
  const [tab, setTab] = useState("BUY");
  const [amount, setAmount] = useState("");
  const [amountOut, setAmountOut] = useState("");
  const publicClient = usePublicClient();

  const handleChange = (e) => {
    setAmount(e.target.value);
    if (tab === "BUY") {
      setAmountOut(parseFloat(e.target.value) * parseFloat(coinDetails.price));
      simulateCoinBuy(e.target.value);
    } else {
      setAmountOut(parseFloat(e.target.value) / parseFloat(coinDetails.price));
    }
  };

  async function simulateCoinBuy(amount) {
    const simulation = await simulateBuy({
      target: coinDetails?.coin,
      requestedOrderSize: parseEther(amount.toString()),
      publicClient,
    });
    
    console.log("Order size", simulation.orderSize);
    console.log("Amount out", simulation.amountOut);
    
    return simulation;
  }

  const isDisabled = parseFloat(amount) > parseFloat(ethBalance);

  const handleSubmit = () => {
    if (tab === "BUY") {
      onBuy(amount);
    } else {
      onSell(amount);
    }
    setAmount("");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <div className="flex justify-between mb-4">
          <button
            className={`flex-1 py-2 font-semibold ${
              tab === "BUY" ? "bg-[#9e74eb] text-white" : "bg-gray-100"
            }`}
            onClick={() => setTab("BUY")}
          >
            BUY
          </button>
          <button
            className={`flex-1 py-2 font-semibold ${
              tab === "SELL" ? "bg-red-500 text-white" : "bg-gray-100"
            }`}
            onClick={() => setTab("SELL")}
          >
            SELL
          </button>
        </div>

        <div className="mb-4">
          {tab === "BUY" && (
          <label className="block text-sm mb-1 font-medium">Amount in ETH</label>
          )}
          {tab === "SELL" && (
            <label className="block text-sm mb-1 font-medium">Amount in {coinDetails.symbol}</label>
          )}
          <input
            type="number"
            value={amount}
            onChange={handleChange}
            placeholder="0.0"
            className="w-full border px-4 py-2 rounded-lg"
          />
          {tab === "BUY" && (
          <p className="text-sm mt-4 text-gray-500 mt-1">
            Your balance: {ethBalance} ETH
          </p>
          )}
          {tab === "SELL" && (
            <p className="text-sm mt-4 text-gray-500 mt-1">
              Your balance: {0} {coinDetails.symbol}
            </p>
          )}    
        </div>

        <div className="flex justify-between gap-4 mt-8">
            <button
            disabled={loading}
            onClick={onClose}
            className={`w-full cursor-pointer py-2 rounded-lg font-semibold text-black bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
            Close
            </button>
            <button
            disabled={isDisabled}
            onClick={handleSubmit}
            className={`w-full cursor-pointer py-2 rounded-lg font-semibold ${
                tab === "BUY"
                ? "bg-[#9e74eb] text-white"
                : "bg-red-500 text-white"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
            {tab === "BUY" ? "Purchase PHC" : "Sell PHC"}
            </button>

        </div>

      </div>
    </div>
  );
}
