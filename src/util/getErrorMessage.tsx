const getErrorMessage = (error: unknown) => {
  let message = "Unknown Error";
  if (error instanceof Error) {
    message = error.message;
  } else {
    message = String(error);
  }
  return message;
};

export default getErrorMessage;
