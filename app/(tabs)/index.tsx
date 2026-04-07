import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, ScrollView, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Star, MapPin, ChevronRight, SlidersHorizontal } from 'lucide-react-native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { PROVIDERS, CATEGORIES, ServiceProvider } from '../../mock/providers';
import { Colors } from '../../constants/Colors';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const filteredProviders = PROVIDERS.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(search.toLowerCase()) || 
                          provider.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || provider.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const renderProvider = ({ item, index }: { item: ServiceProvider, index: number }) => (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).springify()}
      layout={Layout.springify()}
    >
      <TouchableOpacity 
        style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]} 
        onPress={() => router.push(`/provider/${item.id}`)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.profileImage }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={[styles.categoryBadge, { backgroundColor: theme.accent, color: theme.tint }]}>
              {item.category}
            </Text>
            <View style={[styles.ratingContainer, { backgroundColor: colorScheme === 'dark' ? '#334155' : '#FFFBEB' }]}>
              <Star size={14} color="#FBBF24" fill="#FBBF24" />
              <Text style={[styles.ratingText, { color: colorScheme === 'dark' ? '#FBBF24' : '#D97706' }]}>{item.rating}</Text>
            </View>
          </View>
          <Text style={[styles.providerName, { color: theme.text }]}>{item.name}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color={theme.subtitle} />
            <Text style={[styles.locationText, { color: theme.subtitle }]}>{item.location}</Text>
          </View>
          <View style={[styles.cardFooter, { borderTopColor: theme.border }]}>
            <Text style={[styles.priceText, { color: theme.text }]}>{item.price}</Text>
            <View style={[styles.bookButton, { backgroundColor: theme.tint }]}>
              <Text style={styles.bookButtonText}>Book Now</Text>
              <ChevronRight size={16} color="#FFFFFF" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
          <Search size={20} color={theme.subtitle} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search providers..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={theme.subtitle}
          />
          <TouchableOpacity style={styles.filterButton}>
            <SlidersHorizontal size={20} color={theme.tint} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 60, backgroundColor: theme.background }}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          <TouchableOpacity 
            style={[styles.categoryTab, activeCategory === 'All' && { backgroundColor: theme.tint }]}
            onPress={() => setActiveCategory('All')}
          >
            <Text style={[styles.categoryTabText, activeCategory === 'All' && styles.activeCategoryTabText]}>All</Text>
          </TouchableOpacity>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat}
              style={[styles.categoryTab, activeCategory === cat && { backgroundColor: theme.tint }]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.categoryTabText, activeCategory === cat && styles.activeCategoryTabText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredProviders}
        renderItem={renderProvider}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.subtitle }]}>No providers found.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  filterButton: {
    padding: 5,
  },
  categoriesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    maxHeight: 60,
  },
  categoriesContent: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: '#F1F5F9',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  activeCategoryTabText: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
  },
  cardImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#E2E8F0',
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '600',
    overflow: 'hidden',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '700',
  },
  providerName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  priceText: {
    fontSize: 17,
    fontWeight: '700',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  emptyContainer: {
    padding: 50,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
