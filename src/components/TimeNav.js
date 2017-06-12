import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class TimeNav extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state


    return (
      <Menu.Menu position='right'>
        <Menu.Item name='24h' active={activeItem === '24 Hours'} onClick={this.handleItemClick}>
          Last 24 Hours
        </Menu.Item>

        <Menu.Item name='7d' active={activeItem === 'Last 7 Days'} onClick={this.handleItemClick}>
          Last 7 Days
        </Menu.Item>
      </Menu.Menu>
    )
  }
};

export default TimeNav;
