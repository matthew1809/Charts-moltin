import React, { Component } from 'react';
import Center from 'react-center';
//import * as moment from 'moment';
import * as Spinner from 'react-spinkit';
import { Header, Image, Table } from 'semantic-ui-react'
var api = require('../utils/moltin.js');

class BestSellers extends Component {

  constructor(props) {
    super();
    this.state = {orders: null};
  }

  componentDidMount() {
    api.GetOrders()
    .then((orders) => {
      this.setState(() => {
        return {
          orders: orders
        }
      })
    })

    .catch((error) => {
      console.log(error)
    })

  }

  render() {

    if(this.state.orders !== null) {

      return (
      <Center style={{paddingTop: 100}}>
        <Table basic='very' celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Quantity Sold</Table.HeaderCell>
              <Table.HeaderCell>Revenue</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src='/assets/images/avatar/small/lena.png' shape='rounded' size='mini' />
                  <Header.Content>
                    Product A
                    <Header.Subheader>Description</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                22
              </Table.Cell>
              <Table.Cell>
                22
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src='/assets/images/avatar/small/matthew.png' shape='rounded' size='mini' />
                  <Header.Content>
                    Product B
                    <Header.Subheader>Description</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                15
              </Table.Cell>
              <Table.Cell>
                22
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src='/assets/images/avatar/small/lindsay.png' shape='rounded' size='mini' />
                  <Header.Content>
                    Product C
                    <Header.Subheader>Description</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                12
              </Table.Cell>
              <Table.Cell>
                22
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src='/assets/images/avatar/small/mark.png' shape='rounded' size='mini' />
                  <Header.Content>
                    Product D
                    <Header.Subheader>Description</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                11
              </Table.Cell>
              <Table.Cell>
                22
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Center>
      )
    }

    else {
      console.log('no data')
      return (
        <div style={{height: 100 + '%', width: 100 + '%'}}>
          <Center style={{paddingTop: 250}}>
            <Spinner name="ball-spin-fade-loader"/>
          </Center>
      </div>
      )
    }
  }
}

export default BestSellers;
