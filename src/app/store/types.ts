
export enum PrescriberType {
	Admin = 'Admin',
	SuperAdmin = 'SuperAdmin',
	User = 'User',
}

export interface Role {
  roleName: string;
  description: string | null;
}


export interface UserAuth {
  userId: string;
  name?: string;
  username: string;
  email: string;
  roles: Role[];
  traits?: any[];
  accessToken:string;
}