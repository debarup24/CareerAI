import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    subscription: { type: Date, default: null },
    freeRequestsUsed: { type: Number, default: 0 },
}, {
    // to get created at & updated at
    timestamps: true,
});
// check user has active subscription or not 
userSchema.methods.hasProAccess = function () {
    return !!this.subscription && new Date() < new Date(this.subscription);
};
userSchema.methods.canMakeRequest = function () {
    return this.hasProAccess() || this.freeRequestsUsed < 5;
    // If they are Pro, and want to get a cap of 100 requests, not unlimited : 
    // if (this.hasProAccess()) {
    //     return this.freeRequestsUsed < 100; 
    // }
    // If they are a Free user, they get a cap of 5 requests
    // return this.freeRequestsUsed < 5;
};
export const User = mongoose.models.user || mongoose.model("User", userSchema);
