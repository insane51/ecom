import styled from "styled-components";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({margin:'0px 20px', display:'flex',flexDirection:'column'})};
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({margin:'0px 1px'})}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({margin:'10px 0px'})}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split('/')[2];
  const [filters , setFilters] = useState({});
  const [sort , setSort] = useState('new');

  const handleCat = (e)=>{
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]:value,
    })
  }

  return (
    <Container>
      <Navbar />
      <TopBar />
      <Title>Mobiles</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleCat}>
            <Option disable default>
              Color
            </Option>
            <Option>Black</Option>
            <Option>White</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Purple</Option>
          </Select>
          <Select name="variant" onChange={handleCat}>
            <Option disable default>
              Variant
            </Option>
            <Option>4+32GB</Option>
            <Option>4+64GB</Option>
            <Option>6+64GB</Option>
            <Option>6+128GB</Option>
            <Option>8+128GB</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e)=>setSort(e.target.value)} >
            <Option value='new' default>Newest</Option>
            <Option value='asc' >Price (asc)</Option>
            <Option value='dec' >Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>

      <Products cat={cat} filters ={filters} sort ={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
