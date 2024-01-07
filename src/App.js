// src/App.js
import React from 'react';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import './App.css';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex !== -1) {
        // If item already exists, update quantity
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        // If item doesn't exist, add it to the cart
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;

const CartItem = ({ id, name, price, quantity }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = e => {
    dispatch(updateQuantity({ id, quantity: parseInt(e.target.value, 10) || 0 }));
  };

  return (
    <div class="card">
    <div class="card-body">

      <h6>Name:{name}</h6>
      <h6>Price:${price.toFixed(2)}</h6>
      <button class="btn btn-outline-danger float-end" onClick={() => dispatch(removeItem(id))}>Remove</button>
    </div>
    </div>

  );
};

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <div className="cart-container">
      <h1>Shopping Cart</h1> <div className="total">
        <h6>Total Quantity: {totalQuantity}</h6>
        <h6>Total Amount: ${totalAmount.toFixed(2)}</h6>
      </div>
      {cartItems.map(item => (
        <CartItem key={item.id} {...item} />
      ))}
     
    </div>

    <div class="container">
      <div class="">

      </div>

    </div>
    </>
  
  );
};

const App = () => {
  const dispatch = useDispatch();

  const sampleData = [
    

      {
          "id": 1,
          "name": "iPhone 9",
          "description": "An apple mobile which is nothing like apple",
          "price": 549,
          "discountPercentage": 12.96,
          "rating": 4.69,
          "quantity": 94,
          "brand": "Apple",
          "category": "smartphones",
          "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
          "images": [
              "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
          ]
      },
      {
          "id": 2,
          "name": "iPhone X",
          "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
          "price": 899,
          "discountPercentage": 17.94,
          "rating": 4.44,
          "quantity": 34,
          "brand": "Apple",
          "category": "smartphones",
          "thumbnail": "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
          "images": [
              "https://i.dummyjson.com/data/products/2/thumbnail.jpg"
          ]
      },
      {
          "id": 3,
          "name": "Samsung Universe 9",
          "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
          "price": 1249,
          "discountPercentage": 15.46,
          "rating": 4.09,
          "quantity": 36,
          "brand": "Samsung",
          "category": "smartphones",
          "thumbnail": "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
          "images": [
              "https://i.dummyjson.com/data/products/3/1.jpg"
          ]
      },
      {
          "id": 4,
          "name": "OPPOF19",
          "description": "OPPO F19 is officially announced on April 2021.",
          "price": 280,
          "discountPercentage": 17.91,
          "rating": 4.3,
          "quantity": 123,
          "brand": "OPPO",
          "category": "smartphones",
          "thumbnail": "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
          "images": [
              "https://i.dummyjson.com/data/products/4/thumbnail.jpg"
          ]
      },
      {
          "id": 5,
          "name": "Huawei P30",
          "description": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
          "price": 499,
          "discountPercentage": 10.58,
          "rating": 4.09,
          "quantity": 32,
          "brand": "Huawei",
          "category": "smartphones",
          "thumbnail": "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
          "images": [
              "https://i.dummyjson.com/data/products/5/1.jpg"
          ]
      }
  
  ];

  const handleAddItem = item => {
    dispatch(addItem(item));
  };


  return (
    <>
   

    <div class="container">

<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
    
      <div class="modal-body">
      <Cart />

      </div>
    
    </div>
  </div>
</div>


      <div class="mt-5 card border-0">
      <div class="mt-5 card-body">
<div class="row row-cols-1 row-cols-md-3 g-4">
{sampleData.map(item => (
<div class="col">
    <div class="card border-3 w-75" key={item.id}>
      <img src={item.images} class="card-img-top" alt="..." style={{height:200}}/>
      <div class="card-body">
        <h5 class="card-title">{item.name}</h5>
        <span>${item.price.toFixed(2)}</span>
        <p class="card-text">{item.description}</p>
        <p>Price:<b>{item.price}</b></p>
        <p>Quantity:<b>{item.quantity}</b></p>
        <button class="btn btn-primary"  onClick={() => handleAddItem(item)}>Add To Cart</button>
        

      
      </div>
    </div>
  </div>
  ))}
</div>


</div>
      </div>
    </div>
    </>

  );
};

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ReduxApp;
