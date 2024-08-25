export default function ProductPage({ params }: {
    params: {product: number}; 
}) {
    return (
        <h1>{params.product}</h1>
    )
}