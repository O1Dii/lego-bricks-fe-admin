import React, {useState} from "react";
import axios from 'axios';
import {CATEGORIES_GET, ITEMS_GET, ITEMS_GET_ITEM_BY_ID} from '../constants/links';

export const ItemsContext = React.createContext({
  items: {items: [], errorMessage: ''},
  itemDetails: {},
  categories: {},
  loading: false,
  categoriesLoading: false,
  setItems: () => {},
  loadItems: () => {},
  loadCategories: () => {},
  getItemDetails: () => {},
  resetItemDetails: () => {}
});

export default function ItemsContextProvider(props) {
  const [perPage, setPerPage] = useState(20);
  const [pages, setPages] = useState(1);
  const [items, setItems] = useState({items: [], errorMessage: ''});
  const [itemDetails, setItemDetails] = useState({});
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  const loadItems = (search = '', page = 1, category = '') => {
    console.log('load items')
    // setItems({
    //   items: [{
    //     id: '1',
    //     color: 'red',
    //     condition: 'new',
    //     currency: 'usd',
    //     description: 'random description',
    //     price: 53,
    //     quantity: 1,
    //     imageUrl: 'https://img.bricklink.com/ItemImage/PN/6/35106.png'
    //   }, {
    //     id: '2',
    //     color: 'green',
    //     condition: 'new',
    //     currency: 'usd',
    //     description: 'random description 2',
    //     price: 24,
    //     quantity: 10,
    //     imageUrl: 'https://img.bricklink.com/ItemImage/PN/4/42601c01.png'
    //   }],
    //   errorMessage: ''
    // })
    setLoading(true)
    const fullCategory = category ? `Parts / ${category}` : ''
    axios
      .get(ITEMS_GET(search, page, fullCategory))
      .then(response => {
        setItems({items: response.data.items, errorMessage: ''});
        setPages(response.data.pages);
        setLoading(false)
      })
      .catch(error => {
        setItems({items: [], errorMessage: 'An error occurred while loading items'});
        setLoading(false)
      })
  }

  const loadCategories = () => {
    setCategoriesLoading(true)
    axios
      .get(CATEGORIES_GET())
      .then(response => {
        setCategories(response.data);
        setCategoriesLoading(false)
      })
      .catch(error => {
        setCategories({});
        setCategoriesLoading(false)
      })
  }

  const getItemDetails = (itemId) => {
    // return {
    //   id: '1',
    //   color: 'red',
    //   condition: 'new',
    //   currency: 'usd',
    //   description: 'random description',
    //   price: 53,
    //   quantity: 1,
    //   imageUrl: 'https://img.bricklink.com/ItemImage/PN/6/35106.png'
    // }
    setLoading(true)
    axios
      .get(ITEMS_GET_ITEM_BY_ID(itemId))
      .then(response => {
        setItemDetails(response.data);
        setLoading(false);
      })
      .catch(error => {
        setItemDetails({});
        setLoading(false);
      })
  }

  const resetItemDetails = () => {
    setItemDetails({});
  }

  const context = {
    items,
    itemDetails,
    categories,
    loading,
    categoriesLoading,
    setItems,
    loadItems,
    loadCategories,
    getItemDetails,
    resetItemDetails,
    perPage,
    pages,
    setPerPage,
  }

  return (
    <ItemsContext.Provider value={{...context}}>
      {props.children}
    </ItemsContext.Provider>
  )
}