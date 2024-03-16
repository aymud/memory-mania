import React from 'react';

import styled from 'styled-components';

import Navbar from '../components/Navbar.tsx';
import { useAuthState } from '../hooks/useAuthState.ts';

const ProfileWrapper = styled.div`
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: relative;
`;

const ProfileContainer = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 300px;
    text-align: center;
`;

const Title = styled.h2`
    color: #333;
`;

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const InfoItem = styled.div`
    color: #333;
    font-size: 16px;
`;

export default function Profile() {
    const { user } = useAuthState();
    const [profileData, setProfileData] = React.useState({
        username: user,
        currentLevel: 1,
        totalLevelsPlayed: 0,
        highestLevel: 0
    });

    React.useEffect(() => {
        const loadGameStateFromBrowserStorage = () => {
            const gameStateStr = sessionStorage.getItem('game_state');
            if (gameStateStr) {
                return JSON.parse(gameStateStr);
            }
        };

        const loadedGameState = loadGameStateFromBrowserStorage();
        setProfileData(prevProfileData => ({
            ...prevProfileData,
            totalLevelsPlayed: prevProfileData.totalLevelsPlayed + 1,
            highestLevel:
                loadedGameState.currentLevel > prevProfileData.currentLevel
                    ? loadedGameState.currentLevel
                    : prevProfileData.currentLevel
        }));
    }, []);

    return (
        <React.Fragment>
            <Navbar />
            <ProfileWrapper>
                <ProfileContainer>
                    <Title>User Profile</Title>
                    <ProfileInfo>
                        <InfoItem>Username: {profileData.username}</InfoItem>
                        <InfoItem>Total Levels Played: {profileData.totalLevelsPlayed}</InfoItem>
                        <InfoItem>Highest Level Achieved: {profileData.highestLevel}</InfoItem>
                        {/*<InfoItem>Highest Score: {profileData.highestScore}</InfoItem>*/}
                        {/*<InfoItem>Play Time: {profileData.playTime}</InfoItem>*/}
                        {/*<InfoItem>Accuracy: {profileData.accuracy}</InfoItem>*/}
                    </ProfileInfo>
                </ProfileContainer>
            </ProfileWrapper>
        </React.Fragment>
    );
}
