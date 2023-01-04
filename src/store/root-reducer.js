import { combineReducers } from "@reduxjs/toolkit";
import { reducer as calendarReducer } from "@slices/calendar";
import { reducer as chatReducer } from "@slices/chat";
import { reducer as kanbanReducer } from "@slices/kanban";
import { reducer as mailReducer } from "@slices/mail";
import { reducer as partnersReducer } from "@slices/partners";
import { reducer as rolesReducer } from "@slices/roles";
import { reducer as usersReducer } from "@slices/users";
import { reducer as clientsReducer } from "@slices/clients";

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  chat: chatReducer,
  kanban: kanbanReducer,
  mail: mailReducer,
  roles: rolesReducer,
  users: usersReducer,
  clients: clientsReducer,
  partners: partnersReducer,
});
