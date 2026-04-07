import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, useColorScheme, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppContext } from '../../context/AppContext';
import { PROVIDERS } from '../../mock/providers';
import { Star, MapPin, Clock, Calendar, ShieldCheck, MessageSquare, Phone } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInRight, SlideInBottom } from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';
import { ApiService } from '../../services/api';

export default function ProviderDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { bookAppointment } = useAppContext();
  const provider = PROVIDERS.find((p) => p.id === id);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toDateString());

  if (!provider) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.surface }]}>
        <Text style={[styles.errorText, { color: theme.subtitle }]}>Provider not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.backText, { color: theme.tint }]}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBook = async () => {
    if (!selectedSlot) {
      Alert.alert('Selection Required', 'Please select a time slot to proceed.');
      return;
    }

    const today = selectedDate;

    try {
      const response = await ApiService.bookAppointment(provider.id, selectedSlot, today);
      if (response.success) {
        await bookAppointment(provider, selectedSlot, today);
        
        Alert.alert(
          'Success!',
          `Your appointment with ${provider.name} has been booked for ${today} at ${selectedSlot}.\n\nBooking ID: ${response.bookingId}`,
          [{ text: 'View My Bookings', onPress: () => router.replace('/(tabs)/appointments') }]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to book appointment. Please try again.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Image source={{ uri: provider.profileImage }} style={[styles.heroImage, { backgroundColor: theme.surface }]} />
        
        <Animated.View entering={FadeInUp.duration(600)} style={[styles.detailsContainer, { backgroundColor: theme.card }]}>
          <View style={styles.header}>
            <View>
              <Text style={[styles.categoryBadge, { backgroundColor: theme.accent, color: theme.tint }]}>
                {provider.category}
              </Text>
              <Text style={[styles.name, { color: theme.text }]}>{provider.name}</Text>
              <View style={styles.ratingRow}>
                <Star size={16} color="#FBBF24" fill="#FBBF24" />
                <Text style={[styles.ratingText, { color: theme.subtitle }]}>{provider.rating} (124 Reviews)</Text>
              </View>
            </View>
            <TouchableOpacity style={[styles.favoriteBtn, { backgroundColor: theme.accent }]}>
              <ShieldCheck size={24} color={theme.tint} />
            </TouchableOpacity>
          </View>

          <View style={styles.locationRow}>
            <MapPin size={18} color={theme.subtitle} />
            <Text style={[styles.locationText, { color: theme.subtitle }]}>{provider.location}</Text>
          </View>

          <View style={[styles.statsRow, { backgroundColor: theme.surface, borderColor: theme.border }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.text }]}>15+</Text>
              <Text style={[styles.statLabel, { color: theme.subtitle }]}>Exp. Years</Text>
            </View>
            <View style={[styles.statSeparator, { backgroundColor: theme.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.text }]}>1.2k</Text>
              <Text style={[styles.statLabel, { color: theme.subtitle }]}>Patients</Text>
            </View>
            <View style={[styles.statSeparator, { backgroundColor: theme.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.text }]}>{provider.price}</Text>
              <Text style={[styles.statLabel, { color: theme.subtitle }]}>Fee</Text>
            </View>
          </View>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>About</Text>
          <Text style={[styles.description, { color: theme.subtitle }]}>{provider.description}</Text>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateSelector}>
            {[...Array(7)].map((_, i) => {
              const d = new Date();
              d.setDate(d.getDate() + i);
              const isSelected = selectedDate === d.toDateString();
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.dateChip,
                    { backgroundColor: theme.card, borderColor: theme.accent },
                    isSelected && { backgroundColor: theme.tint, borderColor: theme.tint }
                  ]}
                  onPress={() => setSelectedDate(d.toDateString())}
                >
                  <Text style={[styles.dateDay, { color: theme.subtitle }, isSelected && { color: '#FFFFFF' }]}>
                    {d.toLocaleDateString('en-US', { weekday: 'short' })}
                  </Text>
                  <Text style={[styles.dateNum, { color: theme.text }, isSelected && { color: '#FFFFFF' }]}>
                    {d.getDate()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <Text style={[styles.sectionTitle, { color: theme.text }]}>Available Slots</Text>
          <View style={styles.slotsGrid}>
            {provider.availableSlots.map((slot, index) => (
              <Animated.View key={slot} entering={FadeInRight.delay(index * 100)}>
                <TouchableOpacity
                  style={[
                    styles.slotChip,
                    { borderColor: theme.accent, backgroundColor: theme.card },
                    selectedSlot === slot && { backgroundColor: theme.tint, borderColor: theme.tint }
                  ]}
                  onPress={() => setSelectedSlot(slot)}
                >
                  <Clock size={16} color={selectedSlot === slot ? '#FFFFFF' : theme.tint} />
                  <Text style={[
                    styles.slotText,
                    { color: theme.tint },
                    selectedSlot === slot && { color: '#FFFFFF' }
                  ]}>
                    {slot}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      <Animated.View entering={SlideInBottom.duration(500)} style={[styles.footer, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.secondaryAction, { backgroundColor: theme.accent }]}>
            <MessageSquare size={24} color={theme.tint} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.secondaryAction, { backgroundColor: theme.accent }]}>
            <Phone size={24} color={theme.tint} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.primaryAction, { backgroundColor: theme.tint, shadowColor: theme.tint }]} onPress={handleBook}>
            <Text style={styles.primaryActionText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  heroImage: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
    alignSelf: 'flex-start',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '500',
  },
  favoriteBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  locationText: {
    fontSize: 15,
    marginLeft: 6,
  },
  statsRow: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    marginBottom: 30,
    borderWidth: 1,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  statSeparator: {
    width: 1,
    height: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 10,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 30,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  slotChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    margin: 6,
    minWidth: 150,
    justifyContent: 'center',
  },
  slotText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    borderTopWidth: 1,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateSelector: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  dateChip: {
    width: 64,
    height: 80,
    borderRadius: 16,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dateDay: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  dateNum: {
    fontSize: 20,
    fontWeight: '700',
  },
  secondaryAction: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  primaryAction: {
    flex: 1,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
