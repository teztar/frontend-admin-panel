export const customFetch = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const requestHeaders = new Headers();

    requestHeaders.append("Authorization", "Bearer " + accessToken);
    requestHeaders.append("Accept", "application/json");

    const requestOptions = {
      method: "POST",
      headers: requestHeaders,
      body: values,
      redirect: "follow",
    };

    const response = await fetch(
      baseUrl + "/push_notifications/new",
      requestOptions
    );

    if (response.ok) {
      return response.json().then((data) => {
        toast.success("Фотографии успешно сохранились");
        return toCamelCaseFormat(data);
      });
    }

    if (!response.ok) {
      return response.json().then((data) => {
        const errors = () =>
          data?.map((item) => {
            return Object.values(item).map((err) => {
              return toast.error(err, {
                duration: 10000,
              });
            });
          });

        errors();
      });
    }
  } catch (error) {
    error.messages.map((message) => {
      return {
        image: toast.error(message.image[0]),
        client_id: toast.error(message.client_id[0]),
      };
    });
    return rejectWithValue(error.messages);
  }
};
