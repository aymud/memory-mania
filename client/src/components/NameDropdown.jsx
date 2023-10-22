import React from 'react';

export default function NameDropdown(props) {
    const [selectedName, setSelectedName] = React.useState('');

    // Sort the names in asc order, so it's not the same order as what the images were in originally.
    // Just so the players don't memorize the order.
    const sortedNames = props.allNames.slice().sort();
    const dropdownNames = sortedNames.map((name, index) => <option key={index} value={name}>{name}</option>)

    return (<React.Fragment>
        <select className={"names-dropdown"}
                disabled={props.isLevelOver}
                value={selectedName}
                onChange={event => {
                    let name = event.target.value
                    setSelectedName(name)
                    // Clean up name input before saving it for future validation.
                    name = name.trim().toLowerCase()
                    props.setCurrentName(name)
                    props.handleOnChange(name, props.user.id.value)
                }}
        >
            <option value="">Select a name</option>
            {dropdownNames}
        </select>
    </React.Fragment>);
}