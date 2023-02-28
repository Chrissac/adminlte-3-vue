interface UserRoles {
    roleId: number;
    isPrimaryRole?: boolean;
    roleName: string;
    roleType: string;
    description: string;
    imageUrl?: string;
    imageThumb?: string;
    isSportsRole?: boolean;
    sportType?: string;
    difficultyDataXml?: string | null;
    difficultyDataJSON?: string | null;
    minimumAmount?: number;
    revenueCharge?: number;
    controllerLink?: string;
    fontAwesome?: string;
    easyName?: string;
    userRoleId?: number;
    userId: string;
    isActive: boolean;
    difficulty: string;
    difficultyLevel: number;
    gamesPlayed: number;
    badgeDescription?: string;
}
