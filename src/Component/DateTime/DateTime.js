import React, { useEffect, useState } from 'react';

export default function DateTime() {
    const [state, setState] = useState({
        curTime: null
    })
    useEffect(() => {
        setInterval(() => {
            setState({
                curTime: new Date().toLocaleString()
            })
        }, 1000)
    }, [])
    return (
        <p style={{color:'chocolate'}}>{state.curTime}</p>
    )
}
