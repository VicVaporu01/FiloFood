export interface Jwtres {
  _id?: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  pet: {
    name: string;
    feedingSchedule: {
      monday: [{
        startTime: Date;
        endTime: Date;
      }];
      tuesday: [{
        startTime: Date;
        endTime: Date;
      }];
      wednesday: [{
        startTime: Date;
        endTime: Date;
      }];
      thursday: [{
        startTime: Date;
        endTime: Date;
      }];
      friday: [{
        startTime: Date;
        endTime: Date;
      }];
      saturday: [{
        startTime: Date;
        endTime: Date;
      }];
      sunday: [{
        startTime: Date;
        endTime: Date;
      }];
    };
  };
  token: string; // Actualizado: usar 'token' en lugar de 'accessToken'
  expiresIn: string;
}
