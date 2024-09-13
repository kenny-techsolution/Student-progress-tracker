db.createUser({
  user: "admin",
  pwd: "root",
  roles: [
    {
      role: "readWrite",
      db: "student_tracker_db",
    },
  ],
});
