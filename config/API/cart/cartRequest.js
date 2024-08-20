import {currentCartId, getCurrentCartId, setCurrentCartId} from '@/config/data'

export async function AddProductToCart({userId, productId}) {
    try {
        //first we check if theres an active cart for the user and if there is then we use its id and if not then we create one
        const response1 = await CheckUserCartStatus({userId: userId})

        let cartId = getCurrentCartId()

        if (response1) {
            try {
                const response = await fetch(
                    'http://localhost:3000/api/cart/addToCart',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            Carts_cart_id: cartId,
                            Carts_User_user_id: userId,
                            Products_product_id: productId,
                        }),
                    }
                )

                const data = await response.json()

                return data
            } catch (error) {
                //alert(error.response.data.error);
                console.log(error)
            }
        }
    } catch (e) {}
}

export async function CheckUserCartStatus({userId}) {
    try {
        console.log('Entered signup func')
        const response = await fetch(
            `http://localhost:3000/api/cart/checkIfActive?id=${userId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        const data = await response.json()

        console.log(data.message)

        if (data.cart_id) {
            setCurrentCartId(data.cart_id)
            return data
        } else {
            const response2 = await CreateNewCart({userId: userId})

            if (response2) {
                setCurrentCartId(response2.insertId)
                return response2
            } else {
                return null
            }
        }

        return null
    } catch (error) {
        //alert(error.response.data.error);
        console.log(error)
    }
}

export async function CreateNewCart({userId}) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/cart/createNewCart`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    User_user_id: userId,
                }),
            }
        )

        const data = await response.json()

        console.log(data.message)

        if (data) {
            return data
        }

        return null
    } catch (error) {
        //alert(error.response.data.error);
        console.log(error)
    }
}

export async function GetAllActiveCartItems({cartId}) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/cart/getAllCartItems?id=${cartId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        const data = await response.json()

        if (data) {
            return data
        }

        return null
    } catch (error) {
        //alert(error.response.data.error);
        console.log(error)
    }
}
