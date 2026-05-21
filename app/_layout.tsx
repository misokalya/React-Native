import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useRef } from 'react';
import { AuthProvider, useAuth } from '@/context/auth';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Guard />
    </AuthProvider>
  );
}

function Guard() {
  const { isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const mounted = useRef(false);

  useEffect(() => {
    // Let the Slot render at least once before navigating
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    const inTabs = segments[0] === '(tabs)';

    if (!isSignedIn && inTabs) {
      router.replace('/login');
    } else if (isSignedIn && segments[0] === 'login') {
      router.replace('/(tabs)');
    }
  }, [isSignedIn, segments]);

  return <Slot />;
}
