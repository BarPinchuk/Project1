/*
 * Error Handler Middleware
 *
 * מקבל שגיאות שנזרקו מה-Controllers דרך next(err),
 * ומחזיר תגובה אחידה ומסודרת ללקוח.
 *
 * יתרון: לוגיקת טיפול השגיאות כתובה פעם אחת בלבד -
 * במקום לשכפל try/catch בכל controller.
 */
 
export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
 
  res.status(status).json({ message });
};