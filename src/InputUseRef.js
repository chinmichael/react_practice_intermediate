import React, { useState, useRef } from 'react';
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
        </div>
    );

}

export default InputUseRef;