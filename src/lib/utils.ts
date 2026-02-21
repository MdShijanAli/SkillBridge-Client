import { clsx, type ClassValue } from "clsx";
import { useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTextlabel(label: string): string {
  return label
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}

export function getSerialNumber(
  index: number,
  currentPage: number = 1,
  pageSize: number = 10,
): number {
  return (currentPage - 1) * pageSize + index + 1;
}
