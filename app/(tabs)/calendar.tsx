import AppButton from "@/components/AppButton";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Modal from "react-native-modal";

export default function Example() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    if (!isModalVisible && images.length === 0) {
      fetchImages(1);
    }
  };

  const fetchImages = async (pageNum: number) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNum}&limit=3`
      );
      const data = await response.json();

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setImages((prevImages) => [...prevImages, ...data]);
        setPage(pageNum);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreImages = () => {
    if (!loading && hasMore) {
      fetchImages(page + 1);
    }
  };

  const renderImageItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={{ uri: item.download_url }}
        contentFit="cover"
        transition={200}
      />
      <Text style={styles.authorText}>Photo by {item.author}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnConainer}>
        <AppButton title="Show Images" onPress={toggleModal} />
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={handleCloseModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Image Gallery</Text>
          </View>
          <FlatList
            data={images}
            renderItem={renderImageItem}
            keyExtractor={(item) => item.id}
            onEndReached={loadMoreImages}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={true}
            bounces={true}
            scrollEventThrottle={16}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  btnConainer: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "90%",
  },
  modalHeader: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 250,
  },
  authorText: {
    padding: 12,
    fontSize: 14,
    color: "#666",
    backgroundColor: "#f9f9f9",
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },
});
