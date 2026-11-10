// A student belongs to a course when their department and the course name
// match (case-insensitive, either may contain the other),
// e.g. "Electronics" matches "Electronics Engineering".
export function matchesCourse(department = "", courseName = "") {
  const d = department.trim().toLowerCase();
  const c = courseName.trim().toLowerCase();
  if (!d || !c) return false;
  return d === c || d.includes(c) || c.includes(d);
}
