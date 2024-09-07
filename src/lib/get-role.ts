import { OrganizationRole } from "@/types";

export function getRole(role?: OrganizationRole) {
  switch (role) {
    case "admin":
      return "Администратор";
    case "moderator":
      return "Модератор";
    case "member":
      return "Работник";
    default:
      return "";
  }
}

export function getNextRole(
  role?: OrganizationRole,
): OrganizationRole | undefined {
  switch (role) {
    case "moderator":
      return "admin";
    case "member":
      return "moderator";
  }
}

export function getPrevRole(
  role?: OrganizationRole,
): OrganizationRole | undefined {
  switch (role) {
    case "admin":
      return "moderator";
    case "moderator":
      return "member";
  }
}
