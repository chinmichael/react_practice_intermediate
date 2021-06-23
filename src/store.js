import { combineReducers, createStore } from 'redux';

let cart_state = [
    { id: 10, name: "niku", quantity: 2 },
    { id: 11, name: "addidos", quantity: 4 },
    { id: 12, name: "guma", quantity: 3 }
];

function reducer(state = cart_state, action) {

    let updatedState = [...state];
    let data = { ...action.payload };

    if (action.type === 'shipping') {
        let product = updatedState.find(e => e.id === data.id);
        if (product == null) {
            updatedState.push(data);
        } else {
            product.quantity++;
        }
        return updatedState;

    } else if (action.type === 'quanIncrese') {
        updatedState.find(e => e.id === data.id).quantity++;
        return updatedState;

    } else if (action.type === 'quanDecrese') {

        let product = updatedState.find(e => e.id === data.id);

        if (product.quantity > 0) {
            product.quantity--;
        }
        return updatedState;

    } else {
        return state;
    }
}

let alert_state = true; // 근데 한 컴포넌트 파일에서만 존재하는 데이터를 저장하는 용으로는 매우 안좋은 그냥 useState()를 쓰는게 낫다.

function alertReducer(state = alert_state, action) {
    let update = state;

    switch (action.type) {
        case 'on':
            update = true;
            return update;
        case 'off':
            update = false;
            return update;
        default:
            return state;
    }
}

let store = createStore(combineReducers({ reducer, alertReducer }));

export default store;

