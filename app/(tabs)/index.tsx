import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function Index() {
  const [torchOn, setTorchOn] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }

    Accelerometer.setUpdateInterval(200);

    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const intensity = Math.abs(x) + Math.abs(y) + Math.abs(z);

      if (intensity > 2.5) {
        setTorchOn(true);
      } else {
        setTorchOn(false);
      }
    });

    return () => subscription.remove();
  }, [permission]);

  return (
    <View style={styles.container}>
      {/* Camera invisível apenas para usar a lanterna */}
      <CameraView
        style={{ width: 1, height: 1 }}
        enableTorch={torchOn}
      />

      <Text style={styles.title}> LANTERNA AUTOMÁTICA ACELERÔMETRO</Text>

      <Text style={styles.text}>
        Lanterna: {torchOn ? 'Ligada ' : 'Desligada'}
      </Text>

      <Text style={styles.info}>
        Sacuda o celular para ligar a lanterna.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b16ac7b6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    color: '#141313',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: '#121010',
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: '#1a1515',
  },
});
