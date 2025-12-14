import React, { useState } from 'react';
import { 
  FlatList, TextInput, View, TouchableOpacity, Modal, 
  ScrollView, Image, Alert, StatusBar, Text 
} from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- 1. DATA ---
const CATEGORIES = ["All", "Dresses", "Suits", "Imishanana", "Tops", "Wedding", "Accessories"];

const ALL_PRODUCTS = [
  { id: '1', name: 'Elegant Evening Gown', brand: 'KIM Couture', price: 359988, category: 'Dresses', description: 'A stunning floor-length gown crafted from premium silk, perfect for gala events.', img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600' },
  { id: '2', name: 'Tailored Business Suit', brand: 'Modern Tailor', price: 479988, category: 'Suits', description: 'Bespoke italian wool suit designed for the modern professional.', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600' },
  { id: '3', name: 'Traditional Umushanana', brand: 'Rwandan Heritage', price: 150000, category: 'Imishanana', description: 'Authentic ceremonial wear honoring Rwandan tradition with modern comfort.', img: 'https://images.unsplash.com/photo-1605763240004-7e93b172d754?q=80&w=600' },
  { id: '4', name: 'Summer Collection Blouse', brand: 'Fresh Designs', price: 107988, category: 'Tops', description: 'Lightweight and breathable fabric ideal for Kigali sunny days.', img: 'https://images.unsplash.com/photo-1551163943-3f6a29e39426?q=80&w=600' },
  { id: '5', name: 'Handcrafted Leather Jacket', brand: 'Artisan Leathers', price: 599988, category: 'Suits', description: 'Genuine leather jacket with intricate stitching details.', img: 'https://images.unsplash.com/photo-1551028919-383718cccf35?q=80&w=600' },
  { id: '6', name: 'Silk Evening Scarf', brand: 'Luxury Accessories', price: 95988, category: 'Accessories', description: '100% Silk scarf to add a touch of elegance to any outfit.', img: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa33?q=80&w=600' },
  { id: '7', name: 'Custom Wedding Dress', brand: 'Bridal Dreams', price: 1559988, category: 'Wedding', description: 'Made-to-measure wedding gown with lace details and a long train.', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600' },
  { id: '8', name: 'Agaseke Basket Bag', brand: 'Local Craft', price: 45000, category: 'Accessories', description: 'Handwoven Agaseke transformed into a chic modern handbag.', img: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=600' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

// --- 2. STYLED COMPONENTS ---

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #FFFFFF;
`;

// Header
const HeaderContainer = styled.View`
  padding: 10px 20px;
  background-color: #FFF;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: #121212;
  font-family: serif;
`;

const CartBadge = styled.View`
  position: absolute;
  top: -5px; right: -5px;
  background-color: #D32F2F;
  width: 18px; height: 18px;
  border-radius: 9px;
  justify-content: center;
  align-items: center;
`;

const BadgeText = styled.Text`
  color: white; font-size: 10px; font-weight: bold;
`;

// Search & Filter Bar
const SearchSection = styled.View`
  padding: 0 20px 10px 20px;
`;

const SearchBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #F5F5F5;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const SearchInput = styled.TextInput`
  flex: 1; margin-left: 10px; font-size: 16px; color: #333;
`;

const FilterRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const FilterButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border: 1px solid #EEE;
  padding: 8px 12px;
  border-radius: 4px;
`;

// Categories
const CategoryScroll = styled.ScrollView`
  padding-left: 20px; margin-bottom: 10px; height: 45px;
`;

const CategoryChip = styled.TouchableOpacity`
  padding: 6px 16px;
  background-color: ${props => props.active ? '#121212' : '#FFF'};
  border: 1px solid ${props => props.active ? '#121212' : '#E0E0E0'};
  border-radius: 20px;
  margin-right: 10px;
  height: 32px;
  justify-content: center;
`;

// Grid
const GridItem = styled.TouchableOpacity`
  flex: 1; margin: 5px; margin-bottom: 20px;
  background-color: #FFF;
`;

const ProductImage = styled.Image`
  width: 100%; height: 240px; border-radius: 4px; margin-bottom: 10px;
`;

const WishlistButton = styled.TouchableOpacity`
  position: absolute; top: 10px; right: 10px;
  background-color: rgba(255,255,255,0.8);
  padding: 6px; border-radius: 20px;
`;

// Modal Styles
const ModalOverlay = styled.View`
  flex: 1; background-color: rgba(0,0,0,0.5); justify-content: flex-end;
`;

const ModalContent = styled.View`
  height: 90%; background-color: #FFF; border-top-left-radius: 20px; border-top-right-radius: 20px;
  padding-top: 20px;
`;

const ModalImage = styled.Image`
  width: 100%; height: 350px;
`;

const ModalDetails = styled.ScrollView`
  padding: 20px;
`;

const SizeChip = styled.TouchableOpacity`
  width: 40px; height: 40px; border-radius: 20px;
  border: 1px solid ${props => props.selected ? '#D4AF37' : '#ddd'};
  background-color: ${props => props.selected ? '#D4AF37' : '#fff'};
  justify-content: center; align-items: center; margin-right: 10px;
`;

const AddToCartBtn = styled.TouchableOpacity`
  background-color: #121212; padding: 18px;
  align-items: center; justify-content: center;
  margin: 20px; border-radius: 4px;
  flex-direction: row;
`;

// --- 3. HELPER FUNCTION ---
const formatCurrency = (amount) => {
  return "RWF " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// --- 4. MAIN COMPONENT ---
export default function MarketplaceScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState([]); // Stores IDs of liked items
  const [cartCount, setCartCount] = useState(0);
  
  // Sorting State
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'priceLow', 'priceHigh'

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');

  // --- LOGIC ---
  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const openProduct = (item) => {
    setActiveProduct(item);
    setModalVisible(true);
  };

  const addToCart = () => {
    setCartCount(cartCount + 1);
    setModalVisible(false);
    Alert.alert("Success", "Added to your shopping bag!");
  };

  const handleSort = () => {
    // Simple toggle for demo
    if (sortBy === 'newest') setSortBy('priceLow');
    else if (sortBy === 'priceLow') setSortBy('priceHigh');
    else setSortBy('newest');
  };

  // FILTER & SORT LOGIC
  let displayData = ALL_PRODUCTS.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'priceLow') {
    displayData.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'priceHigh') {
    displayData.sort((a, b) => b.price - a.price);
  } else {
    // 'newest' - revert to original ID order (simulated)
    displayData.sort((a, b) => a.id - b.id);
  }

  const renderProduct = ({ item }) => (
    <GridItem activeOpacity={0.9} onPress={() => openProduct(item)}>
      <ProductImage source={{ uri: item.img }} resizeMode="cover" />
      {/* Wishlist Heart */}
      <WishlistButton onPress={() => toggleWishlist(item.id)}>
        <Ionicons 
          name={wishlist.includes(item.id) ? "heart" : "heart-outline"} 
          size={20} 
          color={wishlist.includes(item.id) ? "#D4AF37" : "#000"} 
        />
      </WishlistButton>
      
      <Text style={{color:'#D4AF37', fontSize:10, fontWeight:'700', textTransform:'uppercase'}}>{item.brand}</Text>
      <Text numberOfLines={1} style={{fontSize:14, fontWeight:'600', marginVertical:2}}>{item.name}</Text>
      <Text style={{fontSize:14, color:'#555'}}>{formatCurrency(item.price)}</Text>
    </GridItem>
  );

  return (
    <Container>
      {/* 1. Header */}
      <HeaderContainer>
        <HeaderTitle>Shop</HeaderTitle>
        <View>
          <Ionicons name="bag-handle-outline" size={28} color="#000" />
          {cartCount > 0 && (
            <CartBadge><BadgeText>{cartCount}</BadgeText></CartBadge>
          )}
        </View>
      </HeaderContainer>

      {/* 2. Search & Filter */}
      <SearchSection>
        <SearchBarContainer>
          <Ionicons name="search" size={20} color="#888" />
          <SearchInput 
            placeholder="Search items..." 
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </SearchBarContainer>

        <FilterRow>
          <FilterButton onPress={handleSort}>
            <Ionicons name="swap-vertical" size={16} color="#333" />
            <Text style={{marginLeft:5, fontSize:12, fontWeight:'600'}}>
              Sort: {sortBy === 'newest' ? 'Newest' : sortBy === 'priceLow' ? 'Price: Low' : 'Price: High'}
            </Text>
          </FilterButton>
          <FilterButton>
            <Ionicons name="filter" size={16} color="#333" />
            <Text style={{marginLeft:5, fontSize:12, fontWeight:'600'}}>Filter</Text>
          </FilterButton>
        </FilterRow>
      </SearchSection>

      {/* 3. Categories */}
      <View>
        <CategoryScroll horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((cat) => (
            <CategoryChip 
              key={cat} 
              active={selectedCategory === cat} 
              onPress={() => setSelectedCategory(cat)}
            >
              <Text style={{color: selectedCategory === cat ? '#FFF' : '#666', fontWeight:'600', fontSize:12}}>
                {cat}
              </Text>
            </CategoryChip>
          ))}
        </CategoryScroll>
      </View>

      {/* 4. Product Grid */}
      <FlatList
        data={displayData}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />

      {/* 5. PRODUCT DETAILS MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalOverlay>
          <ModalContent>
            {/* Close Button */}
            <TouchableOpacity 
              style={{position:'absolute', top:20, right:20, zIndex:10, backgroundColor:'#f0f0f0', padding:8, borderRadius:20}}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false}>
              {activeProduct && (
                <>
                  <ModalImage source={{ uri: activeProduct.img }} resizeMode="cover" />
                  <ModalDetails>
                    <Text style={{color:'#D4AF37', fontWeight:'bold', fontSize:14, textTransform:'uppercase', marginBottom:5}}>
                      {activeProduct.brand}
                    </Text>
                    <Text style={{fontSize:24, fontWeight:'bold', color:'#121212', marginBottom:10, fontFamily:'serif'}}>
                      {activeProduct.name}
                    </Text>
                    <Text style={{fontSize:20, fontWeight:'600', color:'#333', marginBottom:20}}>
                      {formatCurrency(activeProduct.price)}
                    </Text>

                    <Text style={{fontSize:14, fontWeight:'bold', marginBottom:10}}>SELECT SIZE</Text>
                    <View style={{flexDirection:'row', marginBottom:25}}>
                      {SIZES.map(s => (
                        <SizeChip key={s} selected={selectedSize === s} onPress={() => setSelectedSize(s)}>
                          <Text style={{color: selectedSize === s ? '#FFF' : '#333', fontWeight:'bold'}}>{s}</Text>
                        </SizeChip>
                      ))}
                    </View>

                    <Text style={{fontSize:14, fontWeight:'bold', marginBottom:5}}>DESCRIPTION</Text>
                    <Text style={{fontSize:15, color:'#666', lineHeight:22}}>
                      {activeProduct.description}
                    </Text>
                  </ModalDetails>
                </>
              )}
            </ScrollView>

            <AddToCartBtn onPress={addToCart}>
              <Ionicons name="bag-handle" size={20} color="white" style={{marginRight:10}} />
              <Text style={{color:'white', fontWeight:'bold', fontSize:16}}>ADD TO BASKET</Text>
            </AddToCartBtn>
          </ModalContent>
        </ModalOverlay>
      </Modal>

    </Container>
  );
}