import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ArrowRightIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { RocketLaunchIcon, PencilSquareIcon, HeartIcon, CurrencyDollarIcon, CloudArrowUpIcon, BoltIcon } from "@heroicons/react/24/solid";
import heroImage from "../assets/coinwrite-hero.png"; // Replace with actual hero image path
import laugh from "../assets/laugh_me.png"; // Replace with actual hero image path
import everything from "../assets/everything_goes.jpg"; // Replace with actual hero image path
import time from "../assets/time_now.png"; // Replace with actual hero image path
import three from "../assets/three_crazy_friends.png"; // Replace with actual hero image path
import HomePageHeader from "../components/HomePageHeader";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useNavigate } from "react-router-dom";
import RegisterModal from '../components/RegisterModal';
import { plans } from "../components/utils";

const categories = [
  "Tech", "Finance", "Art", "Culture", "Web3", "Gaming", "Education",
  "Science","Health", "Travel","Food", "Entertainment", "Music",
  "Movies", "Sports", "Politics", "Economy"
];

function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "3 Crazy Friends",
      content: "This is the content of the first blog post.",
      image: three,
      author: "John Doe",
    },
    {
      id: 2,
      title: "Everything Goes",
      content: "This is the content of the first blog post.",
      image: everything,
      author: "Entertainment Studio",
    },
    {
      id: 3,
      title: "Laugh With Me",
      content: "This is the content of the first blog post.",
      image: laugh,
      author: "John Doe",
    },
    {
      id: 4,
      title: "The Time is Now",
      content: "This is the content of the first blog post.",
      image: time,
      author: "Everyday Philosophy",
    },
    {
      id: 5,
      title: "Life is a Journey",
      content: "This is the content of the first blog post.",
      image: everything,
      author: "Entertainment Studio",
    },
  ]);
  const { open } = useWeb3Modal()
  const navigate = useNavigate()

  const { isConnected } = useAccount();

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const registerUser = (title) => {
    if(!isConnected) {
      toast.error("Please connect your wallet to register");
    }
    else {
      setSelectedPlan(title);
      setIsRegisterModalOpen(true);
    }
  }

  return (
      <div className="px-8">
        <HomePageHeader />
        <div className="bg-[#f6f2ff] rounded-xl border border-[#f6f2ff] px-0 md:px-8 text-gray-900 scroll-smooth">

        {/* Hero Section */}
        <section className="pt-16">
          <div className="mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="gap-6 flex flex-col items-start max-w-[400px]">
              <h2 className="w-full h-full overflow-hidden text-4xl leading-12 font-extrabold text-left whitespace-pre-line break-words opacity-100 visible">
                Turn ideas into tokens and earn as you write.
              </h2>
              <p className="text-gray-600 text-lg whitespace-pre-line break-words text-start">
              CoinWrite lets you mint and monetize content on-chain — share essays, thoughts, or newsletters and earn crypto instantly.
              </p>
              <button onClick={() => isConnected ? navigate('/publish_post') : open()} className="w-[200px] cursor-pointer text-center bg-[#9e74eb] hover:opacity-90 text-white px-6 py-3 rounded-xl transition duration-300 shadow-md">
                <span className="text-sm">Start Earning</span>
                {/* <ArrowRightIcon className="w-5 h-5 ml-2" /> */}
              </button>
            </div>
            <div className="hidden md:block">
              <img src={heroImage} alt="CoinWrite Illustration" className="w-full h-auto" />
            </div>
          </div>
        </section>
        

        {/* Features Section */}
        {/* <section id="features" className="py-16 px-6 max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center text-[#121212]">Why CoinWrite?</h3>
          <div className="grid md:grid-cols-3 gap-10">
            <Feature icon={PencilSquareIcon} title="Create and Publish" desc="Write and publish long-form posts or ideas with an intuitive editor." />
            <Feature icon={CloudArrowUpIcon} title="Mint as Token" desc="Turn your content into a collectible encrypted token with just a click." />
            <Feature icon={CurrencyDollarIcon} title="Earn from Every Read" desc="Monetize engagement — earn when users mint, tip, or share your work." />
            <Feature icon={RocketLaunchIcon} title="Own Your Impact" desc="Your words, your revenue. No middlemen, no algorithms, no hidden fees." />
            <Feature icon={HeartIcon} title="Built for Community" desc="Engage communities, reward co-creators, and fund shared ideas." />
            <Feature icon={BoltIcon} title="Web3-Ready in Seconds" desc="Connect your wallet and start minting instantly. No code required." />
          </div>
        </section> */}

        {/* Explore Section */}
        <section id="explore" className="py-16 px-6">
          <div className="mx-auto">
            <h3 className="text-2xl font-medium mb-8 text-center">Explore Most Popular Posts</h3>
            <div className="flex flex-wrap gap-4">
              {blogs.map((blog, index) => (
                <div key={index} className="grow max-w-[300px] cursor-pointer">
                  <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg">
                  <img src={blog.image} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className="relative mt-2 text-black text-start">
                    <h2 className="text-md font-semibold">{blog.title}</h2>
                    <p className="mt-1 text-sm text-gray-600">{blog.author}</p>
                  </div>
                </div>
            ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-2xl font-medium mb-8">Article Categories</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat) => (
                <span
                key={cat}
                className={
                  !['A', 'E', 'I', 'O', 'U'].includes(cat[0].toUpperCase())
                    ? "cursor-pointer bg-white px-8 text-[#9e74eb] border border-[#fff] px-4 py-2 rounded-full text-sm font-medium"
                    : "cursor-pointer bg-[#9e74eb] px-8 text-[#fff] border border-[#9e74eb] px-4 py-2 rounded-full text-sm font-medium"
                }
              >
                {cat}
              </span>
              ))}
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section id="plans" className="py-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-2xl font-medium mb-10">Choose Your Plan</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {plans.map((plan) => (
                <div key={plan.title} className="bg-white cursor-pointer p-6 text-start rounded-xl border border-gray-200 shadow">
                  <h4 className="text-lg font-normal mb-1">{plan.title}</h4>
                  <p className="text-3xl font-extrabold text-[#9e74eb] mb-4">{plan.price}</p>
                  <div className="text-sm text-gray-700 mb-4 space-y-4 py-6">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 w-full">
                        <CheckBadgeIcon className="w-5 h-5" />
                        <span className="whitespace-pre-line break-words">{feat}</span>
                        </div>
                    ))}
                  </div>
                  <button onClick={() => registerUser(plan.title)} className="bg-[#9e74eb] cursor-pointer text-white px-4 py-2 rounded-md w-full text-sm font-medium hover:opacity-90">Select</button>
                </div>
              ))}
            </div>
          </div>
        </section>
        </div>
      
        <footer className="py-10 text-center text-gray-500">
          &copy; 2025 CoinWrite. All rights reserved.
        </footer>

        <RegisterModal 
          plan={selectedPlan}
          isOpen={isRegisterModalOpen} 
          setIsOpen={setIsRegisterModalOpen}
        />

      </div>

  );
}

export default LandingPage;