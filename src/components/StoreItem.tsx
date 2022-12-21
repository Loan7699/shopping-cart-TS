import { Card, Button } from 'react-bootstrap'
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';

type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string,
}

function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, openCart, closeCart, cartQuantity } = useShoppingCart()
    const quantity: number = getItemQuantity(id)

    return (
        <Card>
            <Card.Img src={imgUrl} height='200px' style={{ objectFit: 'cover' }} />
            <Card.Body>
                <Card.Title className='d-flex justify-content-between'>
                    <span>{name}</span>
                    <span>{formatCurrency(price)}</span>
                </Card.Title>
                {quantity === 0
                    ? (
                        <Button variant="primary" className='w-100 mt-2' onClick={() => increaseCartQuantity(id)}>Add to cart</Button>
                    )
                    : (
                        <div>
                            <div className='mb-2'>
                                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                                <span className='mx-2'>{quantity} in cart</span>
                                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                            </div>
                            <Button variant='danger' onClick={() => removeFromCart(id)}>Remove</Button>
                        </div>
                    )
                }
            </Card.Body>
        </Card>
    );
}

export default StoreItem;