import React, { useState } from 'react';
import { 
  View, ScrollView, TouchableOpacity, Image, Modal, Alert, Dimensions, ImageBackground, Text 
} from 'react-native';
import styled from 'styled-components/native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- 1. STYLED COMPONENTS ---

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #121212; 
`;

const Header = styled.View`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #333;
`;

const HeaderTitle = styled.Text`
  color: #D4AF37;
  font-size: 28px;
  font-weight: bold;
  font-family: serif;
  letter-spacing: 1px;
`;

const SubTitle = styled.Text`
  color: #888;
  font-size: 14px;
  margin-top: 5px;
`;

// MENU CARDS
const ToolMenu = styled.ScrollView`
  padding: 20px;
`;

const ToolCard = styled.TouchableOpacity`
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 25px;
  elevation: 5;
  border-width: 1px;
  border-color: #333;
  background-color: #222;
`;

const CardTitle = styled.Text`
  color: white;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const CardDesc = styled.Text`
  color: #CCC;
  font-size: 13px;
`;

// --- 2. 3D STUDIO UI (SIMULATOR) ---
const StudioContainer = styled.View`
  flex: 1;
  background-color: #F5F5F5;
`;

const CanvasArea = styled.View`
  height: 60%;
  justify-content: center;
  align-items: center;
  background-color: #E0E0E0;
`;

const MannequinImage = styled.Image`
  height: 90%;
  width: 100%;
  resize-mode: contain;
`;

const ControlsArea = styled.View`
  flex: 1;
  background-color: #FFF;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 25px;
  elevation: 20;
`;

const ControlTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  text-transform: uppercase;
`;

const SwatchRow = styled.ScrollView`
  flex-direction: row;
  margin-bottom: 20px;
`;

const FabricSwatch = styled.TouchableOpacity`
  width: 60px; height: 60px;
  border-radius: 30px;
  background-color: ${props => props.color};
  margin-right: 15px;
  border-width: 3px;
  border-color: ${props => props.selected ? '#D4AF37' : 'transparent'};
  justify-content: center; align-items: center;
`;

const ActionButton = styled.TouchableOpacity`
  background-color: #121212;
  padding: 15px;
  border-radius: 8px;
  align-items: center;
  margin-top: 10px;
`;

// --- 3. VIRTUAL FITTING UI ---
const CameraUI = styled.View`
  flex: 1;
  background-color: #000;
`;

const CameraView = styled.ImageBackground`
  flex: 1;
  justify-content: space-between;
  padding: 20px;
`;

const AROverlay = styled.Image`
  position: absolute;
  top: 150px;
  left: 50px;
  width: 300px;
  height: 400px;
  resize-mode: contain;
  opacity: 0.9;
`;

const CameraControls = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
`;

const ShutterButton = styled.TouchableOpacity`
  width: 70px; height: 70px;
  border-radius: 35px;
  border-width: 4px;
  border-color: white;
  background-color: rgba(255,255,255,0.3);
`;

// --- DATA ---
const FABRICS = [
  { id: 1, name: 'Gold Silk', color: '#D4AF37' },
  { id: 2, name: 'Royal Blue', color: '#1565C0' },
  { id: 3, name: 'Ruby Red', color: '#C62828' },
  { id: 4, name: 'Emerald', color: '#2E7D32' },
  { id: 5, name: 'Charcoal', color: '#333333' },
];

const PATTERNS = [
  { id: 1, name: 'Solid', icon: 'square' },
  { id: 2, name: 'Imigongo', icon: 'triangle' },
  { id: 3, name: 'Floral', icon: 'flower' },
];

export default function ToolsScreen() {
  const [activeTool, setActiveTool] = useState(null); // '3D', 'AR', 'AI' or null
  
  // 3D Studio State
  const [selectedFabric, setSelectedFabric] = useState(FABRICS[0]);
  const [selectedPattern, setSelectedPattern] = useState(PATTERNS[0]);

  const renderHome = () => (
    <Container>
      <Header>
        <HeaderTitle>Design Lab</HeaderTitle>
        <SubTitle>Innovation meets Tradition.</SubTitle>
      </Header>

      <ToolMenu showsVerticalScrollIndicator={false}>
        
        {/* Card 1: Virtual Fitting */}
        <ToolCard activeOpacity={0.9} onPress={() => setActiveTool('AR')}>
          <ImageBackground 
            source={{uri: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600'}} 
            style={{width:'100%', height:'100%'}}
          >
            {/* FIXED: Using LinearGradient directly instead of via styled-components */}
            <LinearGradient 
              colors={['transparent', 'rgba(0,0,0,0.9)']} 
              style={{flex: 1, justifyContent: 'flex-end', padding: 20}}
            >
              <Ionicons name="camera-outline" size={30} color="#D4AF37" />
              <CardTitle>Virtual Fitting Room</CardTitle>
              <CardDesc>Try on clothes instantly using AR technology.</CardDesc>
            </LinearGradient>
          </ImageBackground>
        </ToolCard>

        {/* Card 2: 3D Studio */}
        <ToolCard activeOpacity={0.9} onPress={() => setActiveTool('3D')}>
          <ImageBackground 
            source={{uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600'}} 
            style={{width:'100%', height:'100%'}}
          >
            <LinearGradient 
              colors={['transparent', 'rgba(0,0,0,0.9)']} 
              style={{flex: 1, justifyContent: 'flex-end', padding: 20}}
            >
              <MaterialCommunityIcons name="tshirt-crew-outline" size={30} color="#D4AF37" />
              <CardTitle>Bespoke Design Lab</CardTitle>
              <CardDesc>Customize fabrics, cuts, and colors in 3D.</CardDesc>
            </LinearGradient>
          </ImageBackground>
        </ToolCard>

        {/* Card 3: AI Style */}
        <ToolCard activeOpacity={0.9} onPress={() => Alert.alert("Coming Soon", "The AI Stylist is training on Rwanda's latest fashion trends!")}>
          <ImageBackground 
            source={{uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600'}} 
            style={{width:'100%', height:'100%'}}
          >
            <LinearGradient 
              colors={['transparent', 'rgba(0,0,0,0.9)']} 
              style={{flex: 1, justifyContent: 'flex-end', padding: 20}}
            >
              <Ionicons name="sparkles-outline" size={30} color="#D4AF37" />
              <CardTitle>Style Inspiration AI</CardTitle>
              <CardDesc>Get personalized outfit recommendations.</CardDesc>
            </LinearGradient>
          </ImageBackground>
        </ToolCard>

      </ToolMenu>
    </Container>
  );

  // --- 3D EDITOR SCREEN ---
  const render3DStudio = () => (
    <Modal visible={true} animationType="slide" onRequestClose={() => setActiveTool(null)}>
      <StudioContainer>
        {/* Toolbar */}
        <View style={{flexDirection:'row', justifyContent:'space-between', padding:20, paddingTop: 50, position:'absolute', zIndex:10, width:'100%'}}>
           <TouchableOpacity onPress={() => setActiveTool(null)} style={{backgroundColor:'white', borderRadius:20, padding:8}}>
             <Ionicons name="arrow-back" size={24} color="black" />
           </TouchableOpacity>
           <TouchableOpacity style={{backgroundColor:'white', borderRadius:20, padding:8}}>
             <Ionicons name="share-social-outline" size={24} color="black" />
           </TouchableOpacity>
        </View>

        {/* The Mannequin (Changes Color dynamically) */}
        <CanvasArea>
          <MannequinImage 
            source={{uri: 'https://pngimg.com/uploads/dress/dress_PNG155.png'}} 
            style={{ tintColor: selectedFabric.color }} 
          />
        </CanvasArea>

        {/* Controls */}
        <ControlsArea>
          <ControlTitle>Select Fabric Color</ControlTitle>
          <SwatchRow horizontal showsHorizontalScrollIndicator={false}>
            {FABRICS.map((fab) => (
              <FabricSwatch 
                key={fab.id} 
                color={fab.color} 
                selected={selectedFabric.id === fab.id}
                onPress={() => setSelectedFabric(fab)}
              />
            ))}
          </SwatchRow>

          <ControlTitle>Pattern / Texture</ControlTitle>
          <SwatchRow horizontal showsHorizontalScrollIndicator={false}>
            {PATTERNS.map((pat) => (
              <TouchableOpacity 
                key={pat.id} 
                onPress={() => setSelectedPattern(pat)}
                style={{
                  marginRight: 15, padding: 10, borderRadius: 8, 
                  backgroundColor: selectedPattern.id === pat.id ? '#EEE' : '#FFF',
                  borderWidth: 1, borderColor: '#DDD'
                }}
              >
                <MaterialCommunityIcons name={pat.icon} size={24} color="black" />
                <Text style={{fontSize:10, marginTop:5}}>{pat.name}</Text>
              </TouchableOpacity>
            ))}
          </SwatchRow>

          <ActionButton onPress={() => Alert.alert("Order Placed", `You have ordered a Custom ${selectedFabric.name} Dress!`)}>
            <Text style={{color:'#D4AF37', fontWeight:'bold', fontSize:16}}>ORDER CUSTOM DESIGN</Text>
          </ActionButton>

        </ControlsArea>
      </StudioContainer>
    </Modal>
  );

  // --- AR CAMERA SCREEN ---
  const renderAR = () => (
    <Modal visible={true} animationType="slide" onRequestClose={() => setActiveTool(null)}>
      <CameraUI>
        <CameraView source={{uri: 'https://images.unsplash.com/photo-1616847231687-0f8180373e2e?q=80&w=600'}} imageStyle={{opacity: 0.6}}>
          
          <TouchableOpacity onPress={() => setActiveTool(null)} style={{marginTop: 40, marginLeft: 20}}>
             <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>

          {/* This is the Digital Clothes Overlay */}
          <AROverlay source={{uri: 'https://pngimg.com/uploads/dress/dress_PNG155.png'}} />

          <View style={{alignItems:'center', marginBottom: 20}}>
            <Text style={{color:'white', marginBottom:20, fontWeight:'bold', backgroundColor:'rgba(0,0,0,0.5)', padding:10}}>
              Point camera at full body
            </Text>
            <CameraControls>
              <MaterialCommunityIcons name="image-outline" size={30} color="white" style={{marginRight:40}}/>
              <ShutterButton onPress={() => Alert.alert("Photo Saved", "Look saved to your gallery!")} />
              <Ionicons name="camera-reverse-outline" size={30} color="white" style={{marginLeft:40}}/>
            </CameraControls>
          </View>

        </CameraView>
      </CameraUI>
    </Modal>
  );

  // Main Render Switch
  if (activeTool === '3D') return render3DStudio();
  if (activeTool === 'AR') return renderAR();
  
  return renderHome();
}