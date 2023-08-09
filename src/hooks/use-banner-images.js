import { useState, useEffect } from "react";
import crypto from "crypto-js";
import { key } from "@utils/axios";
import { API_URL } from "@utils/apiUrl";

const useBannersImageLoader = (items, imageKeyName) => {
  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const loadedImageArray = await Promise.all(
        items.map(async (item) => {
          try {
            const getMobileUrl = `/api/admin/banners/images/${item[imageKeyName][0].name}`;
            const encryptedMobileData = crypto.HmacSHA256(getMobileUrl, key);
            const accessToken = localStorage.getItem("accessToken");
            const mobileRequestHeaders = new Headers();

            mobileRequestHeaders.append(
              "Authorization",
              "Bearer " + accessToken
            );
            mobileRequestHeaders.append("Accept", "application/json");
            mobileRequestHeaders.append("X-RequestDigest", encryptedMobileData);

            const mobileRequestOptions = {
              method: "GET",
              headers: mobileRequestHeaders,
            };

            const mobileResponse = await fetch(
              API_URL + `/banners/images/${item[imageKeyName][0].name}`,
              mobileRequestOptions
            );

            if (!mobileResponse.ok) {
              throw new Error("Failed to load mobile image.");
            }

            const mobileImageBlob = await mobileResponse.blob();
            const mobileImageUrl = URL.createObjectURL(mobileImageBlob);

            const getDesktopUrl = `/api/admin/banners/images/${item[imageKeyName][1]?.name}`;
            const encryptedDesktopData = crypto.HmacSHA256(getDesktopUrl, key);
            const desktopRequestHeaders = new Headers();

            desktopRequestHeaders.append(
              "Authorization",
              "Bearer " + accessToken
            );
            desktopRequestHeaders.append("Accept", "application/json");
            desktopRequestHeaders.append(
              "X-RequestDigest",
              encryptedDesktopData
            );

            const desktopRequestOptions = {
              method: "GET",
              headers: desktopRequestHeaders,
            };

            const desktopResponse = await fetch(
              API_URL + `/banners/images/${item[imageKeyName][1].name}`,
              desktopRequestOptions
            );

            if (!desktopResponse.ok) {
              throw new Error("Failed to load desktop image.");
            }

            const desktopImageBlob = await desktopResponse.blob();
            const desktopImageUrl = URL.createObjectURL(desktopImageBlob);

            return {
              ...item,
              appImageUrl: mobileImageUrl,
              webImageUrl: desktopImageUrl,
            };
          } catch (error) {
            console.error("Error loading images:", error);
            return { ...item, appImageUrl: null, webImageUrl: null };
          }
        })
      );
      setLoadedImages(loadedImageArray);
    };

    fetchImages();
  }, [items, key]);

  return loadedImages;
};

export default useBannersImageLoader;
