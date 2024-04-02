export class Plan {
  type: planType;
  icon: string;
  duration: {
    monthly: {
      price: string;
      addToTotal: number;
      promo: number | null;
    }
    yearly: {
      price: string;
      addToTotal: number;
      promo: number | null;
    },
  }

}

export enum planType {
  ARCADE = 'arcade',
  ADVANCED = 'advanced',
  PRO = 'pro'
}

export enum timeFrame {
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export const planOptions: Plan[] = [
  {
    type: planType.ARCADE,
    icon: '/assets/images/icon-arcade.svg',
    duration: {
      monthly: {
        price: '$9/mo',
        addToTotal: 9,
        promo: null,
      },
      yearly: {
        price: '$90/yr',
        addToTotal: 90,
        promo: 2,
      },
    },
  },
  {
    type: planType.ADVANCED,
    icon: '/assets/images/icon-advanced.svg',
    duration: {
      monthly: {
        price: '$12/mo',
        addToTotal: 12,
        promo: null,
      },
      yearly: {
        price: '$120/yr',
        addToTotal: 120,
        promo: 2,
      },
    },
  },
  {
    type: planType.PRO,
    icon: '/assets/images/icon-pro.svg',
    duration: {
      monthly: {
        price: '$15/mo',
        addToTotal: 15,
        promo: null,
      },
      yearly: {
        price: '$150/yr',
        addToTotal: 150,
        promo: 2,
      },
    },
  },
];
