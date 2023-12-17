import React from 'react'
import styled from 'styled-components'

const NamesDropdownSelect = styled.select`
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    color: #333;
    font-size: 14px;
    transition: border-color 0.3s;

    &:focus {
        outline: none;
        border-color: #007bff;
    }
`
interface User {
    id: {
        value: string
    }
}

interface NameDropdownProps {
    allNames: string[]
    isLevelOver: boolean
    setCurrentName: (name: string) => void
    handleOnChange: (name: string, id: string) => void
    user: User
}

export default function NameDropdown(props: NameDropdownProps) {
    const [selectedName, setSelectedName] = React.useState('')

    // Sort the names in asc order, so it's not the same order as what the images were in originally.
    // Just so the players don't memorize the order.
    const sortedNames = props.allNames.slice().sort()
    const dropdownNames = sortedNames.map((name, index) => (
        <option key={index} value={name}>
            {name}
        </option>
    ))

    return (
        <React.Fragment>
            <NamesDropdownSelect
                disabled={props.isLevelOver}
                value={selectedName}
                onChange={(event) => {
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
            </NamesDropdownSelect>
        </React.Fragment>
    )
}
