import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";

export default function Routes() {
  const router = useRouter();
  const { service } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Example route data - replace with actual routes
  const routes = {
    ktm: [
      {
        id: "ktm1",
        name: "Port Klang Line",
        stations: ["KL Sentral", "Kuala Lumpur", "Bank Negara", "Putra", "Segambut", "Kepong", "Kepong Sentral", "Sungai Buloh", "Padang Jawa", "Shah Alam", "Klang", "Port Klang"],
        color: "#DC2626",
      },
      {
        id: "ktm2",
        name: "Seremban Line",
        stations: ["KL Sentral", "Bandar Tasik Selatan", "Serdang", "UKM", "Kajang", "Bangi", "Nilai", "Labu", "Seremban"],
        color: "#DC2626",
      },
      {
        id: "ktm3",
        name: "Skypark Line",
        stations: ["KL Sentral", "Subang Jaya", "Terminal Skypark"],
        color: "#DC2626",
      }
    ],
    rapidkl: [
      {
        id: "rkl1",
        name: "Route 780",
        route: "Sri Nilam - Pasar Seni",
        stops: ["Sri Nilam", "Taman Wahyu", "Batu Caves", "Sentul", "PWTC", "Chow Kit", "Pasar Seni"],
        color: "#CA8A04",
      },
      {
        id: "rkl2",
        name: "Route 420",
        route: "Puchong - Shah Alam",
        stops: ["IOI Mall Puchong", "Bandar Puteri", "Subang Parade", "Shah Alam Stadium", "Shah Alam"],
        color: "#CA8A04",
      },
      {
        id: "rkl3",
        name: "Route 300",
        route: "Ampang Point - KLCC",
        stops: ["Ampang Point", "Ampang Park", "KLCC"],
        color: "#CA8A04",
      }
    ],
    rapidpenang: [
      {
        id: "rpg1",
        name: "Route 101",
        route: "Weld Quay - Teluk Bahang",
        stops: ["Weld Quay", "KOMTAR", "Gurney Drive", "Tanjung Tokong", "Batu Ferringhi", "Teluk Bahang"],
        color: "#9333EA",
      },
      {
        id: "rpg2",
        name: "Route 102",
        route: "Balik Pulau - KOMTAR",
        stops: ["Balik Pulau", "Teluk Kumbar", "Bayan Lepas", "KOMTAR"],
        color: "#9333EA",
      }
    ],
    rapidjohor: [
      {
        id: "rjb1",
        name: "Route P-101",
        route: "Larkin - JB Sentral",
        stops: ["Larkin", "City Square", "JB Sentral"],
        color: "#7C3AED",
      },
      {
        id: "rjb2",
        name: "Route P-102",
        route: "Perling Mall - AEON Tebrau",
        stops: ["Perling Mall", "Skudai", "AEON Tebrau"],
        color: "#7C3AED",
      }
    ],
    rapidkuantan: [
      {
        id: "rkt1",
        name: "Route 100",
        route: "Kuantan Sentral - Teluk Cempedak",
        stops: ["Kuantan Sentral", "Kuantan City", "Teluk Cempedak"],
        color: "#B45309",
      },
      {
        id: "rkt2",
        name: "Route 200",
        route: "Kuantan Parade - Gebeng",
        stops: ["Kuantan Parade", "Taman Tas", "Gebeng Industrial"],
        color: "#B45309",
      }
    ],
    mrt: [
      {
        id: "mrt1",
        name: "Kajang Line (MRT1)",
        stations: ["Kwasa Damansara", "Kampung Selamat", "Sungai Buloh", "Damansara Damai", "Sri Damansara Barat", "Sri Damansara Timur", "Metro Prima", "Kepong Baru", "Jinjang", "Sri Delima", "Kampung Batu", "Kentonmen", "Jalan Ipoh", "Sentul Barat", "Titiwangsa", "HKL", "Raja Uda", "Ampang Park", "KLCC East", "Conlay", "Tun Razak Exchange", "Chan Sow Lin", "Sungai Besi", "Serdang Raya", "Serdang Jaya", "UPM", "Taman Equine", "Putra Permai", "Taman Pertama", "Kajang"],
        color: "#2563EB"
      },
      {
        id: "mrt2",
        name: "Putrajaya Line (MRT2)",
        stations: ["Kwasa Damansara", "Kampung Selamat", "Sungai Buloh", "Damansara Damai", "Cyberjaya Utara", "Cyberjaya City Centre", "Putrajaya Sentral"],
        color: "#2563EB"
      }
    ],
    lrt: [
      {
        id: "lrt1",
        name: "Kelana Jaya Line",
        stations: ["Gombak", "Taman Melati", "Wangsa Maju", "Sri Rampai", "Jelatek", "Setiawangsa", "KLCC", "Ampang Park", "KL Sentral", "Universiti", "Asia Jaya", "Taman Paramount", "Kelana Jaya", "Lembah Subang", "Ara Damansara", "Glenmarie", "Subang Jaya", "USJ 21", "Alam Megah", "Putra Heights"],
        color: "#16A34A"
      },
      {
        id: "lrt2",
        name: "Ampang Line",
        stations: ["Ampang", "Cahaya", "Cempaka", "Pandan Indah", "Pandan Jaya", "Maluri", "Miharja", "Chan Sow Lin", "Plaza Rakyat", "Masjid Jamek", "Bandaraya", "Sultan Ismail", "PWTC", "Titiwangsa", "Sentul", "Sentul Timur"],
        color: "#16A34A"
      },
      {
        id: "lrt3",
        name: "Sri Petaling Line",
        stations: ["Chan Sow Lin", "Pudu", "Maluri", "Miharja", "Cheras", "Salak Selatan", "Bandar Tun Razak", "Bandar Tasik Selatan", "Sungai Besi", "Bukit Jalil", "Sri Petaling"],
        color: "#16A34A"
      }
    ]
  };

  const filteredRoutes = routes[service]?.filter((route) =>
    route.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getServiceName = () => {
    const names = {
      ktm: "KTM",
      rapidkl: "RapidKL Bus",
      rapidpenang: "RapidPenang",
      rapidjohor: "RapidJohor",
      rapidkuantan: "RapidKuantan",
      mrt: "MRT",
      lrt: "LRT"
    };
    return names[service] || "";
  };

  return (
    <View className="flex-1 bg-white">
      <Header
        title={`${getServiceName()} Routes`}
        leftButton={{
          icon: "arrow-back",
          onPress: () => router.back(),
        }}
      />

      <View className="flex-1 px-4">
        {/* Search Bar */}
        <View className="mb-4">
          <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2">
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              className="flex-1 ml-2"
              placeholder="Search routes..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView className="flex-1">
          {filteredRoutes?.map((route) => (
            <TouchableOpacity
              key={route.id}
              className="bg-white border border-gray-200 rounded-xl p-4 mb-3"
              onPress={() => {
                const stations = route.stations || route.stops;
                if (stations && stations.length >= 2) {
                  const routeData = {
                    name: route.name,
                    stations: stations
                  };
                  router.push({
                    pathname: `/transittogether/${service}`,
                    params: { 
                      selectedRoute: JSON.stringify(routeData)
                    }
                  });
                }
              }}
            >
              <View className="flex-row items-center">
                <View
                  className="w-2 h-12 rounded-full mr-3"
                  style={{ backgroundColor: route.color }}
                />
                <View className="flex-1">
                  <Text className="text-lg font-semibold">{route.name}</Text>
                  <Text className="text-gray-500 mt-1">
                    {route.route || route.stations?.join(" → ")}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#666" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}