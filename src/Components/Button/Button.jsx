import React from 'react'

const Button = ({ styles, text, type, prop }) => {
    return (
        <button type={type} className={styles}>{text}</button>
    )
}

export default Button
