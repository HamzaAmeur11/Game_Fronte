import React, { useContext, useEffect } from 'react'
import { userContext } from '../Contexts/userContext'

const Test = () => {
    const { user, test } = useContext(userContext)
    useEffect(() => {
        test({
            level: 12, name: 'ronin', rank: 1000000000, userName: " ajaidi"
        })
    }, [])
    return (
        <div>Test</div>
    )
}

export default Test