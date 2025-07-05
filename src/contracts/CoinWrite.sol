// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.25;

contract CoinWrite {
    struct Coin {
      string id;
      string name;
      string description;
      address coinAddress;
      string symbol;
      address creatorAddress;
      string tokenUri;
    }

    struct User {
      string username;
      SubscriptionTier subscription_tier;
      string[] interests;
      uint256 last_subscribed_at;
    }

    struct RegisterUserParams {
      string username;
      SubscriptionTier subscription_tier;
      string[] interests;
    }

    enum SubscriptionTier {
      Basic, // 0.00001 ETH per post
      Premium // 0.000015 ETH per post
    }
    mapping(address => Coin[]) public creator_coins;
    mapping(address => User) public user_details;
    Coin[] public all_coins;
    User[] public all_users;
    address public coin_admin;
    uint256 public immutable BASIC_CREATOR_SUB_AMOUNT = 1*10**14; // 0.0001 ETH per post
    uint256 public immutable PREMIUM_CREATOR_SUB_AMOUNT = 15*10**13; // 0.00015 ETH per post
    uint256 public constant THIRTY_DAYS_IN_SECONDS = 30*24*60*60;

    modifier onlyAdmin {
      require(msg.sender == coin_admin, "CoinWrite: NOT_ADMIN");
      _;
    }

    event AdminUpdated(address admin, address previous_admin);
    event UserRegistered(User user);
    event CoinDetailsStored(Coin coin);
    event CreatorSubscriptionAmountUpdated(uint256 current_amount, uint256 previous_amount);

    constructor() {
      coin_admin = msg.sender;
    }

    function updateAdmin(address _newAdmin) public onlyAdmin {
      require(_newAdmin != address(0), "CoinWrite: ZERO_ADDRESS");
      coin_admin = _newAdmin;
      emit AdminUpdated(coin_admin, msg.sender);
    }

    function registerUser(RegisterUserParams calldata _params) public payable {
      if (_params.subscription_tier == SubscriptionTier.Basic) {
        require(msg.value == BASIC_CREATOR_SUB_AMOUNT, "CoinWrite: INSUFFICIENT_SUBSCRIPTION_AMOUNT-Basic");
      }
      else if (_params.subscription_tier == SubscriptionTier.Premium) {
        require(msg.value == PREMIUM_CREATOR_SUB_AMOUNT, "CoinWrite: INSUFFICIENT_SUBSCRIPTION_AMOUNT-Premium");
      }
      else {
        revert("CoinWrite: INVALID_SUBSCRIPTION_TIER");
      }
      if(user_details[msg.sender].last_subscribed_at > 0) {
        revert("CoinWrite: USER_ALREADY_REGISTERED");
      }
      User memory new_user = User({
        username: _params.username,
        subscription_tier: _params.subscription_tier,
        interests: _params.interests,
        last_subscribed_at: block.timestamp
      });
      user_details[msg.sender] = new_user;
      all_users.push(new_user);
      emit UserRegistered(new_user);
    }

    function getCreatorCoins(address creator) public view returns (Coin[] memory) {
      return creator_coins[creator];
    }

    function getAllCoins() public view returns (Coin[] memory) {
      return all_coins;
    }

    function getAllUsers() public view returns (User[] memory) {
      return all_users;
    }

    function getUserDetails(address user) public view returns (User memory) {
      return user_details[user];
    }

    function checkSubscriptionStatus(address _user) public view returns (bool) {
      User memory creator = user_details[_user];
      uint256 time_diff = block.timestamp - creator.last_subscribed_at;
      return time_diff < THIRTY_DAYS_IN_SECONDS;
    }

    function _validateCoin(Coin calldata _coin) internal pure returns (bool) {
      return (
        keccak256(bytes(_coin.id)) != keccak256(bytes("")) &&
        keccak256(bytes(_coin.name)) != keccak256(bytes("")) &&
        keccak256(bytes(_coin.description)) != keccak256(bytes("")) &&
        keccak256(bytes(_coin.symbol)) != keccak256(bytes("")) &&
        keccak256(bytes(_coin.tokenUri)) != keccak256(bytes("")) &&
        _coin.coinAddress != address(0) &&
        _coin.creatorAddress != address(0)
      );
    }

    function storeCoinDetails(Coin calldata _coin) public onlyAdmin {
      require(_validateCoin(_coin), "CoinWrite: INVALID_COIN_DATA");
      require(checkSubscriptionStatus(msg.sender), "CoinWrite: SUBSCRIPTION_EXPIRED");
      all_coins.push(_coin);
      creator_coins[_coin.creatorAddress].push(_coin);
      emit CoinDetailsStored(_coin);
    }

    function sendEth() public payable {
      payable(msg.sender).transfer(address(this).balance);
    }
}
