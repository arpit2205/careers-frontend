export const ToastConfig = (title, description, status) => {
  return {
    title,
    description,
    status,
    duration: 4000,
    isClosable: true,
  };
};
