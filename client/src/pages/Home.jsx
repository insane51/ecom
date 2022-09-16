import React from "react";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import TopBar from "../components/TopBar";
import Footer from '../components/Footer'
import styled from "styled-components";

const Container = styled.div`
 ::-webkit-scrollbar {
          display: none;
      }
`;

const Home = () => {
  return (
    <Container>
      <TopBar />
      <Navbar  />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Home;
