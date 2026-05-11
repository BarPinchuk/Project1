/*
 * Validate Body Middleware
 *
 * factory function - מקבלת רשימת שדות חובה ומחזירה middleware.
 * אם חסר שדה, זורקת שגיאת 400 לפני שה-controller בכלל רץ.
 *
 * שימוש:
 *   router.post("/", validateBody(["title", "description", "priority"]), createTask);
 */
 
export const validateBody = (requiredFields) => {
  return (req, res, next) => {
    const missing = requiredFields.filter(
      (field) => req.body[field] === undefined || req.body[field] === ""
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