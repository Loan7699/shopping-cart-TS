import { createContext, useContext, useState, ReactNode } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

type ShoppingCartProviderProps = {
    children: ReactNode,
}

type CartItems = {
    id: number,
    quantity: number
}

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number,
    increaseCartQuantity: (id: number) => void,
    decreaseCartQuantity: (id: number) => void,
    removeFromCart: (id: number) => void
    cartItems: CartItems[]
    openCart: () => void,
    closeCart: () => void,
    cartQuantity: number
    isOpenCart: boolean,
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<CartItems[]>("shopping-cart", [])
    const [isOpenCart, setIsOpenCart] = useState(false)

    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    const increaseCartQuantity = (id: number) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) === undefined) {
                return [
                    ...currItems,
                    { id, quantity: 1 }
                ]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    } else {
                        return item
                    }
                })
            }
        }
        )
    }

    const decreaseCartQuantity = (id: number) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        }
                    } else {
                        return item
                    }
                })
            }
        }
        )
    }

    const removeFromCart = (id: number) => {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    const openCart = () => {
        setIsOpenCart(true)
    }

    const closeCart = () => {
        setIsOpenCart(false)
    }

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    return (
        <ShoppingCartContext.Provider value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, openCart, closeCart, cartQuantity, isOpenCart, cartItems }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}