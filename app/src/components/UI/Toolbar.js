import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

function Toolbar(props) {
    const [activeItem, setActiveItem] = useState('')
    

    const handleClickHandler = (e, { name }) => {
        setActiveItem(name)
        props.history.push(name)
    }

    return (
        <Menu>
            {props.items.map(i => (
                <Menu.Item 
                    key={i.key} 
                    name={i.key}
                    active={activeItem === i.key} 
                    content={i.name} 
                    onClick={handleClickHandler}
                />
            ))}
        </Menu>
    )
}

export default withRouter(Toolbar);
