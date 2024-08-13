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
