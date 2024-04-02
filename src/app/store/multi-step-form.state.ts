export interface MultiStepFormValue {
    personalDetails?: {
        name: string | null;
        email: string | null;
        phone: string | null;
    },
    planDetails?: {
        plan: string;
        duration: string;
        planCost: number;
        totalCost: number;
    },
    addOnDetails?: {
        service: boolean;
        serviceCost: number;
        storage: boolean;
        storageCost: number;
        customization: boolean;
        customizationCost: number;
    }
}

export const stepFormState: MultiStepFormValue = {
    personalDetails: {
        name: null,
        email: null,
        phone: null
    },
    planDetails: {
        plan: 'arcade',
        duration: 'monthly',
        planCost: 9,
        totalCost: 9
    },
    addOnDetails: {
        service: false,
        serviceCost: 0,
        storage: false,
        storageCost: 0,
        customization: false,
        customizationCost: 0
    }
}