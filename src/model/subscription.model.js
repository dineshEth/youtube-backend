import mongoose, { Schema } from "mongoose";


const subscription = new Schema(
    {
        subscriber: {
            type:mongoose.Types.ObjectId,
            ref:"User"
        },
        channel:{
            type:mongoose.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true
    }
);


export const Subscription = mongoose.model("Subscription",subscription);

//** Explaination */
//* Subscriber is a user who has subscribed channels
/* Dinesh is user and he has subscribed to channels: freecodecamp, jsmastry, alachemy, shanny etc */
//* Channel is a user who has subscribers 
/** freecodecamp is a channel (user) is subscribed by users (Subscribers): Dinesh, Ravi, krishna etc */