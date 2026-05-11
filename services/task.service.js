/*
 * מדוע הפרדת הלוגיקה העסקית לשכבת ה-Service מאפשרת גמישות?
 *
 * שכבת ה-Service לא מכירה את Express בכלל - היא לא יודעת מה זה req/res.
 * היא מקבלת נתונים רגילים ומחזירה נתונים רגילים.
 * לכן אם נעבור מ-Express ל-Fastify או NestJS - ה-Service לא ישתנה בכלל,
 * רק ה-Controller ישתנה (כי הוא זה שמתרגם את הפרוטוקול).
 *
 * לגבי Unit Tests - קל לבדוק את ה-Service בנפרד כי אפשר פשוט לקרוא
 * לפונקציה עם נתונים ולבדוק מה חוזר, בלי להרים שרת בכלל.
 */

const tasks = [];

export const createNewTask = ({ ownerId, title, description, priority }) => {
  if (!ownerId) {
    throw { status: 400, message: "ownerId is required" };
  }
  if (!title || !description || !priority) {
    throw {
      status: 400,
      message: "title, description and priority are required",
    };
  }

  const validPriorities = ["low", "medium", "high"];
  if (!validPriorities.includes(priority)) {
    throw { status: 400, message: "priority must be low, medium or high" };
  }

  const existingTask = tasks.find(
    (task) => task.ownerId === ownerId && task.title === title
  );
  if (existingTask) {
    throw {
      status: 400,
      message: "Task with this title already exists for this user",
    };
  }

  const userTasks = tasks.filter((task) => task.ownerId === ownerId);
  const nextId =
    userTasks.length > 0 ? Math.max(...userTasks.map((task) => task.id)) + 1 : 1;

  const newTask = {
    id: nextId,
    ownerId,
    title: title.trim(),
    description: description.trim(),
    status: "pending",
    priority,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  return newTask;
};

export const getTasksByOwner = (ownerId) => {
  return tasks.filter((task) => task.ownerId === ownerId);
};

export const getTaskById = (ownerId, taskId) => {
  const task = tasks.find(
    (task) => task.ownerId === ownerId && task.id === Number(taskId)
  );
  if (!task) {
    throw { status: 404, message: "Task not found" };
  }
  return task;
};

export const updateTask = (ownerId, taskId, updates) => {
  const task = getTaskById(ownerId, taskId);

  const { title, description, status, priority } = updates;

  const validStatuses = ["pending", "in-progress", "done"];
  const validPriorities = ["low", "medium", "high"];

  if (status && !validStatuses.includes(status)) {
    throw { status: 400, message: "status must be pending, in-progress or done" };
  }
  if (priority && !validPriorities.includes(priority)) {
    throw { status: 400, message: "priority must be low, medium or high" };
  }

  if (title) task.title = title.trim();
  if (description) task.description = description.trim();
  if (status) task.status = status;
  if (priority) task.priority = priority;
  task.updatedAt = new Date().toISOString();

  return task;
};

export const deleteTask = (ownerId, taskId) => {
  const taskIndex = tasks.findIndex(
    (task) => task.ownerId === ownerId && task.id === Number(taskId)
  );
  if (taskIndex === -1) {
    throw { status: 404, message: "Task not found" };
  }
  const deleted = tasks.splice(taskIndex, 1);
  return deleted[0];
};