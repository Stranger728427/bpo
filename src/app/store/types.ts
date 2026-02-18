export enum Role {
	PROVIDER = 'Provider',
	ADMIN = 'Admin',
	SUPER_ADMIN = 'SuperAdmin',
}

export enum PrescriberType {
	Admin = 'Admin',
	SuperAdmin = 'SuperAdmin',
	User = 'User',
}

export interface UserAuth {
	userId: string;
	name?: string;
	username: string;
	email: string;
	roles: Role[];
	userType?: PrescriberType | string;
}