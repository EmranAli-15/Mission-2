"use strict";
// export type TSchedules = {
//     startTime: string,
//     endTime: string,
//     days: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
// };
// export const hasTimeConflict = (assignSchedules: TSchedules, newSchedules: TSchedules) => {
//     assignSchedules.forEach((schedule) => {
//         const existStartTime = new Date(`1970-01-01T${schedule.startTime}`);
//         const existEndTime = new Date(`1970-01-01T${schedule.endTime}`);
//         const newStartTime = new Date(`1970-01-01T${newSchedules.startTime}`);
//         const newEndTime = new Date(`1970-01-01T${newSchedules.endTime}`);
//         if (newStartTime < existEndTime && newEndTime > existStartTime) {
//             return true;
//         };
//     });
//     return false;
// }
