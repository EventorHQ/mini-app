import { retrieveLaunchParams, User } from "@telegram-apps/sdk-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBottomPadding() {
  const lp = retrieveLaunchParams();

  return ["ios", "android", "android_x"].includes(lp.platform)
    ? "pb-8"
    : "pb-0";
}

export function getTelegramAvatar(username?: string) {
  return `https://t.me/i/userpic/320/${username}.jpg`;
}

export function getAcronym(user: User) {
  const lastName = user.lastName || " ";
  return user.firstName[0] + lastName[0];
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
