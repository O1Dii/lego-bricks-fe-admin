import React, {useState} from "react";
import axios from 'axios';
import {ITEMS_GET} from '../constants/links';

export const ItemsContext = React.createContext({
  myItems: {items: [], errorMessage: ''},
  loading: false,
  setMyItems: () => {},
  loadItems: () => {},
  getItemDetails: () => {}
});

export default function ItemsContextProvider(props) {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(false);

  const loadItems = (search = '', page = 1) => {
    console.log('load items')
    setItems({
      items: [{
        id: '1',
        color: 'red',
        condition: 'new',
        currency: 'usd',
        description: 'random description',
        price: 53,
        quantity: 1,
        imageUrl: 'https://img.bricklink.com/ItemImage/PN/6/35106.png'
      }, {
        id: '2',
        color: 'green',
        condition: 'new',
        currency: 'usd',
        description: 'random description 2',
        price: 24,
        quantity: 10,
        imageUrl: 'https://img.bricklink.com/ItemImage/PN/4/42601c01.png'
      }],
      errorMessage: ''
    })
    // setLoading(true)
    // axios
    //   .get(ITEMS_GET(search, page))
    //   .then(response => {
    //     setMyItems({items: response.data, errorMessage: ''});
    //     setLoading(false)
    //   })
    //   .catch(error => {
    //     setMyItems({items: [], errorMessage: 'An error occurred while loading items'});
    //   })
  }

  const getItemDetails = () => {
    return {
      id: '1',
      color: 'red',
      condition: 'new',
      currency: 'usd',
      description: 'random description',
      price: 53,
      quantity: 1,
      imageUrl: 'https://img.bricklink.com/ItemImage/PN/6/35106.png'
    }
    // setLoading(true)
    // axios
    //   .get(ITEMS_GET(), {
    //     headers: {
    //       'Authorization': `Bearer ${user.accessToken}`,
    //     }
    //   })
    //   .then(response => {
    //     setOrders({orders: response.data, errorMessage: ''});
    //     setLoading(false)
    //   })
    //   .catch(error => {
    //     setOrders({orders: [], errorMessage: 'An error occurred while loading items'});
    //     setLoading(false);
    //   })
  }

  const context = {
    items,
    loading,
    setItems,
    loadItems,
    getItemDetails
  }

  return (
    <ItemsContext.Provider value={{...context}}>
      {props.children}
    </ItemsContext.Provider>
  )
}