
export interface User {
  _id?: string,
  name?: string,
  lastName?: string,
  email: string,
  password: string,
  pet?: {
    name: string;
    feedingSchedule: {
      monday: [{
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true }
      }],
      tuesday: [{
        startTime: { type:  Date, required: true },
        endTime: { type:  Date, required: true }
      }],
      wednesday: [{
        startTime: { type:  Date, required: true },
        endTime: { type:  Date, required: true }
      }],
      thursday: [{
        startTime: { type:  Date, required: true },
        endTime: { type:  Date, required: true }
      }],
      friday: [{
        startTime: { type:  Date, required: true },
        endTime: { type:  Date, required: true }
      }],
      saturday: [{
        startTime: { type:  Date, required: true },
        endTime: { type:  Date, required: true }
      }],
      sunday: [{
        startTime: { type:  Date, required: true },
        endTime: { type:  Date, required: true }
      }],
    };
  },
}

