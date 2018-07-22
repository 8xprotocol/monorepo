pragma solidity 0.4.24;

import "./MockTime.sol";
import "../VolumeSubscription.sol";

/** @title Mock contract in order to test time logic reliably. */
/** @author Kerman Kohli - <kerman@TBD.com> */

contract MockVolumeSubscription is VolumeSubscription, MockTime { }