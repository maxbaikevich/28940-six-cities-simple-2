import mongoose  from 'mongoose';
import {User} from '../../types/user.type.js';

export interface UserDocument extends User, mongoose.Document{
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    unique: true,
    required: true
  },
  avatar: String,
  password: String,
  userType: String,
},{
  timestamps: true
});

export const userModel = mongoose.model<UserDocument>('User', userSchema);
