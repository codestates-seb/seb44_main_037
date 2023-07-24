const createError = (status: number, message: string): Error => {
  const error: Error = new Error(message);

  return error;
};

export default createError;
