import { Schema, model, models, Document } from 'mongoose';

// TypeScript interface for Project document
export interface IFeedback extends Document {
  content: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>(
  {
    content: {
      type: String,
      required: [true, 'Feedback content is required'],
      trim: true,
      maxlength: [1000, 'content cannot exceed 1000 characters'],
    },
    name: {
      type: String,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
   
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);


const Feedback = models.Feedback || model<IFeedback>('Feedback', FeedbackSchema);

export default Feedback;
