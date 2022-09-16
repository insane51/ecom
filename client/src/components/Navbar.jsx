import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import React
// ,{ useEffect, useState } 
from "react";
import { useSelector } from "react-redux";
import { Link,
  //  Navigate, useNavigate
   } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 60px;
  ${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  ${mobile({ padding: "10px 0px" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-content: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  margin: auto 0px;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  height: 100%;
  &:focus {
    border: none;
    outline: none;
  }
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: 600;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-content: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: "center", flex: 2 })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  console.log(quantity);
  const user = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    console.log("logout");
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search
              style={{ color: "grey", fontSize: 16, cursor: "pointer" }}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <Logo>MyShop</Logo>
          </Link>
        </Center>
        <Right>
          {!user && (
            <>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/register"
              >
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/login"
              >
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          )}
          {user && (
            <MenuItem onClick={handleLogout} style={{ fontWeight: "bold" }}>
              LOGOUT {user.username}
            </MenuItem>
          )}

          {user && (
            <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
              <MenuItem>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
