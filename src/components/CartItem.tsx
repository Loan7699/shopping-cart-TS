import { Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from '../data/items.json'
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
    id: number,
    quantity: number
}

function CartItem({ id, quantity }: CartItemProps) {
    const { removeFromCart } = useShoppingCart()
    const item = storeItems.find(item => item.id === id)
    if (item === undefined) return null
    return (
        <Stack direction="horizontal">
            <img src={item.imgUrl} style={{ height: '100px', width: '150px', objectFit: 'cover' }} />
            <div className="d-flex">
                <div className="ms-2 me-5">
                    <div>{`${item.name} x ${quantity}`}</div>
                    <div>{formatCurrency(item.price)}</div>
                </div>
                <div className="d-flex">
                    <div className="me-2">{formatCurrency(item.price * quantity)}</div>
                    <Button onClick={() => removeFromCart(id)} variant="outline-secondary" className="">x</Button>
                </div>
            </div>
        </Stack >
    );
}

export default CartItem;