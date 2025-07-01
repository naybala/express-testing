export function successResponse(
  res,
  data = [] || {},
  code = 200,
  message = "Success"
) {
  return res.status(200).json({
    success: true,
    code: code,
    message,
    data,
  });
}

export function errorResponse(
  res,
  code = 500,
  error = {},
  message = "Internal Server Error"
) {
  console.error("Failed to fetch products:", error);
  return res.status(code).json({
    success: false,
    code: code,
    message,
  });
}
