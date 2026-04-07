import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, useColorScheme } from 'react-native';
import { useAppContext } from '../../context/AppContext';
import { Calendar, Clock, XCircle } from 'lucide-react-native';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';

export default function AppointmentsScreen() {
  const { appointments, cancelAppointment } = useAppContext();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const handleCancel = (id: string, name: string) => {
    Alert.alert(
      'Cancel Appointment',
      `Are you sure you want to cancel your appointment with ${name}?`,
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes, Cancel', style: 'destructive', onPress: () => cancelAppointment(id) },
      ]
    );
  };

  const renderAppointment = ({ item, index }: { item: any, index: number }) => (
    <Animated.View entering={FadeInLeft.delay(index * 100)}>
      <View style={[styles.appointmentCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.cardHeader}>
          <View style={styles.providerInfo}>
            <Text style={[styles.providerName, { color: theme.text }]}>{item.providerName}</Text>
            <Text style={[styles.providerCategory, { color: theme.tint }]}>{item.providerCategory}</Text>
          </View>
          <TouchableOpacity 
            style={styles.cancelBtn}
            onPress={() => handleCancel(item.id, item.providerName)}
          >
            <XCircle size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>

        <View style={[styles.detailsContainer, { backgroundColor: theme.surface }]}>
          <View style={styles.detailItem}>
            <Calendar size={16} color={theme.subtitle} />
            <Text style={[styles.detailText, { color: theme.text }]}>{item.date}</Text>
          </View>
          <View style={[styles.detailSeparator, { backgroundColor: theme.border }]} />
          <View style={styles.detailItem}>
            <Clock size={16} color={theme.subtitle} />
            <Text style={[styles.detailText, { color: theme.text }]}>{item.slot}</Text>
          </View>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: colorScheme === 'dark' ? '#064E3B' : '#ECFDF5' }]}>
          <View style={[styles.statusDot, { backgroundColor: '#10B981' }]} />
          <Text style={[styles.statusText, { color: '#10B981' }]}>Upcoming Appointment</Text>
        </View>
      </View>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      {appointments.length > 0 ? (
        <FlatList
          data={appointments}
          renderItem={renderAppointment}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={[styles.emptyIconContainer, { backgroundColor: theme.background }]}>
            <Calendar size={60} color={theme.border} />
          </View>
          <Text style={[styles.emptyTitle, { color: theme.text }]}>No Appointments Yet</Text>
          <Text style={[styles.emptySubtitle, { color: theme.subtitle }]}>You haven't booked any services. Start exploring now!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  appointmentCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  providerCategory: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cancelBtn: {
    padding: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  detailSeparator: {
    width: 1,
    height: 16,
    marginHorizontal: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
