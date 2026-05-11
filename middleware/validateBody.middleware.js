export const validateBody = (requiredFields) => {
  return (req, res, next) => {
    const missing = requiredFields.filter(
      (field) => req.body[field] === undefined || req.body[field] === "",
    );

    if (missing.length > 0) {
      return next({
        status: 400,
        message: `Missing required fields: ${missing.join(", ")}`,
      });
    }

    next();
  };
};
