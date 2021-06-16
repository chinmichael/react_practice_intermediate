/* eslint-disable */

import './App.css';
import React from 'react';
import { useState } from 'react';

import { Link, Route, Switch } from 'react-router-dom'

import { Navbar, Nav, Jumbotron, Button, Container, Row, Col } from 'react-bootstrap'
import { product } from './ref/data.js'
import { countBy } from 'lodash';

function App() {

  let [product_data, product_change] = useState(product);

  function product_list() {
    let list = [];
    list.length = product_data.length;

    for (let i = 0; i < product_data.length; i++) {
      let imgUrl = `https://codingapple1.github.io/shop/shoes${i + 1}.jpg`;

      list[i] =
        <Col md={4} key={i}>
          <img src={imgUrl} width="100%"></img>
          <h4>{product_data[i].title}</h4>
          <p>{product_data[i].content} & {product_data[i].price}</p>
        </Col >
    }

    return list;
  }

  return (
    <div className="App">
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="#home">React Ex</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Detail</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Route exact path='/'>

        <Jumbotron className="background" style={{ textAlign: 'center', }}>
          <h1>20% Season off</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>

        <Container style={{ textAlign: 'center', }}>
          <Row>

            {/* {product_list()} */}
            {/* 실행을 위해 ()을 붙이는거 유의 아래는 map으로 처리한 경우 */}

            {/* {product.map((pro_data, i) => {
            return (
              <Col md={4}>
                <img src={`https://codingapple1.github.io/shop/shoes${i + 1}.jpg`} width="100%"></img>
                <h4>{pro_data.title}</h4>
                <p>{pro_data.content} & {pro_data.price}</p>
              </Col>
            )
          })} */}

            {/* 최종적으로 map(혹은 for문으로 해도 됨 map이 더 직관적) + props + 컴포넌트 이용 */}
            {
              product.map((pro_list, i) => {
                return (
                  <ProductList pro_list={pro_list} cnt={i + 1} key={i}></ProductList>
                )
              })
            }


            {/* <Col md={4}>
            <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%"></img>
            <h4></h4>
            <p></p>
          </Col>
          <Col md={4}>
            <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="100%"></img>
            <h4></h4>
            <p></p>
          </Col>
          <Col md={4}>
            <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="100%"></img>
            <h4></h4>
            <p></p>
          </Col> */}
            {/* 오랜만의 보는 부트스트랩 기본 반응형 문법 : container랑 row로 감싸고 col을 총 12가 되게 나눔 (md, lg등은 기준) */}
          </Row>
        </Container>

      </Route>


      <Route path='/detail'>
        <ProductDetail></ProductDetail>
      </Route>

    </div >
  );
}

function ProductList(props) {
  return (
    <Col md={4}>
      <img src={`https://codingapple1.github.io/shop/shoes${props.cnt}.jpg`} width="100%"></img>
      <h4>{props.pro_list.title}</h4>
      <p>{props.pro_list.content} & {props.pro_list.price}</p>
    </Col>
  );
}

function ProductDetail(props) {
  let cnt = 1;

  return (

    <Container style={{ textAlign: 'center' }}>
      <Row>
        <Col md={6}>
          <img src={`https://codingapple1.github.io/shop/shoes${cnt}.jpg`} width="100%"></img>
        </Col>
        <Col md={6} className="mt-4">
          <h4>title</h4>
          <p>content</p>
          <p>price 원</p>
          <Button variant="danger">Shipping</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
