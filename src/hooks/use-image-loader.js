import { useState, useEffect } from "react";
import crypto from "crypto-js";
import { key } from "@utils/axios";
import { API_URL } from "@utils/apiUrl";

const useImageLoader = (routeName, items, imageKeyName) => {
  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const loadedImageArray = await Promise.all(
        items.map(async (item) => {
          try {
            const getImageUrl = `/api/admin/${routeName}/images/${item[imageKeyName].name}`;
            const encryptedData = crypto.HmacSHA256(getImageUrl, key);
            const accessToken = localStorage.getItem("accessToken");
            const requestHeaders = new Headers();

            requestHeaders.append("Authorization", "Bearer " + accessToken);
            requestHeaders.append("Accept", "application/json");
            requestHeaders.append("X-RequestDigest", encryptedData);

            const requestOptions = {
              method: "GET",
              headers: requestHeaders,
            };

            const response = await fetch(
              API_URL + `/${routeName}/images/${item[imageKeyName].name}`,
              requestOptions
            );

            if (!response.ok) {
              throw new Error("Failed to load mobile image.");
            }

            const imageBlob = await response.blob();
            const imageUrl = URL.createObjectURL(imageBlob);

            return {
              ...item,
              imageUrl: imageUrl,
            };
          } catch (error) {
            console.error("Error loading images:", error);
            return { ...item, imageUrl: null };
          }
        })
      );
      setLoadedImages(loadedImageArray);
    };

    fetchImages();
  }, [items, key]);

  return loadedImages;
};

export default useImageLoader;
