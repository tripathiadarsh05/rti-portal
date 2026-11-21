function departmentMatches(left,right){
  if(!left||!right)return false;
  const normalize=(value)=>String(value).toLowerCase().replace(/\bdepartment\b/g,"").replace(/[^a-z]/g,"");
  return normalize(left)==normalize(right);
}

export function canManageApplication(user, application){
  if(user.role==="admin") return true;
  if(user.role!=="officer") return false;
  return String(application.assignedOfficer||"")===user.id ||
    departmentMatches(user.department,application.department) ||
    departmentMatches(user.department,application.recommendedDepartment);
}
