export interface IUsers {
    Id: string;
    FirstName: string;
    LastName: string;
    Email: string;
    DisplayName: string;
    Phone: string;
    Distance?: number | null;
    Address: string;
    AddressLat: number;
    AddressLng: number;
    CurrentLat?: number | null;
    CurrentLng?: number | null;
    SquareCustomerId: string;
    FcmId: string;
    ImageUrl: string;
    About: string;
    IsProfileCompleted?: boolean | null;
    HasEmailNotification?: boolean | null;
    HasFirebaseNotification?: boolean | null;
    IsDeleted?: boolean | null;
    IsActive?: boolean | null;
    ApprovedFlag?: boolean | null;
    LoginTypeId: number;
    WithdrawBalance?: number | null;
    Difficulty: string;
    DifficultyLevel: number;
}