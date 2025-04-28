
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTip(billAmount: number, tipPercentage: number): number {
  return billAmount * (tipPercentage / 100);
}

export function splitBill(totalAmount: number, numberOfPeople: number): number {
  return totalAmount / numberOfPeople;
}
