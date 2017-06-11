import React from 'react'

import Color from '../Color'

export default class Square extends React.Component {
    render () {
        let {color, onSelect} = this.props

        let size = 30
        let style = {
            backgroundColor: color.getRgb(),
            width: size + 'px',
            height: size + 'px',
            float: 'left',
            margin: '10px',
            border: '3px solid #666'
        }

        return <div style={style} onClick={onSelect}></div>;
    }
}