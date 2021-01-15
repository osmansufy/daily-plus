import React from 'react';

function ButtonLink(props) {
    return (
    <a onClick={props.clicked} style={{padding: '5px', color: '#000'}} id="nav-link " className="nav-link sidebar-toggle"  role="button">{props.children}</a>
    );
}

export default ButtonLink;