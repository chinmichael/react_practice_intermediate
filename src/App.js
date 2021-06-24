/* eslint-disable */
import './App.css';
import React from 'react';
import { useState, useContext } from 'react';

import { Link, Route, Switch, useHistory } from 'react-router-dom'

import { Navbar, Nav, Jumbotron, Button, Container, Row, Col } from 'react-bootstrap'
import { product } from './ref/data.js'
import Detail from './Detail.js';
import Cart from './Cart.js';
import InputUseRef from './InputUseRef';

import axios from 'axios';
import { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass } from '@fortawesome/free-solid-svg-icons'

export let stockContext = React.createContext();
//export let stockChangeContext = React.createContext();

function App() {
  let [original, originalChange] = useState(product);
  let [product_data, product_change] = useState(original);
  let [loading, loadingChange] = useState(false);

  let [stock, stockChange] = useState([10, 11, 12]);

  let timer;

  useEffect(() => {
    return () => { clearTimeout(timer) };
  }, [])

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
      {
        loading === true
          ? <LoadingModal></LoadingModal>
          : null
      }

      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="#home">React Ex</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link><Link className="router-link" to="/">Home</Link></Nav.Link>
            <Nav.Link><Link className="router-link" to="/detail/1">Detail</Link></Nav.Link> */}
            <Nav.Link as={Link} to="/" className="router-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/detail/1" className="router-link">Detail</Nav.Link>
            <Nav.Link as={Link} to="/cart" className="router-link">Cart</Nav.Link>
            <Nav.Link as={Link} to="/test" className="router-link">test</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>

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

            <stockContext.Provider value={stock}>

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
                  product_data.map((pro_list, i) => {
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

            </stockContext.Provider>

            <Button variant="primary" onClick={() => {

              loadingChange(true);

              axios.get('https://codingapple1.github.io/shop/data2.json')
                .then(result => {
                  //let newProduct = result.data;
                  //console.log(newProduct);

                  // let list = [...original];
                  // newProduct.map((element) => {
                  //   list.push(element);
                  // });
                  let list = [...original, ...result.data]; // 이런식으로 한번에 합칠 수도 있다.

                  //console.log(list);
                  product_change(list);
                  timer = setTimeout(() => { loadingChange(false) }, 3000);
                })
                .catch((err) => {
                  console.error('요청 오류', err);
                  loadingChange(false);
                });
            }}>더보기</Button>
          </Container>
        </Route>

        <Route path="/detail/:id">
          <stockContext.Provider value={{ stock: stock, stockChange: stockChange }}>
            {/* <stockChangeContext.Provider value={stockChange}> */}
            <Detail product={product_data}
            // stock={stock} stockChange={stockChange}
            ></Detail>
            {/* </stockChangeContext.Provider> */}
          </stockContext.Provider>
        </Route>

        {/* <Route path="/:id">
          <div>임시</div>
        </Route> */}

        <Route path="/cart">
          <Cart></Cart>
        </Route>

        <Route path="/test">
          <InputUseRef></InputUseRef>
        </Route>

      </Switch>

    </div >
  );
}

function ProductList(props) {

  let history = useHistory();

  //let stock = useContext(stockContext);

  return (
    <Col md={4} onClick={() => { history.push(`/detail/${props.pro_list.id + 1}`) }} style={{ cursor: 'pointer' }}>
      <img src={`https://codingapple1.github.io/shop/shoes${props.cnt}.jpg`} width="100%"></img>
      {/* <Link to={`/detail/${props.pro_list.id + 1}`}><h4>{props.pro_list.title}</h4></Link> */}
      <h4>{props.pro_list.title}</h4>
      <p>{props.pro_list.content} & {props.pro_list.price}</p>
      <Test index={props.cnt - 1}></Test>
    </Col>
  );
}

function LoadingModal() {
  return (
    <div className="loading-back">
      <div className="loading-window">
        <FontAwesomeIcon icon={faCompass} className="loading-icon" />
        <h4>Now Loading...</h4>
      </div>
    </div >
  )
}

const Test = (props) => {
  let stock = useContext(stockContext);

  return (
    <p>재고 : {stock[props.index]}</p>
  )
}

export default App;
