import React from 'react';
import { ScrollView, View, Image, StatusBar, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');



const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #FFFFFF;
`;

const NavBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #FFFFFF;
  height: 60px;
`;

// If you haven't put the logo in assets yet, this prevents a crash.
// Once you add 'logo.png' to assets, it will appear.
const LogoImage = styled.Image`
  width: 120px; 
  height: 40px;
  resize-mode: contain;
`;

const HeroContainer = styled.ImageBackground`
  width: 100%;
  height: 480px; 
  justify-content: flex-end;
  align-items: center;
`;

const GradientOverlay = styled.View`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.35); 
`;

const HeroContent = styled.View`
  padding: 20px;
  width: 100%;
  align-items: center;
  padding-bottom: 50px;
`;

const MainHeading = styled.Text`
  color: #FFFFFF;
  font-size: 34px;
  font-weight: 800;
  text-align: center;
  letter-spacing: 0.5px;
  text-shadow: 0px 2px 10px rgba(0,0,0,0.7);
  font-family: serif; 
  margin-bottom: 10px;
`;

const SubHeading = styled.Text`
  color: #E0E0E0;
  font-size: 15px;
  text-align: center;
  margin-bottom: 25px;
  line-height: 22px;
  max-width: 90%;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

const PrimaryButton = styled.TouchableOpacity`
  background-color: #D4AF37;
  padding-vertical: 14px;
  padding-horizontal: 25px;
  border-radius: 2px;
  margin-horizontal: 5px;
`;

const SecondaryButton = styled.TouchableOpacity`
  background-color: rgba(255,255,255,0.2);
  border: 1px solid #FFFFFF;
  padding-vertical: 14px;
  padding-horizontal: 25px;
  border-radius: 2px;
  margin-horizontal: 5px;
`;

const BtnText = styled.Text`
  color: ${props => props.dark ? '#000' : '#FFF'};
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
`;

const SectionContainer = styled.View`
  padding: 30px 20px;
  background-color: #FFFFFF;
`;

const SectionHeader = styled.Text`
  font-size: 22px;
  color: #121212;
  font-weight: 700;
  margin-bottom: 8px;
  text-align: center;
  font-family: serif;
`;

const SectionSub = styled.Text`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 25px;
  line-height: 20px;
`;

const ToolCard = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #FAFAFA;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #F0F0F0;
  align-items: center;
  elevation: 1;
`;

const ToolContent = styled.View`
  flex: 1;
  margin-left: 15px;
`;

const ToolTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #121212;
  margin-bottom: 4px;
`;

const ToolDesc = styled.Text`
  font-size: 13px;
  color: #666;
  line-height: 18px;
`;

const FeaturedRow = styled.ScrollView`
  padding-left: 20px;
  margin-bottom: 30px;
`;

const ProductItem = styled.View`
  width: 160px;
  margin-right: 15px;
`;

const ProductImg = styled.Image`
  width: 100%;
  height: 220px;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const ProductBrand = styled.Text`
  font-size: 10px;
  color: #D4AF37;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 2px;
`;

const ProductName = styled.Text`
  font-size: 14px;
  color: #000;
  font-weight: 600;
`;

const ProductPrice = styled.Text`
  font-size: 14px;
  color: #444;
  margin-top: 4px;
`;

// --- DATA ---
const NEW_ARRIVALS = [
  { id: 1, brand: 'KIM Couture', name: 'Elegant Evening Gown', price: 'RWF 359,988', img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600' },
  { id: 2, brand: 'Modern Tailor', name: 'Bespoke Suit', price: 'RWF 479,988', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600' },
  { id: 3, brand: 'Rwandan Heritage', name: 'Imishanana', price: 'RWF 150,000', img: 'https://images.unsplash.com/photo-1605763240004-7e93b172d754?q=80&w=600' },
];

export default function HomeScreen({ navigation }) {
  
  const logoSource = require('../../assets/logo.jpg'); 

  return (
    <Container>
      <StatusBar barStyle="dark-content" />
      
      {/* 1. TOP NAVIGATION */}
      <NavBar>
        <Ionicons name="menu-outline" size={26} color="#000" />
        
        {/* LOGO HANDLING - If this crashes, you haven't added logo.png to assets yet! */}
        <LogoImage source={logoSource} /> 
        
        <Ionicons name="bag-handle-outline" size={26} color="#000" onPress={() => navigation.navigate('Marketplace')} />
      </NavBar>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 2. HERO SECTION */}
        <HeroContainer source={{ uri: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000' }}>
          <GradientOverlay />
          <HeroContent>
            <MainHeading>Curate Your{"\n"}Style Story.</MainHeading>
            <SubHeading>
              Design your own pieces with our advanced tools, or discover one-of-a-kind finds from visionary creators.
            </SubHeading>
            
            <ButtonRow>
              <PrimaryButton onPress={() => navigation.navigate('Design Lab')}>
                <BtnText dark>Design My Style</BtnText>
              </PrimaryButton>
              
              <SecondaryButton onPress={() => navigation.navigate('Marketplace')}>
                <BtnText>Marketplace</BtnText>
              </SecondaryButton>
            </ButtonRow>
          </HeroContent>
        </HeroContainer>

        {/* 3. DESIGN TOOLS INTRO */}
        <SectionContainer>
          <SectionHeader>Explore Cutting-Edge Tools</SectionHeader>
          <SectionSub>Innovative tools that empower designers and fashion enthusiasts to create, visualize, and customize.</SectionSub>

          <ToolCard onPress={() => navigation.navigate('Design Lab')}>
            <View style={{backgroundColor: '#FFF8E1', padding: 10, borderRadius: 50}}>
              <Ionicons name="camera-outline" size={24} color="#D4AF37" />
            </View>
            <ToolContent>
              <ToolTitle>Virtual Fitting Room</ToolTitle>
              <ToolDesc>Step into style! Upload your photo and instantly see clothes on you.</ToolDesc>
            </ToolContent>
            <Ionicons name="arrow-forward" size={20} color="#CCC" />
          </ToolCard>

          <ToolCard onPress={() => navigation.navigate('Design Lab')}>
            <View style={{backgroundColor: '#F3E5F5', padding: 10, borderRadius: 50}}>
              <Ionicons name="cube-outline" size={24} color="#8E24AA" />
            </View>
            <ToolContent>
              <ToolTitle>3D Fashion Studio</ToolTitle>
              <ToolDesc>Unleash your inner designer! Create 3D sketches and bring visions to life.</ToolDesc>
            </ToolContent>
            <Ionicons name="arrow-forward" size={20} color="#CCC" />
          </ToolCard>

          <ToolCard onPress={() => navigation.navigate('Design Lab')}>
            <View style={{backgroundColor: '#E3F2FD', padding: 10, borderRadius: 50}}>
              <Ionicons name="sparkles-outline" size={24} color="#1E88E5" />
            </View>
            <ToolContent>
              <ToolTitle>Style Inspiration Engine</ToolTitle>
              <ToolDesc>Never run out of ideas! Get personalized outfit recommendations.</ToolDesc>
            </ToolContent>
            <Ionicons name="arrow-forward" size={20} color="#CCC" />
          </ToolCard>

        </SectionContainer>

        {/* 4. MARKETPLACE TEASER */}
        <View style={{ marginTop: 10, marginBottom: 50 }}>
          <SectionHeader style={{textAlign:'left', marginLeft: 20}}>Fresh from Marketplace</SectionHeader>
          <SectionSub style={{textAlign:'left', marginLeft: 20}}>Discover handcrafted fashion.</SectionSub>
          
          <FeaturedRow horizontal showsHorizontalScrollIndicator={false}>
            {NEW_ARRIVALS.map((item) => (
              <ProductItem key={item.id}>
                <ProductImg source={{ uri: item.img }} />
                <ProductBrand>{item.brand}</ProductBrand>
                <ProductName numberOfLines={1}>{item.name}</ProductName>
                <ProductPrice>{item.price}</ProductPrice>
              </ProductItem>
            ))}
          </FeaturedRow>
        </View>

      </ScrollView>
    </Container>
  );
}