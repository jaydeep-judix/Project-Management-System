export const successResponse = (
  data: any,
  meta: Record<string, any> = {}
) => {
  return {
    success: true,
    data,
    error: null,
    meta,
  };
};

export const errorResponse = (
  code: string,
  message: string,
  field: string | null = null,
  details: any = null
) => {
  return {
    success: false,
    data: null,
    error: {
      code,
      message,
      field,
      details,
    },
    meta: {},
  };
};
