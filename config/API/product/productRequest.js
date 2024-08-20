export async function GetProductDetails({id}) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/shop/products/${id}?id=${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        const data = await response.json()

        console.log('RESPONSESSSS')
        console.log(data.product_id)

        console.log(data.message)

        return data
    } catch (error) {
        //alert(error.response.data.error);
        console.log(error)
    }
}
