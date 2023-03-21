export interface IUsers {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    displayName: string;
    phone: string;
    distance?: number | null;
    address: string;
    addressLat: number;
    addressLng: number;
    currentLat?: number | null;
    currentLng?: number | null;
    squareCustomerId: string;
    fcmId: string;
    imageUrl: string;
    about: string;
    isProfileCompleted?: boolean | null;
    hasEmailNotification?: boolean | null;
    hasFirebaseNotification?: boolean | null;
    isDeleted?: boolean | null;
    isActive?: boolean | null;
    approvedFlag?: boolean | null;
    loginTypeId: number;
    withdrawBalance?: number | null;
    userType: string;
    difficulty: string;
    difficultyLevel: number;
}
