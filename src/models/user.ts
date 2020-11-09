import { IUser } from '../interfaces/IUser';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true],
			index: true,
		},
		password: {
			type: String,
		},
		displayName: {
			type: String,
		}
	},
);

export default mongoose.model<IUser & mongoose.Document>('users', User);