import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/(tabs)/LoginPage'); // go to login first
  }, []);

  return null; // show nothing while redirecting
}
