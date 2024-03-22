import React from 'react';

import { Avatar, Box, Flex, HStack, Menu, MenuButton, MenuItem, MenuList, Stack, Text, VStack } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
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
                    <Box color={theme.navbarTextColor}>Memory Mania</Box>
                    {props.level && (
                        <Box data-testid='cypress-level-info' color={theme.navbarTextColor}>
                            Level {props.level}
                        </Box>
                    )}
                    <HStack spacing={{ base: '0', md: '6' }}>
                        <ThemeSwitcher />
                        <Flex alignItems={'center'}>
                            <Stack direction={'row'} spacing={7}>
                                {isAuthenticated && (
                                    <Menu>
                                        <MenuButton py={2} transition='all 0.3s' _focus={{ boxShadow: 'none' }}>
                                            <HStack>
                                                <Avatar
                                                    size={'sm'}
                                                    src={
                                                        'https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=Salem&radius=50'
                                                    }
                                                />
                                                <VStack
                                                    display={{ base: 'none', md: 'flex' }}
                                                    alignItems='flex-start'
                                                    spacing='1px'
                                                    ml='2'>
                                                    <Text color={theme.navbarTextColor} fontSize='sm'>
                                                        {user}
                                                    </Text>
                                                    <Text fontSize='xs' color='gray.600'>
                                                        User
                                                    </Text>
                                                </VStack>
                                                <Box display={{ base: 'none', md: 'flex' }}>
                                                    <FiChevronDown color={theme.navbarTextColor} />
                                                </Box>
                                            </HStack>
                                        </MenuButton>
                                        <MenuList>
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
                    </HStack>
                </Flex>
            </Box>
        </React.Fragment>
    );
}
