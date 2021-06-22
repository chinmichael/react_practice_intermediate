/* eslint-disable */
import './Detail.scss'; // css import는 그냥 이렇게 경로만

import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import styled from 'styled-components';

//import { stockContext, stockChangeContext } from './App.js';
import { stockContext } from './App.js';

import { CSSTransition } from 'react-transition-group';

const TitleBox = styled.div`
    padding : 20px;
`;
const TitleParam = styled.h4`
    font-size : 25px;
    color : ${props => props.titleColor}
`;

function Detail(props) { // props가 아니라 여기에 data.js를 import해도 되나, 중요 데이터는 root인 App에 저장하는게 정석

    let [alertIf, alertDelete] = useState(true);
    let [tempInput, tempChange] = useState('');

    let stock = useContext(stockContext);
    //let stockChange = useContext(stockChangeContext);

    let [tab, tabChange] = useState(0);
    let [tabBtn, tabBtnChange] = useState(['tab-selected', '']);
    let [tabAni, tabAniSwitch] = useState(false);

    function changeTab(num) {
        tabChange(num);
        let temp = ['', '', ''];
        temp[num] = 'tab-selected';
        tabBtnChange(temp);
    }

    useEffect(() => {
        console.log('useEffect test');
        let timer = setTimeout(() => { // setTimeout()은 변수로 저장하는 경우가 많음 (삭제하거나 할 상황들이 생기기 때문에)
            alertDelete(false);
        }, 3000);

        return () => { clearTimeout(timer); }
    }, [alertIf]);

    //let cnt = 1;
    let history = useHistory(); // useState같은 hook과 같은 것 >> history변수 안에 방문기록 오브젝트가 들어감

    const { id } = useParams(); // uesParmas()로 저장된 Object를 destructing 문법으로 변수로 저장함
    //let index = id - 1;
    // 근데 props 데이터의 인덱스를 사용하면 App에서 정렬을 했을때 데이터 순서가 바뀌므로 URL이 가리키는 페이지가 달라져 위험함
    // pk가 될 수 있는 값을 활용한다.

    // java처럼 indexOf(데이터, fromIndex), lastIndexOf(데이터, fromIndex)를 사용한다
    // 객체 배열의 경우 findIndex(콜백함수)를 사용한다. >> callback(elements, index, array) 각 인자는 사용된 배열에서 받아온다.
    // findIndex도 반환값은 판별함수 만족 index (없으면 -1) + 찾자마자 바로 반환
    //const index = props.product.findIndex(x => x.id == (id - 1));

    // 만약 해당 Object를 직접 찾는다면 find() 함수 사용
    const each_product = props.product.find(x => x.id == (id - 1)); // index가 아닌 해당 element가 반환
    const index = props.product.findIndex(x => x.id == (id - 1));

    const nodeRef = React.useRef(null);

    return (
        <Container style={{ textAlign: 'center' }}>
            <input type='text' onChange={(e) => { tempChange(e.target.value) }} />
            <div>{tempInput}</div>
            <TitleBox>
                <TitleParam titleColor="red">Detail</TitleParam>
                {/* titleColor={ }로 데이터 바인딩도 가능 */}
            </TitleBox>
            {
                alertIf === true
                    ? (<div className="my-alert-red">
                        <p>재고가 얼마 남지 않았습니다.</p>
                    </div>)
                    : null
            }

            {/* <Row>
                <Col md={6}>
                    <img src={`https://codingapple1.github.io/shop/shoes${id}.jpg`} width="100%"></img>
                </Col>
                <Col md={6} className="mt-4">
                    <h4 className="pt-5">{props.product[index].title}</h4>
                    <p>{props.product[index].content}</p>
                    <p>{props.product[index].price} 원</p>
                    <Button variant="danger">Shipping</Button> &nbsp;
                    <Button variant="warning" onClick={() => { history.goBack() }}>Go Back</Button>
                </Col>
            </Row> */}

            <Row>
                <Col md={6}>
                    <img src={`https://codingapple1.github.io/shop/shoes${id}.jpg`} width="100%"></img>
                </Col>
                <Col md={6} className="mt-4">
                    <h4 className="pt-5">{each_product.title}</h4>
                    <p>{each_product.content}</p>
                    <p>{each_product.price} 원</p>
                    <p>재고 : {stock.stock[index]}</p>
                    {/* <ProductStock
                        stock={props.stock[index]}
                    ></ProductStock> */}

                    <Button variant="danger" onClick={() => {
                        // let temp = [...props.stock];
                        // temp[index]--;

                        // props.stockChange(temp);
                        let temp = [...stock.stock];
                        temp[index]--;
                        stock.stockChange(temp);
                    }}>Shipping</Button> &nbsp;

                    <Button variant="warning" onClick={() => { history.goBack() }}>Go Back</Button>
                </Col>
            </Row>

            {/* { // 식별자를 사용
                props.product.map((a, i) => {
                    return (
                        <Row>
                            <Col md={6}>
                                <img src={`https://codingapple1.github.io/shop/shoes${i + 1}.jpg`} width="100%"></img>
                            </Col>
                            <Col md={6} className="mt-4">
                                <h4 className="pt-5">{a.title}</h4>
                                <p>{a.content}</p>
                                <p>{a.price} 원</p>
                                <Button variant="danger">Shipping</Button> &nbsp;
                                <Button variant="warning" onClick={() => { history.goBack() }}>Go Back</Button>
                            </Col>
                        </Row>
                    );
                })
            } */}

            <div className="tab-container">
                <div className="tab-flex">
                    <div className={"tab-btn" + " " + tabBtn[0]} onClick={() => { changeTab(0); tabAniSwitch(false); }}>상품설명</div>
                    <div className={"tab-btn" + " " + tabBtn[1]} onClick={() => { changeTab(1); tabAniSwitch(false); }}>배송정보</div>
                    <div className='tab-remain'></div>
                </div>
                {/* <div style={{ clear: "both" }}></div> */}
                <div className="tab-contents">
                    <CSSTransition nodeRef={nodeRef} in={tabAni} classNames="tab-ani" timeout={1000}>
                        <TabContents tab={tab} switch={tabAniSwitch}></TabContents>
                    </CSSTransition>
                </div>
            </div>

            {/* 그냥 공부할 겸 tab 간단히 직접 구현해봄 */}

            {/* <Nav mt={5} variant="tabs" defaultActiveKey="0">
                <Nav.Item>
                    <Nav.Link eventKey="0">Option1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="1">Option2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="2">Option3</Nav.Link>
                </Nav.Item>
            </Nav> */}

        </Container >
    );
}

const ProductStock = (props) => {
    return (
        <div>
            <p>재고 : {props.stock}</p>
        </div>
    );
}

const TabContents = (props) => {

    useEffect(() => {
        props.switch(true);
    })

    switch (props.tab) {
        case 0:
            return (
                <div>tab 1</div>
            );
        case 1:
            return (
                <div>tab 2</div>
            )
        default:
            return (
                <div>tab 3</div>
            );

    }
}

export default Detail;

