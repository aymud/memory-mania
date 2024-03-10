import { FiMenu } from 'react-icons/fi'
import styled from 'styled-components'

interface NavbarProps {
    level: number
}
const NavbarContainer = styled.div`
    width: 100%;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: #0b2434;
    color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`

const MenuIcon = styled.div`
    font-size: 1.5rem;
    cursor: pointer;
`

const ProfileContainer = styled.div`
    color: #ccc;
    margin-right: 10px;
`

const LevelInfo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`

export default function Navbar(props: NavbarProps) {
    return (
        <NavbarContainer>
            <MenuIcon>
                <FiMenu />
            </MenuIcon>
            <LevelInfo>Level {props.level}</LevelInfo>
            <ProfileContainer>Profile Placeholder</ProfileContainer>
        </NavbarContainer>
    )
}