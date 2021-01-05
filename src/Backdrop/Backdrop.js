import React from 'react'

import classes from './Backdrop.Module.css'

const backdrop = (props)=>(
props.show ? <div className={classes.Backdrop} onClick={props.clicked}>{props.children}</div> : "Abu sufiay"
)

export default backdrop