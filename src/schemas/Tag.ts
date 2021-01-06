import mongoose, {Document, Schema, Model}from 'mongoose'

export type Tag = Document & {};

const TagSchema = new Schema(
    {
        title:{
            type: String,
            lowercase: true,
            trim: true,
            unique: true,
            required: true,
        }, 
    },
    {
        timestamps: true,
    },
);

export default mongoose.model<Tag>('Tag', TagSchema);
