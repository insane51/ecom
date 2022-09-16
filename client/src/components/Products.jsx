import { useEffect, useState } from "react";
import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const getProductApi = "http://127.0.0.1:5000/api/products";


  //CATEGORY PRODUCTS
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat ? `${getProductApi}?category=${cat}` : getProductApi
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  //FILTER PRODUCTS
  useEffect(() => {
    cat &&
      setFilterProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(()=>{
    if(sort === 'new'){
      setFilterProducts(prev =>
        [...prev].sort((a,b)=> a.CreatedAt - b.CreatedAt)
        );
    }else if(sort === 'asc'){
      setFilterProducts(prev =>
        [...prev].sort((a,b)=> a.price - b.price)
        );
    }else  if(sort === 'dec'){
      setFilterProducts(prev =>
        [...prev].sort((a,b)=> b.price - a.price)
        );
    }
  },[sort]);



  return (
    <Container>
      { cat? filterProducts.map((item) => (<Product item={item} key={item._id} />)) 
      : products
          .slice(0,8)
          .map((item) => (<Product item={item} key={item._id} />))}
    </Container>
  );
};

export default Products;
