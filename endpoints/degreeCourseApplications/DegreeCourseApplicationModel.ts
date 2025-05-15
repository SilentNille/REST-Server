import { Schema, model } from 'mongoose';

export interface IDegreeCourseApplication {
  id?: string;
  applicantUserID: string;
  degreeCourseID: string;
  targetPeriodYear: number;
  targetPeriodShortName: string;
}

const degreeCourseApplicationSchema = new Schema<IDegreeCourseApplication>({
  applicantUserID: { type: String, required: true },
  degreeCourseID: { type: String, required: true },
  targetPeriodYear: { type: Number, required: true },
  targetPeriodShortName: { type: String, required: true, enum: ['WiSe', 'SoSe'] },
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

degreeCourseApplicationSchema.index(
  {
    applicantUserID: 1,
    degreeCourseID: 1,
    targetPeriodYear: 1,
    targetPeriodShortName: 1
  },
  { unique: true }
);

export const DegreeCourseApplication = model<IDegreeCourseApplication>(
  'DegreeCourseApplication',
  degreeCourseApplicationSchema
);
