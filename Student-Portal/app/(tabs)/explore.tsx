import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text, ScrollView, StatusBar } from 'react-native';
import { Fonts } from '@/constants/theme';

const STUDENT = {
  name: 'Stella Derano',
  id: 'KEC - NTA525 - 015',
  programme: 'Diploma in Electrical & Computer Engineering',
  year: 'Year 2',
  faculty: 'Computer Engineering',
  gpa: '3.84',
  credits: '94 / 120',
  status: 'Active',
  email: 'stelahderano@gmail.com',
  phone: '+255 700 000 000',
  photo: require('@/assets/images/stela.jpg'),
};

const INITIALS = STUDENT.name
  .split(' ')
  .map((n) => n[0])
  .join('');

const MODULES = [
  { code: 'CS 301', title: 'Algorithms & Data Structures', grade: 'A', credits: 4 },
  { code: 'CS 312', title: 'Operating Systems', grade: 'A−', credits: 3 },
  { code: 'CS 324', title: 'Database Systems', grade: 'B+', credits: 3 },
  { code: 'MT 211', title: 'Linear Algebra', grade: 'A', credits: 3 },
];

const GRADE_COLOR: Record<string, string> = {
  A: '#22c55e',
  'A−': '#4ade80',
  'B+': '#facc15',
  B: '#fb923c',
};

export default function ExploreScreen() {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Page label */}
        <Text style={styles.pageLabel}>STUDENT ACADEMIC INFORMATION</Text>

        {/* Profile row */}
        <View style={styles.profileRow}>
          <View style={styles.avatarWrap}>
            {STUDENT.photo ? (
              <Image
                source={STUDENT.photo}
                style={styles.avatar}
                contentFit="cover"
              />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarInitials}>{INITIALS}</Text>
              </View>
            )}
          </View>

          <View style={styles.profileMeta}>
            <Text style={styles.profileName}>{STUDENT.name}</Text>
            <Text style={styles.profileSub}>{STUDENT.programme}</Text>
            <View style={styles.statusPill}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{STUDENT.status}</Text>
            </View>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Key stats */}
        <View style={styles.statsRow}>
          <Stat label="GPA" value={STUDENT.gpa} />
          <View style={styles.statSep} />
          <Stat label="Credits" value={STUDENT.credits} />
          <View style={styles.statSep} />
          <Stat label="Year" value={STUDENT.year.replace('Year ', '')} suffix="nd" />
        </View>

        <View style={styles.divider} />

        {/* Details grid */}
        <Text style={styles.sectionLabel}>DETAILS</Text>
        <View style={styles.grid}>
          <DetailRow label="Student ID" value={STUDENT.id} mono />
          <DetailRow label="Faculty" value={STUDENT.faculty} />
          <DetailRow label="Email" value={STUDENT.email} mono />
          <DetailRow label="Phone" value={STUDENT.phone} mono />
        </View>

        <View style={styles.divider} />

        {/* Current modules */}
        <Text style={styles.sectionLabel}>CURRENT MODULES</Text>
        <View style={styles.moduleList}>
          {MODULES.map((m) => (
            <View key={m.code} style={styles.moduleRow}>
              <Text style={styles.moduleCode}>{m.code}</Text>
              <Text style={styles.moduleTitle} numberOfLines={1}>{m.title}</Text>
              <Text style={[styles.moduleGrade, { color: GRADE_COLOR[m.grade] ?? '#94a3b8' }]}>
                {m.grade}
              </Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

function Stat({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string;
  suffix?: string;
}) {
  return (
    <View style={styles.stat}>
      <View style={styles.statValueRow}>
        <Text style={styles.statValue}>{value}</Text>
        {suffix && <Text style={styles.statSuffix}>{suffix}</Text>}
      </View>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function DetailRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={[styles.detailValue, mono && styles.detailMono]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f4f6ff',
  },
  scroll: {
    paddingTop: Platform.OS === 'ios' ? 64 : 44,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },

  // Page label
  pageLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10,
    letterSpacing: 3,
    color: '#000000',
    marginBottom: 24,
  },

  // Profile
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  avatarWrap: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 8,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: 22,
    fontWeight: '700',
    color: '#64748b',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  profileMeta: {
    flex: 1,
    gap: 3,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    letterSpacing: -0.3,
  },
  profileSub: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
  },
  statusText: {
    fontSize: 11,
    color: '#22c55e',
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 20,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    letterSpacing: -1,
  },
  statSuffix: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 4,
    fontWeight: '600',
  },
  statLabel: {
    fontSize: 10,
    color: '#94a3b8',
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  statSep: {
    width: 1,
    height: 36,
    backgroundColor: '#e2e8f0',
  },

  // Details
  sectionLabel: {
    fontSize: 10,
    color: '#343435',
    letterSpacing: 2.5,
    fontWeight: '700',
    marginBottom: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  grid: {
    gap: 0,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  detailLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
    letterSpacing: 0.3,
    flex: 1,
  },
  detailValue: {
    fontSize: 13,
    color: '#1e293b',
    fontWeight: '600',
    flex: 2,
    textAlign: 'right',
  },
  detailMono: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 12,
    color: '#475569',
  },

  // Modules
  moduleList: {
    gap: 0,
  },
  moduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    gap: 10,
  },
  moduleCode: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 11,
    color: '#94a3b8',
    width: 56,
  },
  moduleTitle: {
    flex: 1,
    fontSize: 13,
    color: '#1e293b',
    fontWeight: '500',
  },
  moduleGrade: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    width: 28,
    textAlign: 'right',
  },
});
