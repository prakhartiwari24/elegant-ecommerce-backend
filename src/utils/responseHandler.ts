export function sendSuccessResponse(message: string, data: any) {
  return {
    status: "success",
    message: message,
    data: data,
  };
}
