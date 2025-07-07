import React, { useContext, useEffect, useState } from "react";
import NftCard from "./NftCard";
import { PlusIcon } from "lucide-react";
import { PostsContext } from "../context/PostsContext";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import Loved from "../assets/icons/loved.svg";
import Heart from "../assets/icons/heart.svg";

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
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("Art");
  const [userCoins, setUserCoins] = useState([]);
  const [categories, setCategories] = useState({});
  const { coinDetails } = useContext(PostsContext);

  const fetchCoinDetails =  () => {
    setUserCoins(coinDetails ?? []);
  }

  const getCategory = async (ipfs) => {
    try {
      setLoading(true);
      // Convert IPFS URL to HTTP URL
      const httpUrl = ipfs.replace('ipfs://', 'https://ipfs.io/ipfs/');
  
      // Fetch metadata from IPFS
      const metadata = await fetch(httpUrl);
      const metadataJson = await metadata.json();
      // Return the category
      setLoading(false);
      return metadataJson.properties?.category;
    } catch (error) {
      console.error('Error fetching metadata from IPFS:', error);
      throw error;
    }
  };
  
  const fetchCategories = async () => {
    const categoryMap = {};
    if(coinDetails?.length > 0) {
    for (let index = 0; index < coinDetails.length; index++) {
      const element = coinDetails[index];
      try {
        const category = await getCategory(element?.tokenUri);
        categoryMap[element?.tokenUri] = category;
      } catch (error) {
        console.error(`Error fetching category for post ${element?.id}:`, error);
        categoryMap[element?.id] = 'Unknown';
      }
    }
  }
    setCategories(categoryMap);
  };

    useEffect(() => {
    fetchCategories();
    fetchCoinDetails();
  }, [coinDetails]);

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
            {Object.keys(categories).length > 0 && Object.entries(categories).map(([key, value], index) => (
            <FilterValue key={index} value={value} setFilter={setFilter} filter={filter} />
            ))}
          </div>
          )}

        {(loading && userCoins.length === 0) ? (
            // Show skeleton loader while loading
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-40"></div>
                <div className="mt-2 bg-gray-200 h-4 w-3/4 rounded"></div>
                <div className="mt-2 bg-gray-200 h-4 w-1/2 rounded"></div>
              </div>
              ))}
            </div>
          ) : (userCoins.length > 0 && !loading) ? (
            // Show filtered coin details
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
              {userCoins.map((coin, index) => (
                <NftCard
                  key={index}
                  nftImg={coin?.mediaContent?.previewImage?.medium}
                  category={categories[coin?.tokenUri] || 'Unknown'}
                  nftName={coin?.name}
                  holders={coin?.uniqueHolders}
                  loved={Loved}
                  notLoved={Heart}
                  {...coin}
                  type={"collection"}
                />
              ))}
            </div>
          ) : (
            // Show "No Posts yet" if there are no matching posts
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500">No Posts yet</p>
            </div>
          )}
        </section>

        
      </div>
    </div>
  );
};

export default ForYouPiece;
