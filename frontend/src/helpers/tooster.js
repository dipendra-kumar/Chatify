export const showTooster = ({ toast, message, status }) => {
  toast({
    title: message,
    status: status,
    duration: 3000,
    isClosable: true,
    position: "top-right",
  });
};
