import React, { useEffect, useState } from "react";

const Productlist = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []); 

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products");
        result = await result.json();
        setProducts(result);
    };

    const deleteProduct = async (id) => {
        console.warn(id);
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "delete"
        });
        result = await result.json();
        if (result) {
            // getProducts(); 
            alert("record is delete")
        }
    };

    console.log(products);

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {products.map((product, index) => (
                <ul key={index}>
                    <li>{index + 1}</li>
                    <li>{product.name}</li>
                    <li>{product.price}</li>
                    <li>{product.category}</li>
                    <li><button onClick={() => deleteProduct(product._id)}>Delete</button></li>
                </ul>
            ))}
        </div>
    );
};

export default Productlist;
