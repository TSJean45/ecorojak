import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera/legacy';

const MindarLens = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar translucent backgroundColor="transparent" />
      
      <Camera style={{ flex: 1 }}>
        
        {/* Marker in center of screen */}
        <TouchableOpacity 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -32,
            marginLeft: -32,
            width: 64,
            height: 64,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => setModalVisible(true)}
        >
          <View style={{
            width: 64,
            height: 64,
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 32,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <View style={{
              width: 12,
              height: 12,
              backgroundColor: 'white',
              borderRadius: 6,
            }} />
          </View>
        </TouchableOpacity>

        {/* Back button */}
        <SafeAreaView style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 16,
          }}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: 'rgba(255,255,255,0.8)',
                borderRadius: 20,
                padding: 8,
              }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Camera>

      {/* Restaurant Info Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: 'flex-end'
        }}>
          <View style={{
            paddingHorizontal: 16,
            marginBottom: 0,
            position: 'relative',
          }}>
            <TouchableOpacity 
              style={{
                position: 'absolute',
                top: 80,
                right: 24,
                zIndex: 1,
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderRadius: 20,
                padding: 8,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>

            <Image
              source={require('../../assets/images/modal.png')}
              style={{
                width: '100%',
                height: 400,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MindarLens; 