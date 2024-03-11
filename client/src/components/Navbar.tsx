import { FiMenu, FiUser } from 'react-icons/fi'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

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
    display: flex;
    align-items: center;
    color: #ccc;
    cursor: pointer;
`

const ProfileIcon = styled.div`
    font-size: 1.5rem;
    margin-right: 5px;
    color: #fff;
`

const ProfileName = styled.div`
    font-size: 1rem;
    color: #fff;
`

const LevelInfo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`

export default function Navbar(props: NavbarProps) {
    const navigate = useNavigate()

    function handleProfile() {
        navigate('/profile')
    }

    return (
        <NavbarContainer>
            <MenuIcon>
                <FiMenu />
            </MenuIcon>
            <LevelInfo>Level {props.level}</LevelInfo>
            <ProfileContainer onClick={handleProfile}>
                <ProfileIcon>
                    <FiUser />
                </ProfileIcon>
                <ProfileName>User</ProfileName>
            </ProfileContainer>
        </NavbarContainer>
    )
}
