
export interface IUser {
	_id: string;
	username: string;
	password: string;
	salt: string;
}

export interface IUserInputDTO {
	username: string;
	password: string;
	displayName: string;
}