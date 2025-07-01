// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.25;

import "forge-std/Test.sol";
import {CoinWrite} from "../src/CoinWrite.sol";

contract CoinWriteTest is Test {
    CoinWrite coinWrite;
    address admin = address(0xA);
    address user1 = address(0xB);
    address user2 = address(0xC);
    address coinAddr = address(0xD);

    function setUp() public {
        vm.deal(user1, 1 ether);
        vm.deal(user2, 1 ether);
        vm.prank(admin);
        coinWrite = new CoinWrite();
    }

    function testInitialAdmin() public {
        assertEq(coinWrite.coin_admin(), admin);
    }

    function testUpdateAdmin() public {
        address newAdmin = address(0xE);
        vm.prank(admin);
        coinWrite.updateAdmin(newAdmin);
        assertEq(coinWrite.coin_admin(), newAdmin);
    }

    function testUpdateAdminNotAdminReverts() public {
        address newAdmin = address(0xE);
        vm.prank(user1);
        vm.expectRevert("CoinWrite: NOT_ADMIN");
        coinWrite.updateAdmin(newAdmin);
    }

    function testRegisterUserBasicTier() public {
        CoinWrite.RegisterUserParams memory params = CoinWrite.RegisterUserParams({
            username: "alice",
            subscription_tier: CoinWrite.SubscriptionTier.Basic,
            interests: new string[](2)
        });
        params.interests[0] = "tech";
        params.interests[1] = "art";
        uint256 amount = coinWrite.BASIC_CREATOR_SUB_AMOUNT();
        vm.prank(user1);
        coinWrite.registerUser{value: amount}(params);
        CoinWrite.User memory user = coinWrite.getUserDetails(user1);
        assertEq(user.username, "alice");
        assertEq(uint(user.subscription_tier), uint(CoinWrite.SubscriptionTier.Basic));
        assertEq(user.interests.length, 2);
        assertEq(user.interests[0], "tech");
        assertEq(user.interests[1], "art");
        assertApproxEqAbs(user.last_subscribed_at, block.timestamp, 2);
    }

    function testRegisterUserPremiumTier() public {
        CoinWrite.RegisterUserParams memory params = CoinWrite.RegisterUserParams({
            username: "bob",
            subscription_tier: CoinWrite.SubscriptionTier.Premium,
            interests: new string[](1)
        });
        params.interests[0] = "music";
        uint256 amount = coinWrite.PREMIUM_CREATOR_SUB_AMOUNT();
        vm.prank(user2);
        coinWrite.registerUser{value: amount}(params);
        CoinWrite.User memory user = coinWrite.getUserDetails(user2);
        assertEq(user.username, "bob");
        assertEq(uint(user.subscription_tier), uint(CoinWrite.SubscriptionTier.Premium));
        assertEq(user.interests.length, 1);
        assertEq(user.interests[0], "music");
        assertApproxEqAbs(user.last_subscribed_at, block.timestamp, 2);
    }

    function testRegisterUserPayAsYouGoReverts() public {
        CoinWrite.RegisterUserParams memory params = CoinWrite.RegisterUserParams({
            username: "fail",
            subscription_tier: CoinWrite.SubscriptionTier.PayAsYouGo,
            interests: new string[](0)
        });
        vm.prank(user1);
        vm.expectRevert("CoinWrite: INVALID_SUBSCRIPTION_TIER");
        coinWrite.registerUser{value: 0.1 ether}(params);
    }

    function testRegisterUserWithInsufficientAmountBasicReverts() public {
        CoinWrite.RegisterUserParams memory params = CoinWrite.RegisterUserParams({
            username: "fail",
            subscription_tier: CoinWrite.SubscriptionTier.Basic,
            interests: new string[](0)
        });
        uint256 amount = coinWrite.BASIC_CREATOR_SUB_AMOUNT();
        vm.prank(user1);
        vm.expectRevert("CoinWrite: INSUFFICIENT_SUBSCRIPTION_AMOUNT-Basic");
        coinWrite.registerUser{value: amount - 1}(params);
    }

    function testRegisterUserWithInsufficientAmountPremiumReverts() public {
        CoinWrite.RegisterUserParams memory params = CoinWrite.RegisterUserParams({
            username: "fail",
            subscription_tier: CoinWrite.SubscriptionTier.Premium,
            interests: new string[](0)
        });
        uint256 amount = coinWrite.PREMIUM_CREATOR_SUB_AMOUNT();
        vm.prank(user2);
        vm.expectRevert("CoinWrite: INSUFFICIENT_SUBSCRIPTION_AMOUNT-Premium");
        coinWrite.registerUser{value: amount - 1}(params);
    }

    function testRegisterUserEmitsEvent() public {
        CoinWrite.RegisterUserParams memory params = CoinWrite.RegisterUserParams({
            username: "eve",
            subscription_tier: CoinWrite.SubscriptionTier.Basic,
            interests: new string[](1)
        });
        params.interests[0] = "science";
        uint256 amount = coinWrite.BASIC_CREATOR_SUB_AMOUNT();
        vm.prank(user2);
        vm.expectEmit(true, true, true, true);
        emit CoinWrite.UserRegistered(CoinWrite.User({
            username: "eve",
            subscription_tier: CoinWrite.SubscriptionTier.Basic,
            interests: params.interests,
            last_subscribed_at: block.timestamp
        }));
        coinWrite.registerUser{value: amount}(params);
    }

    function testCheckSubscriptionStatusTrue() public {
        CoinWrite.RegisterUserParams memory params = CoinWrite.RegisterUserParams({
            username: "alice",
            subscription_tier: CoinWrite.SubscriptionTier.Basic,
            interests: new string[](0)
        });
        uint256 amount = coinWrite.BASIC_CREATOR_SUB_AMOUNT();
        vm.prank(user1);
        coinWrite.registerUser{value: amount}(params);
        assertTrue(coinWrite.checkSubscriptionStatus(user1));
    }

    function testCheckSubscriptionStatusFalse() public {
        CoinWrite.RegisterUserParams memory params = CoinWrite.RegisterUserParams({
            username: "alice",
            subscription_tier: CoinWrite.SubscriptionTier.Basic,
            interests: new string[](0)
        });
        uint256 amount = coinWrite.BASIC_CREATOR_SUB_AMOUNT();
        vm.prank(user1);
        coinWrite.registerUser{value: amount}(params);
        // Simulate time passing
        vm.warp(block.timestamp + coinWrite.THIRTY_DAYS_IN_SECONDS() + 1);
        assertFalse(coinWrite.checkSubscriptionStatus(user1));
    }

    function testGetAllUsers() public {
        CoinWrite.RegisterUserParams memory params = CoinWrite.RegisterUserParams({
            username: "bob",
            subscription_tier: CoinWrite.SubscriptionTier.Premium,
            interests: new string[](1)
        });
        params.interests[0] = "music";
        uint256 amount = coinWrite.PREMIUM_CREATOR_SUB_AMOUNT();
        vm.prank(user1);
        coinWrite.registerUser{value: amount}(params);
        CoinWrite.User[] memory users = coinWrite.getAllUsers();
        assertEq(users.length, 1);
        assertEq(users[0].username, "bob");
    }

    function testStoreCoinDetailsAndGetters() public {
        CoinWrite.Coin memory coin = CoinWrite.Coin({
            id: "1",
            name: "TestCoin",
            description: "A test coin",
            coinAddress: coinAddr,
            symbol: "TST",
            creatorAddress: user1,
            tokenUri: "ipfs://test"
        });
        vm.prank(admin);
        coinWrite.storeCoinDetails(coin);
        CoinWrite.Coin[] memory allCoins = coinWrite.getAllCoins();
        assertEq(allCoins.length, 1);
        assertEq(allCoins[0].name, "TestCoin");
        CoinWrite.Coin[] memory creatorCoins = coinWrite.getCreatorCoins(user1);
        assertEq(creatorCoins.length, 1);
        assertEq(creatorCoins[0].id, "1");
    }

    function testStoreCoinDetailsInvalidReverts() public {
        CoinWrite.Coin memory invalidCoin = CoinWrite.Coin({
            id: "",
            name: "",
            description: "",
            coinAddress: address(0),
            symbol: "",
            creatorAddress: address(0),
            tokenUri: ""
        });
        vm.prank(admin);
        vm.expectRevert("CoinWrite: INVALID_COIN_DATA");
        coinWrite.storeCoinDetails(invalidCoin);
    }

    function testStoreCoinDetailsNotAdminReverts() public {
        CoinWrite.Coin memory coin = CoinWrite.Coin({
            id: "2",
            name: "TestCoin2",
            description: "Another test coin",
            coinAddress: coinAddr,
            symbol: "TST2",
            creatorAddress: user2,
            tokenUri: "ipfs://test2"
        });
        vm.prank(user1);
        vm.expectRevert("CoinWrite: NOT_ADMIN");
        coinWrite.storeCoinDetails(coin);
    }

    function testGetUserDetailsNonexistent() public {
        CoinWrite.User memory user = coinWrite.getUserDetails(user2);
        assertEq(user.username, "");
        assertEq(user.interests.length, 0);
    }
} 