import React, { useState, useRef, useEffect, memo } from 'react';
import { Button } from 'react-bootstrap';

const InputUseRef = () => {

    const [sampleInput, setSampleInput] = useState({
        name: '',
        nick: ''
    });

    const nameInputRef = useRef();

    const { name, nick } = sampleInput; // destructing은 이렇게 우리가 만든 오브젝트에서 key로 변수를 편히 뽑아올 때도 잘 사용한다.

    const changeInputState = (e) => {
        const { value, name } = e.target;

        const temp = { ...sampleInput, [name]: value };

        setSampleInput(temp);
    };

    const resetAndFocus = () => {
        setSampleInput({
            name: '',
            nick: ''
        });
        nameInputRef.current.focus();
    };

    return (
        <div>
            <input name="name" placeholder="Name" onChange={changeInputState} ref={nameInputRef} value={name} />
            <input name="nick" placeholder="NickName" onChange={changeInputState} value={nick} />
            <Button variant="success" onClick={resetAndFocus}>Reset</Button>

            <div style={{ height: "50px" }}></div>
            <Parent name="Chin" age="29"></Parent>
        </div>
    );

}

const Parent = (props) => {
    return (
        <div>
            <Child1 name={props.name}></Child1>
            <Child2 age={props.age}></Child2>
        </div>
    )
}

const Child1 = (props) => {
    useEffect(() => { console.log('Child1랜더링') });
    return <div>{props.name}</div>
}

const Child2 = memo((props) => {
    useEffect(() => { console.log('Child2랜더링') });
    return <div>{props.age}</div>
});

export default InputUseRef;