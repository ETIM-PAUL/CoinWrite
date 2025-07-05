export const formatDate = (dateString) => {
    try {
      const [year, month, day] = dateString.split('T')[0].split('-');
      const date = new Date(year, month - 1, day); // month is 0-based in JS
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

export const plans = [
    {
        title: 'Basic',
        price: '0.0001ETH/month',
        features: ['Post Banner and Text Editor', '20 posts/month', '5000 words/post']
    },
    {
        title: 'Premium',
        price: '0.00015ETH/month',
        features: ['Post Banner, Text Editor, and AI Assistant', 'Unlimited Posts', 'Unlimited words/post']
    }
]

export const coinContract = "0x51018bBB263e8D604d312440157558c4343625F5"

export const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "admin",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "previous_admin",
                "type": "address"
            }
        ],
        "name": "AdminUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "id",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "coinAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "creatorAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "tokenUri",
                        "type": "string"
                    }
                ],
                "indexed": false,
                "internalType": "struct CoinWrite.Coin",
                "name": "coin",
                "type": "tuple"
            }
        ],
        "name": "CoinDetailsStored",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "current_amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "previous_amount",
                "type": "uint256"
            }
        ],
        "name": "CreatorSubscriptionAmountUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "username",
                        "type": "string"
                    },
                    {
                        "internalType": "enum CoinWrite.SubscriptionTier",
                        "name": "subscription_tier",
                        "type": "uint8"
                    },
                    {
                        "internalType": "string[]",
                        "name": "interests",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "last_subscribed_at",
                        "type": "uint256"
                    }
                ],
                "indexed": false,
                "internalType": "struct CoinWrite.User",
                "name": "user",
                "type": "tuple"
            }
        ],
        "name": "UserRegistered",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "BASIC_CREATOR_SUB_AMOUNT",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "PREMIUM_CREATOR_SUB_AMOUNT",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "THIRTY_DAYS_IN_SECONDS",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "all_coins",
        "outputs": [
            {
                "internalType": "string",
                "name": "id",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "coinAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "creatorAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "tokenUri",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "all_users",
        "outputs": [
            {
                "internalType": "string",
                "name": "username",
                "type": "string"
            },
            {
                "internalType": "enum CoinWrite.SubscriptionTier",
                "name": "subscription_tier",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "last_subscribed_at",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "checkSubscriptionStatus",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "coin_admin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "creator_coins",
        "outputs": [
            {
                "internalType": "string",
                "name": "id",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "coinAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "creatorAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "tokenUri",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllCoins",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "id",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "coinAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "creatorAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "tokenUri",
                        "type": "string"
                    }
                ],
                "internalType": "struct CoinWrite.Coin[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllUsers",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "username",
                        "type": "string"
                    },
                    {
                        "internalType": "enum CoinWrite.SubscriptionTier",
                        "name": "subscription_tier",
                        "type": "uint8"
                    },
                    {
                        "internalType": "string[]",
                        "name": "interests",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "last_subscribed_at",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct CoinWrite.User[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "creator",
                "type": "address"
            }
        ],
        "name": "getCreatorCoins",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "id",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "coinAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "creatorAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "tokenUri",
                        "type": "string"
                    }
                ],
                "internalType": "struct CoinWrite.Coin[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getUserDetails",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "username",
                        "type": "string"
                    },
                    {
                        "internalType": "enum CoinWrite.SubscriptionTier",
                        "name": "subscription_tier",
                        "type": "uint8"
                    },
                    {
                        "internalType": "string[]",
                        "name": "interests",
                        "type": "string[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "last_subscribed_at",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct CoinWrite.User",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "username",
                        "type": "string"
                    },
                    {
                        "internalType": "enum CoinWrite.SubscriptionTier",
                        "name": "subscription_tier",
                        "type": "uint8"
                    },
                    {
                        "internalType": "string[]",
                        "name": "interests",
                        "type": "string[]"
                    }
                ],
                "internalType": "struct CoinWrite.RegisterUserParams",
                "name": "_params",
                "type": "tuple"
            }
        ],
        "name": "registerUser",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "sendEth",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "id",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "coinAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "creatorAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "tokenUri",
                        "type": "string"
                    }
                ],
                "internalType": "struct CoinWrite.Coin",
                "name": "_coin",
                "type": "tuple"
            }
        ],
        "name": "storeCoinDetails",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_newAdmin",
                "type": "address"
            }
        ],
        "name": "updateAdmin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "user_details",
        "outputs": [
            {
                "internalType": "string",
                "name": "username",
                "type": "string"
            },
            {
                "internalType": "enum CoinWrite.SubscriptionTier",
                "name": "subscription_tier",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "last_subscribed_at",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

