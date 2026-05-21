import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/auth';

export default function LoginScreen() {
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { signIn } = useAuth();
  const router = useRouter();

  async function handleLogin() {
    if (!regNo.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await signIn(regNo.trim(), password);
      router.replace('/(tabs)');
    } catch (e: any) {
      setError(e.message ?? 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      {/* Background accent */}
      <View style={styles.accent} />

      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Logo */}
        <View style={styles.logoWrap}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logoImage}
            contentFit="contain"
          />
          <Text style={styles.logoName}>DB KIITEC</Text>
          <Text style={styles.logoTagline}>College Student Portal</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign in</Text>
          <Text style={styles.cardSub}>Use your registration number & password</Text>

          {/* Reg No */}
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>REG. NUMBER</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. KEC-NTA525-015"
              placeholderTextColor="#94a3b8"
              value={regNo}
              onChangeText={(t) => { setRegNo(t); setError(''); }}
              autoCapitalize="characters"
              autoCorrect={false}
              returnKeyType="next"
            />
          </View>

          {/* Password */}
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>PASSWORD</Text>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="••••••••"
                placeholderTextColor="#94a3b8"
                value={password}
                onChangeText={(t) => { setPassword(t); setError(''); }}
                secureTextEntry={!showPassword}
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPassword(!showPassword)}
                activeOpacity={0.7}
              >
                <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Error */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Submit */}
          <TouchableOpacity
            style={[styles.btn, loading && styles.btnDisabled]}
            onPress={handleLogin}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>© {new Date().getFullYear()} Don Bosco KIITEC · Arusha</Text>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fafaf8',
  },
  accent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: '#0f172a',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },

  // Logo
  logoWrap: {
    alignItems: 'center',
    marginBottom: 32,
    gap: 6,
  },
  logoImage: {
    width: 72,
    height: 72,
    marginBottom: 4,
  },
  logoName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 6,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  logoTagline: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.45)',
    letterSpacing: 0.5,
  },

  // Card
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 24,
    letterSpacing: 0.2,
  },

  // Fields
  fieldWrap: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 2,
    marginBottom: 6,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#0f172a',
    backgroundColor: '#f8fafc',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  passwordRow: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  eyeIcon: {
    fontSize: 16,
  },

  // Error
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginBottom: 12,
    fontWeight: '500',
  },

  // Button
  btn: {
    height: 50,
    backgroundColor: '#0f172a',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 14,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  btnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },
  forgotText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
  },

  // Footer
  footer: {
    textAlign: 'center',
    fontSize: 11,
    color: '#cbd5e1',
    marginTop: 24,
    letterSpacing: 0.3,
  },
});
