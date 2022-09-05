import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

export interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updateAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// hash password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
  const hash = await bcrypt.hashSync(this.password, salt);
  this.password = hash;

  return next();
});

// compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password).catch((e) => false);
};

const User = mongoose.model('User', UserSchema);

export default User;
