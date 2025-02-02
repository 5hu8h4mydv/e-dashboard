import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ProducList = () => {

    const [products, setProduct] = useState([])

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProduct(result);
    }

    const searchHandle = async (event) => {
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`)
        result = await result.json();
        if(result){
            setProduct(result);
        }
        }
        else{
            getProducts();
        }
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        })
        result = await result.json();
        if (result) {
            getProducts();
        }

    }

    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input className="search-product-box" type="text" placeholder="search product"
                onChange={searchHandle} />
            <ul>
                <li>S.No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
               products.length>0? products.map((item, index) =>
                    <ul key={item}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/" + item._id}>Update</Link>
                        </li>

                    </ul>):
                    <h1>No result Found</h1>
            }
        </div>
    )
}

export default ProducList;