import { combineReducers } from "@reduxjs/toolkit";
import { reducer as calendarReducer } from "@slices/calendar";
import { reducer as chatReducer } from "@slices/chat";
import { reducer as kanbanReducer } from "@slices/kanban";
import { reducer as mailReducer } from "@slices/mail";
import { reducer as partnersReducer } from "@slices/partners";
import { reducer as rolesReducer } from "@slices/roles";
import { reducer as usersReducer } from "@slices/users";
import { reducer as clientsReducer } from "@slices/clients";
import { reducer as couriersReducer } from "@slices/couriers";
import { reducer as bonusesReducer } from "@slices/bonuses";
import { reducer as pointsReducer } from "@slices/points";

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  chat: chatReducer,
  kanban: kanbanReducer,
  mail: mailReducer,
  roles: rolesReducer,
  users: usersReducer,
  clients: clientsReducer,
  couriers: couriersReducer,
  bonuses: bonusesReducer,
  points: pointsReducer,
  partners: partnersReducer,
});
