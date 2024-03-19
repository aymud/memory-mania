import { FiMenu, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthState } from '../hooks/useAuthState.ts';

interface NavbarProps {
    level?: number;
}

const NavbarList = styled.ul`
    display: flex;
    align-items: center;
    padding: 15px;
    background: ${props => props.theme.navbarBackgroundColor};
    color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    list-style: none;
    margin: 0;
`;

const NavbarItem = styled.li<{ $isRight: boolean }>`
    padding: 10px;
    margin-left: 5px;
    font-size: 1.5em;
    transition: box-shadow 0.3s;
    color: #fff;

    ${props => props.$isRight && 'margin-left: auto'};
`;

const MenuIcon = styled.div`
    font-size: 1.5rem;
    cursor: pointer;
    color: white;
`;

const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    color: #ccc;
    cursor: pointer;
`;

const ProfileIcon = styled.div`
    font-size: 1.5rem;
    margin-right: 5px;
    color: #fff;
`;

const ProfileName = styled.div`
    font-size: 1.5rem;
    color: #fff;
`;

const LevelInfo = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    /* Center the LevelInfo horizontally */
    flex: 1;
    text-align: center;
`;

export default function Navbar(props: NavbarProps) {
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAuthState();

    function handleProfile() {
        navigate('/profile');
    }

    return (
        <header>
            <nav>
                <NavbarList>
                    <MenuIcon>
                        <FiMenu />
                    </MenuIcon>
                    {props.level && <LevelInfo data-testid='cypress-level-info'>Level {props.level}</LevelInfo>}
                    {isAuthenticated ? (
                        <NavbarItem $isRight>
                            <ProfileContainer onClick={handleProfile}>
                                <ProfileIcon>
                                    <FiUser />
                                </ProfileIcon>
                                <ProfileName>{user}</ProfileName>
                            </ProfileContainer>
                        </NavbarItem>
                    ) : (
                        <NavbarItem $isRight>Login</NavbarItem>
                    )}
                </NavbarList>
            </nav>
        </header>
    );
}
