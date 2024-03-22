import React from 'react';

import {
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import ThemeSwitcher from './ThemeSwitcher.tsx';
import { useAuthState } from '../hooks/useAuthState.ts';
import { UseTheme } from '../hooks/useTheme.ts';

interface NavbarProps {
    level?: number;
}

export default function Navbar(props: NavbarProps) {
    const { isAuthenticated, user, logout } = useAuthState();
    const { theme } = UseTheme();
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Box bg={theme.navbarBackgroundColor} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box color={theme.navbarTextColor}>Logo</Box>
                    {props.level && (
                        <Box data-testid='cypress-level-info' color={theme.navbarTextColor}>
                            Level {props.level}
                        </Box>
                    )}
                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <ThemeSwitcher />
                            {isAuthenticated && (
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}>
                                        <Avatar
                                            size={'sm'}
                                            src={
                                                'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Salem&radius=50'
                                            }
                                        />
                                    </MenuButton>
                                    <MenuList alignItems={'center'}>
                                        <br />
                                        <Center>
                                            <Avatar
                                                size={'2xl'}
                                                src={
                                                    'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Salem&radius=50'
                                                }
                                            />
                                        </Center>
                                        <br />
                                        <Center>
                                            <p>{user}</p>
                                        </Center>
                                        <br />
                                        <MenuDivider />
                                        <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                                        <MenuItem>Settings</MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                logout();
                                                navigate('/');
                                            }}>
                                            Logout
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            )}
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </React.Fragment>
    );
}
