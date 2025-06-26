import React, {useContext, useState} from "react";
import axios from 'axios';
import {ITEMS_GET} from '../constants/links';
import {UserContext} from "./UserContext";

export const OrdersContext = React.createContext({
  myItems: {items: [], errorMessage: ''},
  loading: false,
  setMyItems: () => {},
  loadOrders: () => {},
  getOrderDetails: () => {}
});

export default function OrdersContextProvider(props) {
  const {user} = useContext(UserContext)
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(false);

  const loadOrders = () => {
    console.log('load items')
    setOrders({
      orders: [{
        id: '1',
        email: 'abc@abc.abc',
        phone: '+375259075285',
        address: 'ул. Кижеватова 1-122',
        items: [{
          id: '24',
          color: 'red',
          condition: 'new',
          price: 53,
          quantity: 1,
          // description: 'random description',
          // imageUrl: 'https://img.bricklink.com/ItemImage/PN/6/35106.png'
        }]
      }, {
        id: '2',
        email: 'abc@gmail.com',
        phone: '+375259075281',
        address: 'ул. Космонавтов 37-117',
        items: [{
          id: '24',
          color: 'red',
          condition: 'new',
          quantity: 1,
          price: 53,
          // description: 'random description',
          // imageUrl: 'https://img.bricklink.com/ItemImage/PN/6/35106.png'
        }, {
          id: '25',
          color: 'blue',
          condition: 'new',
          price: 25,
          quantity: 2,
          currency: 'usd',
          // description: 'random description',
          // imageUrl: 'https://img.bricklink.com/ItemImage/PN/4/42601c01.png'
        }]
      }],
      errorMessage: ''
    })
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

  const getOrderDetails = () => {
    return {
      id: '1',
      email: 'abc@abc.abc',
      phone: '+375259075285',
      address: 'ул. Кижеватова 1-122',
      items: [{
        id: '24',
        color: 'red',
        condition: 'new',
        currency: 'usd',
        price: 53,
        quantity: 1,
        description: 'random description',
        imageUrl: 'https://img.bricklink.com/ItemImage/PN/6/35106.png'
      }]
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
    orders,
    loading,
    setOrders,
    loadOrders,
    getOrderDetails
  }

  return (
    <OrdersContext.Provider value={{...context}}>
      {props.children}
    </OrdersContext.Provider>
  )
}