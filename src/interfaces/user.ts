export interface IUser extends ResponseStatus {
    id: string;
    firstName: string;
    lastName: string;
    gender: boolean | null;
    birthDate: Date | null;
    zipCode: string;
    suite: string;
    country: string;
    province: string;
    city: string;
    password: string;
    email: string;
    displayName: string;
    phone: string;
    distance: number | null;
    distanceType: string;
    isAppuser: boolean | null;
    facebookId: number;
    isFacebookuser: boolean | null;
    facebookAccessToken: string;
    googleId: number | null;
    isGoogleuser: boolean | null;
    googleAccessToken: string;
    isAppleUser: boolean | null;
    appleUserId: string;
    appleIdentityToken: string;
    approvedFlag: boolean | null;
    approvedBy: string;
    approvalDate: Date | null;
    isActive: boolean | null;
    isDeleted: boolean | null;
    hasEmailNotification: boolean | null;
    hasFirebaseNotification: boolean | null;
    imageBinary: string;
    activationCode: string | null;
    address: string;
    addressLatLng: string;
    addressLat: number;
    addressLng: number;
    currentLocationLatLng: string;
    currentLat: number;
    currentLng: number;
    squareCustomerId: string;
    fcmId: string;
    imageUrl: string;
    about: string;
    isProfileCompleted: boolean | null;
    loginType: LoginType;
    loginTypeId: string;
    withdrawBalance: number;
    bookings: Booking[];
    userRoles: UserRoles[];
}

enum LoginType {
    Facebook = 0,
    Google = 1,
    Apple = 2,
    EmailAndPassword = 3
}
