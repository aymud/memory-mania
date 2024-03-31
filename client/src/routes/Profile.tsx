import styled from 'styled-components';

import Navbar from '../components/Navbar.tsx';
import { ThemedAppContainer } from '../components/ThemedAppContainer.tsx';

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
    // Dummy profile data.
    const profileData = {
        username: 'John Wick',
        totalLevels: 20,
        highestScore: 1500,
        playTime: '10 hours',
        accuracy: '80%'
    };

    return (
        <ThemedAppContainer>
            <Navbar />
            <ProfileWrapper data-testid='cypress-profile-container'>
                <ProfileContainer>
                    <Title>User Profile</Title>
                    <ProfileInfo>
                        <InfoItem>Username: {profileData.username}</InfoItem>
                        <InfoItem>Total Levels Played: {profileData.totalLevels}</InfoItem>
                        <InfoItem>Highest Score: {profileData.highestScore}</InfoItem>
                        <InfoItem>Play Time: {profileData.playTime}</InfoItem>
                        <InfoItem>Accuracy: {profileData.accuracy}</InfoItem>
                    </ProfileInfo>
                </ProfileContainer>
            </ProfileWrapper>
        </ThemedAppContainer>
    );
}
