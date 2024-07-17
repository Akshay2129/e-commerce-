import React from "react";

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);

    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        setError(false);

        console.warn(name, price, category, company);
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user ? user._id : null;
        if (!userId) {
            console.error("User ID not found");
            return;
        }

        let result = await fetch("http://127.0.0.1:5000/addProduct", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price, category, company, userId })
        });
        result = await result.json();
        console.log(result);
    }

    return (
        <div className="product">
            <h2>Add Product</h2>
            <input type="text" className="inputBox" placeholder="Enter product name"
                onChange={(e) => setName(e.target.value)} value={name}
            />
            {error && !name && <span className="invalid">Enter valid name</span>}

            <input type="text" className="inputBox" placeholder="Enter product price"
                onChange={(e) => setPrice(e.target.value)} value={price}
            />
            {error && !price && <span className="invalid">Enter valid price</span>}

            <input type="text" className="inputBox" placeholder="Enter product category"
                onChange={(e) => setCategory(e.target.value)} value={category}
            />
            {error && !category && <span className="invalid">Enter valid category</span>}

            <input type="text" className="inputBox" placeholder="Enter product company"
                onChange={(e) => setCompany(e.target.value)} value={company}
            />
            {error && !company && <span className="invalid">Enter valid company</span>}

            <button className="appButton" onClick={addProduct}>Add Product</button>
        </div>
    );
};

export default AddProduct;
