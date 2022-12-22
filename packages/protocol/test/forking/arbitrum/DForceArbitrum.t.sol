// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "forge-std/console.sol";
import {Routines} from "../../utils/Routines.sol";
import {ForkingSetup} from "../ForkingSetup.sol";
import {ILendingProvider} from "../../../src/interfaces/ILendingProvider.sol";
import {BorrowingVault} from "../../../src/vaults/borrowing/BorrowingVault.sol";
import {DForceArbitrum} from "../../../src/providers/arbitrum/DForceArbitrum.sol";

contract DForceArbitrumTest is Routines, ForkingSetup {
  ILendingProvider public dForce;

  function setUp() public {
    deploy(ARBITRUM_DOMAIN);

    dForce = new DForceArbitrum();
    ILendingProvider[] memory providers = new ILendingProvider[](1);
    providers[0] = dForce;

    _setVaultProviders(vault, providers);
    vault.setActiveProvider(dForce);
  }

  function test_depositAndBorrow() public {
    do_deposit(DEPOSIT_AMOUNT, vault, ALICE);
    do_borrow(BORROW_AMOUNT, vault, ALICE);
  }

  function test_paybackAndWithdraw() public {
    deal(address(vault.asset()), ALICE, DEPOSIT_AMOUNT);

    do_depositAndBorrow(DEPOSIT_AMOUNT, BORROW_AMOUNT, vault, ALICE);

    uint256 aliceDebt = vault.balanceOfDebt(ALICE);
    do_payback(aliceDebt, vault, ALICE);

    uint256 maxAmount = vault.maxWithdraw(ALICE);
    do_withdraw(maxAmount, vault, ALICE);
  }

  function test_getBalances() public {
    do_depositAndBorrow(DEPOSIT_AMOUNT, BORROW_AMOUNT, vault, ALICE);

    uint256 depositBalance = vault.totalAssets();
    uint256 borrowBalance = vault.totalDebt();

    //account for rounding issue
    assertApproxEqAbs(depositBalance, DEPOSIT_AMOUNT, DEPOSIT_AMOUNT / 1000);
    assertApproxEqAbs(borrowBalance, BORROW_AMOUNT, BORROW_AMOUNT / 1000);
  }

  function test_getInterestRates() public {
    uint256 depositRate = dForce.getDepositRateFor(vault);
    assertGt(depositRate, 0); // Should be greater than zero.

    uint256 borrowRate = dForce.getBorrowRateFor(vault);
    assertGt(borrowRate, 0); // Should be greater than zero.
  }
}
