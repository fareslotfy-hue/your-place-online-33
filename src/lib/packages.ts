export const SUBSCRIPTION_PACKAGES = {
  single: {
    name: "باقة الترم الواحد",
    price: 200,
  },
  double: {
    name: "باقة الترمين الكاملة",
    price: 300,
  },
} as const;

export type SubscriptionPackageId = keyof typeof SUBSCRIPTION_PACKAGES;
