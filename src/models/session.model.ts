import mongoose, { Document } from 'mongoose';

import { UserDocument } from './user.model';

export interface SessionDocument extends Document {
  user: UserDocument['_id'];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    valid: {
      type: Boolean,
      default: true,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model<SessionDocument>('Session', SessionSchema);

export default Session;
