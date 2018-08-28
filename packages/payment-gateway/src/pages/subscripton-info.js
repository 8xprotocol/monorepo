/* Import statements */
import React from 'react';

import Header from '../components/header.js';
import {default as Images} from '../middleware/images';
import Dropdown from '../components/dropdown.js';

/* App component */
class SubscriptionInfo extends React.Component {
  render() {
    return (
      <div>
        <div className="small-card">
          <Header title="Subscription Information"/>
          <div className="hero">
            <div className="main-item">
              <div className="logo">
                <img src={Images.netflixLogo}/>
              </div>
              <div className="text">
                <p>Netflix - Premium Account</p>
                <span>$14USD billed monthly</span>
              </div>
            </div>
            <div className="option">
              <div className="currency">
                <div className="text">
                  <p>I want to pay using</p>
                </div>
                <Dropdown items={this.dropdownItems()}/>
              </div>
              <div className="time">
                <div className="text">
                  <p>I want to top my account every</p>
                </div>
                <Dropdown items={this.timeItems()}/>
              </div>
            </div>
            <div className="action">
              <p className="text">To start your subscription, please send</p>
              <h2>0.014 ETH </h2>
              <p className="text">to your personal wallet</p>
            </div>
            <div className="item-address">
              <p className="text-address">0x3551466a812dD2e7Dc9323d246d208B7FDd3fe8D</p>
              <div className="text-button">
                <p className="text-copy">Copy</p>
              </div>
            </div>
            <div className="balance">
              <p>Current Balance</p>
              <p className="currency">0.00ETH</p>
            </div>
            <div className="transaction">
              <p>Awaiting Transaction</p>
            </div>
          </div>
        </div> 
      </div>
    );
  }

  dropdownItems() {
    return [
      {
        image: Images.ethLogo,
        name: 'Ethereum',
        ticker: 'ETH'
      },
      {
        image: Images.ethLogo,
        name: 'DAI',
        ticker: 'DAI'
      }
    ];
  }

  timeItems(){
    return [
      {
        name: '6',
        ticker: 'months'
      },
      {
        name: '5',
        ticker: 'months'
      }
    ];
  }
};

export default SubscriptionInfo;