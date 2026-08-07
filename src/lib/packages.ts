export const SUBSCRIPTION_PACKAGES = {
  single: {
    name: "باقة الترم الواحد",
    price: 100,
  },
  double: {
    name: "باقة الترمين الكاملة",
    price: 200,
  },
} as const;

export type SubscriptionPackageId = keyof typeof SUBSCRIPTION_PACKAGES;
