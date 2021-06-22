import { combineReducers, createStore } from 'redux';

let cart_state = [
    { id: 0, name: "niku", quantity: 2 },
    { id: 1, name: "addidos", quantity: 4 },
    { id: 2, name: "guma", quantity: 3 }
];

function reducer(state = cart_state, action) {

    if (action.type === 'quanIncrese') {

        let updatedState = [...state];
        //let idx = updatedState.findIndex(x => { x.id == id });

        updatedState[0].quantity++;
        return updatedState;

    } else if (action.type === 'quanDecrese') {

        let updatedState = [...state];
        if (updatedState[0].quantity > 0) {
            updatedState[0].quantity--;
        }
        return updatedState;

    } else {
        return state;
    }
}

let modal_state = false;

function modalReducer(state = modal_state, action) {
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

let store = createStore(combineReducers({ reducer, modalReducer }));

export default store;

