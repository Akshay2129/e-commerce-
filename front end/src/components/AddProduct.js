import React, { useState } from "react";

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false);

    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return;
        }
      
     

        try {
            const response = await fetch("http://localhost:5000/addProduct", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, price, category, company,  })
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    }

    return (
        <div className="product">
            <h2>Add Product</h2>
            <input
                type="text"
                className="inputBox"
                placeholder="Enter product name"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            {error && !name && <span className="invalid">Enter valid name</span>}

            <input
                type="text"
                className="inputBox"
                placeholder="Enter product price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
            />
            {error && !price && <span className="invalid">Enter valid price</span>}

            <input
                type="text"
                className="inputBox"
                placeholder="Enter product category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
            />
            {error && !category && <span className="invalid">Enter valid category</span>}

            <input
                type="text"
                className="inputBox"
                placeholder="Enter product company"
                onChange={(e) => setCompany(e.target.value)}
                value={company}
            />
            {error && !company && <span className="invalid">Enter valid company</span>}

            <button className="appButton" onClick={addProduct}>Add Product</button>
        </div>
    );
};

export default AddProduct;
