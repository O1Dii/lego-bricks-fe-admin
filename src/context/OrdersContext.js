import React, {useContext, useState} from "react";
import axios from 'axios';
import {ITEMS_GET, ITEMS_GET_ITEM_BY_ID, ORDERS_GET, ORDERS_GET_ORDER_BY_ID} from '../constants/links';
import {UserContext} from "./UserContext";
import {useNavigate} from "react-router-dom";

export const OrdersContext = React.createContext({
  orders: {orders: [], errorMessage: ''},
  loading: false,
  setOrders: () => {},
  loadOrders: () => {},
  getOrderDetails: () => {}
});

export default function OrdersContextProvider(props) {
  const {user} = useContext(UserContext)
  const navigate = useNavigate()
  const [perPage, setPerPage] = useState(20);
  const [pages, setPages] = useState(1);
  const [orders, setOrders] = useState({orders: [], errorMessage: ''});
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const loadOrders = () => {
    // setOrders({
    //   orders: [{
    //     id: '1',
    //     email: 'abc@abc.abc',
    //     phone: '+375259075285',
    //     address: 'ул. Кижеватова 1-122',
    //     items: [{
    //       id: '24',
    //       color: 'red',
    //       condition: 'new',
    //       price: 53,
    //       quantity: 1,
    //       // description: 'random description',
    //       // imageUrl: 'https://img.bricklink.com/ItemImage/PN/6/35106.png'
    //     }]
    //   }, {
    //     id: '2',
    //     email: 'abc@gmail.com',
    //     phone: '+375259075281',
    //     address: 'ул. Космонавтов 37-117',
    //     items: [{
    //       id: '24',
    //       color: 'red',
    //       condition: 'new',
    //       quantity: 1,
    //       price: 53,
    //       // description: 'random description',
    //       // imageUrl: 'https://img.bricklink.com/ItemImage/PN/6/35106.png'
    //     }, {
    //       id: '25',
    //       color: 'blue',
    //       condition: 'new',
    //       price: 25,
    //       quantity: 2,
    //       currency: 'usd',
    //       // description: 'random description',
    //       // imageUrl: 'https://img.bricklink.com/ItemImage/PN/4/42601c01.png'
    //     }]
    //   }],
    //   errorMessage: ''
    // })
    setLoading(true)
    axios
      .get(ORDERS_GET(), {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      })
      .then(response => {
        setOrders({orders: response.data.orders_list, errorMessage: ''});
        setPages(response.data.pages);
        setLoading(false)
      })
      .catch(error => {
        if (error.response.status === 401) {
          navigate('/login');
        }
        setOrders({orders: [], errorMessage: 'An error occurred while loading items'});
        setLoading(false);
      })
  }

  const getOrderDetails = (orderId) => {
    // return {
    //   id: '1',
    //   email: 'abc@abc.abc',
    //   phone: '+375259075285',
    //   address: 'ул. Кижеватова 1-122',
    //   items: [{
    //     id: '24',
    //     color: 'red',
    //     condition: 'new',
    //     currency: 'usd',
    //     price: 53,
    //     quantity: 1,
    //     description: 'random description',
    //     imageUrl: 'https://img.bricklink.com/ItemImage/PN/6/35106.png'
    //   }]
    // }
    setLoading(true)
    axios
      .get(ORDERS_GET_ORDER_BY_ID(orderId), {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`
        }
      })
      .then(response => {
        setOrderDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        setOrderDetails({});
        setLoading(false);
      })
  }

  const resetOrderDetails = () => {
    setOrderDetails({});
  }

  const context = {
    orders,
    loading,
    setOrders,
    loadOrders,
    getOrderDetails,
    resetOrderDetails,
    perPage,
    pages,
    setPerPage,
    orderDetails
  }

  return (
    <OrdersContext.Provider value={{...context}}>
      {props.children}
    </OrdersContext.Provider>
  )
}