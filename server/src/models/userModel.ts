import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  subscription: Date | null;
  freeRequestsUsed: number;
  
  hasProAccess() : boolean;
  canMakeRequest(): boolean;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: {type: String, required: true},
    subscription: { type: Date, default: null },
    freeRequestsUsed: { type: Number, default: 0 },
    
  },
  {
    // to get created at & updated at
    timestamps: true,
  }
);

// check user has active subscription or not 
userSchema.methods.hasProAccess = function(this: IUser): boolean {
    return !!this.subscription && new Date() < new Date(this.subscription) ;
}

userSchema.methods.canMakeRequest = function(this: IUser): boolean {
    return this.hasProAccess() || this.freeRequestsUsed < 5 ;

    // If they are Pro, and want to get a cap of 100 requests, not unlimited : 
    // if (this.hasProAccess()) {
    //     return this.freeRequestsUsed < 100; 
    // }
    
    // If they are a Free user, they get a cap of 5 requests
    // return this.freeRequestsUsed < 5;
}

export const User = mongoose.models.user as Model<IUser> || mongoose.model<IUser>("User", userSchema);


