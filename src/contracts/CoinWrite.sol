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
      uint256 subscription_start_time;
    }

    struct RegisterUserParams {
      string username;
      SubscriptionTier subscription_tier;
      string[] interests;
    }

    enum SubscriptionTier {
      PayAsYouGo, // 0.1 ETH per post (max == MAX_UINT)
      Creator // 0.01 ETH per month
    }
    mapping(address => Coin[]) public creator_coins;
    mapping(address => User) public user_details;
    Coin[] public all_coins;
    User[] public all_users;
    address public coin_admin;

    modifier onlyAdmin {
      require(msg.sender == coin_admin, "CoinWrite: NOT_ADMIN");
      _;
    }

    event AdminUpdated(address admin, address previous_admin);
    event UserRegistered(User user);
    event CoinDetailsStored(Coin coin);

    constructor() {
      coin_admin = msg.sender;
    }

    function updateAdmin(address _newAdmin) public onlyAdmin {
      require(_newAdmin != address(0), "CoinWrite: ZERO_ADDRESS");
      coin_admin = _newAdmin;
      emit AdminUpdated(coin_admin, msg.sender);
    }

    function registerUser(RegisterUserParams calldata _params) public {
      User memory new_user = User({
        username: _params.username,
        subscription_tier: _params.subscription_tier,
        interests: _params.interests,
        subscription_start_time: block.timestamp
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
      all_coins.push(_coin);
      creator_coins[_coin.creatorAddress].push(_coin);
      emit CoinDetailsStored(_coin);
    }
}
