
import { Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

function Cart(props) {
    return (
        <div>
            {
                props.state_alert === true
                    ? <AlertModal store={props}></AlertModal>
                    : null
            }
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
                                <tr key={key}>
                                    <td>{element.id}</td>
                                    <td>{element.name}</td>
                                    <td>{element.quantity}</td>
                                    {/* <td><Button variant="warning" onClick={() => { props.dispatch({ type: 'quanIncrese', id: element.id }) }}>+</Button></td> */}
                                    <td><Button variant="warning" onClick={() => { props.dispatch({ type: 'quanIncrese', payload: { id: element.id } }) }}>+</Button>
                                        &nbsp;
                                        <Button variant="danger" onClick={() => { props.dispatch({ type: 'quanDecrese', payload: { id: element.id } }) }}>-</Button></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </div>
    );
}

const AlertModal = (props) => {
    return (
        <div className="my-alert-cart">
            <button className="close" onClick={() => { props.store.dispatch({ type: 'off' }) }}>X</button>
            <p>지금 구매하면 신규할인 20%</p>
        </div>
    );
}

function store(state) {
    return {
        state: state.reducer,
        state_alert: state.alertReducer,
    }
}

export default connect(store)(Cart);

//export default Cart;