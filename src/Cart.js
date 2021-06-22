import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

function Cart(props) {
    return (
        <div>
            <Table responsive="lg">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.state.map((element, key) => {
                            return (
                                <tr>
                                    <td>{element.id}</td>
                                    <td>{element.name}</td>
                                    <td>{element.quantity}</td>
                                    {/* <td><Button variant="warning" onClick={() => { props.dispatch({ type: 'quanIncrese', id: element.id }) }}>+</Button></td> */}
                                    <td><Button variant="warning" onClick={() => { props.dispatch({ type: 'quanIncrese' }) }}>+</Button>
                                        &nbsp;
                                        <Button variant="danger" onClick={() => { props.dispatch({ type: 'quanDecrese' }) }}>-</Button></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

function store(state) {
    return {
        state: state.reduer,
        state_modal: state.modalReducer,
    }
}

export default connect(store)(Cart);

//export default Cart;