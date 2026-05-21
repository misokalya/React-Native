import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { useAuth } from '@/context/auth';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;

const STUDENT = {
  name: 'Stella Derano',
  id: 'KEC - NTA525-015',
  programme: 'Diploma in Electrical & Computer Engineering',
  year: 'Year 2 - SEM III',
  faculty: 'Faculty of Electrical & Computer Engineering',
  expires: 'Nov 2027',
  photo: require('@/assets/images/stela.jpg'),
};

const INITIALS = STUDENT.name
  .split(' ')
  .map((n) => n[0])
  .join('');

export default function StudentIDScreen() {
  const [flipped, setFlipped] = useState(false);
  const { signOut } = useAuth();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      {/* Top accent — matches login page dark header block */}
      <View style={styles.topAccent} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerLabel}>ACADEMIC PORTAL</Text>
          <Text style={styles.headerTitle}>Student Details</Text>
        </View>

        {/* Card */}
        <TouchableOpacity
          onPress={() => setFlipped(!flipped)}
          activeOpacity={0.92}
          style={styles.cardWrapper}
        >
          {!flipped ? <CardFront /> : <CardBack />}
        </TouchableOpacity>

        <Text style={styles.flipHint}>Tap card to flip</Text>

        {/* Info tiles */}
        <View style={styles.tilesRow}>
          <InfoTile icon="🎓" label="Programme" value={STUDENT.programme} />
          <InfoTile icon="📅" label="Year" value={STUDENT.year} />
        </View>
        <View style={styles.tilesRow}>
          <InfoTile icon="🏛️" label="Faculty" value={STUDENT.faculty} wide />
        </View>

        <TouchableOpacity onPress={signOut} style={styles.signOutBtn}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function CardFront() {
  return (
    <View style={styles.card}>
      {/* Top bar */}
      <View style={styles.cardTopBar}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.cardLogo}
          contentFit="contain"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.cardUniversityName}>Don Bosco KIITEC</Text>
          <Text style={styles.cardUniversityTagline}>Est. 2004 · Arusha, Tanzania</Text>
        </View>
        <View style={styles.cardChip}>
          <Image
            source={require('@/assets/images/mastercard.png')}
            style={styles.cardLogo}
            contentFit="contain"
          />
        </View>
      </View>

      {/* Divider */}
      <LinearGradient
        colors={['transparent', '#0f172a', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.cardDivider}
      />

      {/* Main content */}
      <View style={styles.cardBody}>
        <View style={styles.avatarWrapper}>
          {STUDENT.photo ? (
            <Image
              source={STUDENT.photo}
              style={styles.avatarImage}
              contentFit="cover"
              transition={300}
            />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{INITIALS}</Text>
            </View>
          )}
        </View>

        <View style={styles.cardDetails}>
          <Text style={styles.cardName}>{STUDENT.name}</Text>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>STUDENT</Text>
            </View>
            <View style={[styles.badge, styles.badgeGreen]}>
              <Text style={[styles.badgeText, styles.badgeTextGreen]}>ACTIVE</Text>
            </View>
          </View>
          <Text style={styles.cardIdLabel}>Student ID</Text>
          <Text style={styles.cardIdValue}>{STUDENT.id}</Text>
        </View>
      </View>

      {/* Bottom bar */}
      <View style={styles.cardBottom}>
        <Text style={styles.cardBottomText}>VALID THROUGH {STUDENT.expires}</Text>
        <View style={styles.cardBarcode}>
          {Array.from({ length: 22 }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.barcodeBar,
                { height: i % 3 === 0 ? 22 : i % 2 === 0 ? 16 : 12 },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

function CardBack() {
  return (
    <View style={[styles.card, styles.cardBack]}>
      <View style={styles.magneticStripe} />
      <View style={styles.backContent}>
        <Text style={styles.backTitle}>TERMS OF USE</Text>
        <Text style={styles.backBody}>
          This card is the property of Don Bosco KIITEC. It is non-transferable and must be
          presented upon request. Loss or theft must be reported immediately to the Registrar's
          office.
        </Text>
        <View style={styles.backDivider} />
        <View style={styles.backRow}>
          <View>
            <Text style={styles.backLabel}>Emergency Contact</Text>
            <Text style={styles.backValue}>+255 27 000 0000</Text>
          </View>
          <View>
            <Text style={styles.backLabel}>Registrar</Text>
            <Text style={styles.backValue}>admin@kiitec.ac.tz</Text>
          </View>
        </View>
        <View style={styles.backDivider} />
        <View style={styles.qrContainer}>
          <Image
            source={require('@/assets/images/qr-code.jpg')}
            style={styles.qrImage}
            contentFit="contain"
          />
          <Text style={styles.qrCaption}>Scan to verify</Text>
        </View>
      </View>
    </View>
  );
}

function InfoTile({
  icon, label, value, wide,
}: {
  icon: string; label: string; value: string; wide?: boolean;
}) {
  return (
    <View style={[styles.tile, wide && styles.tileWide]}>
      <Text style={styles.tileIcon}>{icon}</Text>
      <Text style={styles.tileLabel}>{label}</Text>
      <Text style={styles.tileValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#063a6b',
  },
  topAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '38%',
    backgroundColor: '#271e5f',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  scroll: {
    paddingTop: Platform.OS === 'ios' ? 64 : 44,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 24,
  },
  headerLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10,
    letterSpacing: 3,
    color: 'rgba(255,255,255,0.45)',
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    letterSpacing: -0.5,
  },
  cardWrapper: {
    borderRadius: 20,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 10,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  cardBack: {
    backgroundColor: '#f8fafc',
  },
  cardTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  cardLogo: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  cardUniversityName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#254183',
    letterSpacing: 1,
  },
  cardUniversityTagline: {
    fontSize: 10,
    color: '#272829',
    marginTop: 1,
  },
  cardChip: {
    marginLeft: 'auto',
    width: 32,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#c4952a',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e6b84a',
  },
  chipInner: {
    width: 20,
    height: 14,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#e6b84a',
  },
  cardDivider: {
    height: 1,
    marginBottom: 18,
  },
  cardBody: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  avatarWrapper: {
    width: 72,
    height: 72,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#e2e8f0',
  },
  avatarImage: {
    width: 72,
    height: 72,
  },
  avatar: {
    width: 72,
    height: 72,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#64748b',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  cardDetails: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  badgeGreen: {
    backgroundColor: '#f0fdf4',
    borderColor: '#bbf7d0',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#3b82f6',
    letterSpacing: 1,
  },
  badgeTextGreen: {
    color: '#16a34a',
  },
  cardIdLabel: {
    fontSize: 10,
    color: '#94a3b8',
    letterSpacing: 1,
    marginBottom: 2,
  },
  cardIdValue: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 13,
    color: '#0f172a',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 12,
  },
  cardBottomText: {
    fontSize: 9,
    color: '#1c1c1d',
    letterSpacing: 1,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  cardBarcode: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  barcodeBar: {
    width: 2,
    backgroundColor: '#404346',
    borderRadius: 1,
  },
  magneticStripe: {
    height: 42,
    backgroundColor: '#1e293b',
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  backContent: {
    flex: 1,
  },
  backTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3b82f6',
    letterSpacing: 2,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  backBody: {
    fontSize: 11,
    color: '#64748b',
    lineHeight: 17,
  },
  backDivider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 14,
  },
  backRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backLabel: {
    fontSize: 9,
    color: '#94a3b8',
    letterSpacing: 1,
    marginBottom: 2,
  },
  backValue: {
    fontSize: 12,
    color: '#0f172a',
    fontWeight: '600',
  },
  qrContainer: {
    alignItems: 'center',
    gap: 6,
  },
  qrImage: {
    width: 64,
    height: 64,
    borderRadius: 6,
  },
  qrCaption: {
    fontSize: 10,
    color: '#94a3b8',
    letterSpacing: 1,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  flipHint: {
    textAlign: 'center',
    fontSize: 11,
    color: '#94a3b8',
    letterSpacing: 1,
    marginTop: 10,
    marginBottom: 24,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  tilesRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  tile: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  tileWide: {
    flex: 1,
  },
  tileIcon: {
    fontSize: 18,
    marginBottom: 6,
  },
  tileLabel: {
    fontSize: 10,
    color: '#94a3b8',
    letterSpacing: 0.8,
    marginBottom: 3,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  tileValue: {
    fontSize: 13,
    color: '#0f172a',
    fontWeight: '600',
  },
  signOutBtn: {
    marginTop: 8,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  signOutText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 0.5,
  },
});
