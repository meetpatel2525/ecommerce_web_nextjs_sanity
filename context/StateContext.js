import React from 'react'
import { useEffect,createContext,useContext,useState} from 'react'
import { toast } from 'react-hot-toast';

const Context = createContext();

//we have the {children} data from _app.js file its default {children} store all components data 
 const StateContext = ({children}) => {

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);

    const [qty, setQty] = useState(1);

    let foundProduct;
    
    let index;
    
    //for add the item in cart 
    const onAdd = (product, quantity) => {

        product.quantity = 1;
//check the same item is exist in acart
        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        
        // if same item is exist than increment qty
        if(checkProductInCart) {
            setCartItems (cartItems.map((cartProduct) => 
                cartProduct._id === product._id ? {
                    ...checkProductInCart,
                    quantity: cartProduct.quantity + 1
                }:cartProduct
                )
                );
        } else {
          product.quantity = 1;
          
          setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
      } 

// for remove the item from the cart

      const onRemove = (product) => {

        //faind wich product we want to remove 
        foundProduct = cartItems.find((item) => item._id === product._id);
       //filter the froduct from the satate user want to remove 
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        //decrement the price user wants to remove with total price 
        setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
      }

   //increment and decrement qty from the cart
      const toggleCartItemQuanitity = (id, value) => {
          //faind the product wants to change the qty
        foundProduct = cartItems.find((item) => item._id === id)

  //for  update the item data of increment and decrement
  // const newCartItems = cartItems.filter((item) => item._id !== id)
        if(value === 'inc') {
            if(foundProduct){
                let updatetedqty = cartItems.map((item) =>
                item._id === id ?
                { ...foundProduct , quantity: foundProduct.quantity + 1 } : item
            )
          setCartItems(updatetedqty);
          setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
          setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
            }

        } else if(value === 'dec') {
          if (foundProduct.quantity > 1) {
            let updatetedqty = cartItems.map((item) =>
            item._id === id ?
            { ...foundProduct , quantity: foundProduct.quantity - 1 } : item
        )
            setCartItems(updatetedqty);
            setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
          }
        }
      }

      //for increse qty   
   const incQty = () => {
    setQty((prevQty) => prevQty + 1 );
 }

//for decrise qty    
const decQty = () => {

    setQty((prevQty) =>{
        //foer qty is not decrese more than 1
        if(prevQty - 1 < 1 ) return 1 ;
        return prevQty -1;
    }    
);
}

return (
    
// const product = 10
    <Context.Provider 
     value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        setQty,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities 
      }}
    >
        {children}
        </Context.Provider>
        
        )
}

//for use this compontnt in other component
export default StateContext;
//for use this components data in other components
export const useStateContext = () => useContext(Context);
