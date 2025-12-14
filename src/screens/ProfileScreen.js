import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Alert, Switch, Text } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- STYLED COMPONENTS ---

// FIXED: We use a normal styled.View instead of wrapping SafeAreaView
const MainContent = styled.View`
  flex: 1;
  background-color: #F8F8F8;
`;

// 1. HEADER PROFILE
const Header = styled.View`
  background-color: #FFF;
  padding: 20px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #EEE;
`;

const AvatarContainer = styled.View`
  position: relative;
  margin-bottom: 15px;
`;

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border-width: 3px;
  border-color: #D4AF37; 
`;

const EditBadge = styled.TouchableOpacity`
  position: absolute;
  bottom: 0; right: 0;
  background-color: #121212;
  padding: 8px;
  border-radius: 20px;
  border-width: 2px;
  border-color: #FFF;
`;

const UserName = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #121212;
  font-family: serif;
`;

const UserRole = styled.Text`
  font-size: 14px;
  color: #777;
  margin-top: 4px;
`;

// 2. STATS ROW
const StatsRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  background-color: #FFF;
  padding: 15px 0;
  margin-top: 1px;
`;

const StatItem = styled.View`
  align-items: center;
`;

const StatNumber = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #D4AF37;
`;

const StatLabel = styled.Text`
  font-size: 12px;
  color: #555;
  text-transform: uppercase;
`;

// 3. MENU SECTIONS
const SectionTitle = styled.Text`
  font-size: 14px;
  color: #888;
  font-weight: bold;
  margin: 25px 20px 10px 20px;
  text-transform: uppercase;
`;

const MenuCard = styled.View`
  background-color: #FFF;
  margin-horizontal: 20px;
  border-radius: 12px;
  padding: 5px;
  elevation: 2;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border-bottom-width: ${props => props.last ? '0px' : '1px'};
  border-bottom-color: #F5F5F5;
`;

const MenuText = styled.Text`
  flex: 1;
  margin-left: 15px;
  font-size: 16px;
  color: ${props => props.color || '#333'};
  font-weight: ${props => props.bold ? '600' : '400'};
`;

// 4. ORDER CARD (Mini)
const OrderCard = styled.View`
  background-color: #FFF;
  margin: 0 20px;
  padding: 15px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  border-left-width: 4px;
  border-left-color: #D4AF37;
  elevation: 2;
`;

export default function ProfileScreen() {
  
  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive" }
    ]);
  };

  return (
    // FIXED: SafeAreaView is now the parent wrapper
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <MainContent>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* HEADER */}
          <Header>
            <AvatarContainer>
              <Avatar source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200' }} />
              <EditBadge>
                <Ionicons name="camera" size={14} color="#FFF" />
              </EditBadge>
            </AvatarContainer>
            <UserName>Aline Niyonizera</UserName>
            <UserRole>Fashion Enthusiast | Kigali</UserRole>
          </Header>

          {/* STATS */}
          <StatsRow>
            <StatItem>
              <StatNumber>12</StatNumber>
              <StatLabel>Orders</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>5</StatNumber>
              <StatLabel>Wishlist</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>2</StatNumber>
              <StatLabel>Designs</StatLabel>
            </StatItem>
          </StatsRow>

          {/* RECENT ORDER TRACKING */}
          <SectionTitle>Active Orders</SectionTitle>
          <OrderCard>
            <View style={{backgroundColor:'#FFF8E1', padding:10, borderRadius:8}}>
              <MaterialCommunityIcons name="truck-delivery" size={24} color="#D4AF37" />
            </View>
            <View style={{marginLeft: 15, flex: 1}}>
              <Text style={{fontWeight:'bold', fontSize:15}}>Custom Silk Dress</Text>
              <Text style={{color:'#666', fontSize:12}}>Order #82991 • Estimated: 2 Days</Text>
            </View>
            <View style={{backgroundColor:'#E8F5E9', paddingHorizontal:10, paddingVertical:4, borderRadius:10}}>
              <Text style={{color:'#2E7D32', fontSize:10, fontWeight:'bold'}}>ON WAY</Text>
            </View>
          </OrderCard>

          {/* ACCOUNT SETTINGS */}
          <SectionTitle>My Account</SectionTitle>
          <MenuCard>
            <MenuItem>
              <Ionicons name="person-outline" size={22} color="#333" />
              <MenuText>Personal Details</MenuText>
              <Ionicons name="chevron-forward" size={18} color="#CCC" />
            </MenuItem>
            <MenuItem>
              <MaterialCommunityIcons name="tape-measure" size={22} color="#333" />
              <MenuText>My Measurements (3D)</MenuText>
              <Ionicons name="chevron-forward" size={18} color="#CCC" />
            </MenuItem>
            <MenuItem last>
              <Ionicons name="wallet-outline" size={22} color="#333" />
              <MenuText>Payment Methods (MoMo)</MenuText>
              <Ionicons name="chevron-forward" size={18} color="#CCC" />
            </MenuItem>
          </MenuCard>

          {/* APP SETTINGS */}
          <SectionTitle>Preferences</SectionTitle>
          <MenuCard>
            <MenuItem>
              <Ionicons name="notifications-outline" size={22} color="#333" />
              <MenuText>Push Notifications</MenuText>
              <Switch value={true} trackColor={{false: "#767577", true: "#D4AF37"}} />
            </MenuItem>
            <MenuItem>
              <Ionicons name="moon-outline" size={22} color="#333" />
              <MenuText>Dark Mode</MenuText>
              <Switch value={false} />
            </MenuItem>
            <MenuItem last>
              <Ionicons name="language-outline" size={22} color="#333" />
              <MenuText>Language (English/Kinyarwanda)</MenuText>
              <Ionicons name="chevron-forward" size={18} color="#CCC" />
            </MenuItem>
          </MenuCard>

          {/* LOGOUT */}
          <TouchableOpacity onPress={handleLogout} style={{margin: 25, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <Ionicons name="log-out-outline" size={20} color="#D32F2F" />
            <MenuText color="#D32F2F" bold style={{flex:0, marginLeft:10}}>Log Out</MenuText>
          </TouchableOpacity>

          <View style={{height: 50}} />
        </ScrollView>
      </MainContent>
    </SafeAreaView>
  );
}