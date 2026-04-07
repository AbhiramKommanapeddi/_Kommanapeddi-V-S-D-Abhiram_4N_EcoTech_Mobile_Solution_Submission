import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../../context/AppContext';
import { Settings, LogOut, ShieldCheck, HelpCircle, Bell, ChevronRight, UserCircle } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';

export default function ProfileScreen() {
  const { user, logout } = useAppContext();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: async () => {
          await logout();
          router.replace('/(auth)/login');
        }},
      ]
    );
  };

  const renderOption = (icon: any, title: string, subtitle: string, color: string) => (
    <TouchableOpacity 
      style={[styles.optionItem, { borderBottomColor: theme.surface }]} 
      activeOpacity={0.7}
    >
      <View style={[styles.optionIcon, { backgroundColor: color + '20' }]}>
        {icon}
      </View>
      <View style={styles.optionContent}>
        <Text style={[styles.optionTitle, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.optionSubtitle, { color: theme.subtitle }]}>{subtitle}</Text>
      </View>
      <ChevronRight size={20} color={theme.border} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.surface }]} showsVerticalScrollIndicator={false}>
      <Animated.View entering={FadeInUp} style={[styles.header, { backgroundColor: theme.card }]}>
        <View style={styles.profileInfo}>
          <View style={[styles.avatarContainer, { backgroundColor: theme.background, borderColor: theme.accent }]}>
            <UserCircle size={80} color={theme.tint} strokeWidth={1} />
          </View>
          <Text style={[styles.userName, { color: theme.text }]}>{user?.name || 'Guest User'}</Text>
          <Text style={[styles.userEmail, { color: theme.subtitle }]}>{user?.email || 'guest@example.com'}</Text>
          <TouchableOpacity style={[styles.editButton, { borderColor: theme.border }]}>
            <Text style={[styles.editButtonText, { color: theme.text }]}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Account Settings</Text>
        <View style={[styles.optionsList, { backgroundColor: theme.card, borderColor: theme.border }]}>
          {renderOption(<Bell size={22} color={theme.tint} />, 'Notifications', 'Manage alerts', theme.tint)}
          {renderOption(<ShieldCheck size={22} color="#10B981" />, 'Security', 'Privacy & data', '#10B981')}
          {renderOption(<Settings size={22} color={theme.subtitle} />, 'Preferences', 'Theme & settings', theme.subtitle)}
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>Support</Text>
        <View style={[styles.optionsList, { backgroundColor: theme.card, borderColor: theme.border }]}>
          {renderOption(<HelpCircle size={22} color="#F59E0B" />, 'Help Center', 'FAQs & support', '#F59E0B')}
        </View>

        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: colorScheme === 'dark' ? '#450a0a' : '#FEF2F2', borderColor: '#EF4444' }]} 
          onPress={handleLogout}
        >
          <LogOut size={22} color="#EF4444" />
          <Text style={[styles.logoutText, { color: '#EF4444' }]}>Log Out</Text>
        </TouchableOpacity>
        
        <Text style={[styles.versionText, { color: theme.subtitle }]}>Version 1.0.0 (Build 2406)</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  profileInfo: {
    alignItems: 'center',
    paddingTop: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 4,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 20,
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    marginTop: 24,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  optionsList: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  optionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    marginTop: 40,
    borderWidth: 1,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 24,
  },
});
