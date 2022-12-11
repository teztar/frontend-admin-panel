import { combineReducers } from "@reduxjs/toolkit";
import { reducer as calendarReducer } from "@slices/calendar";
import { reducer as chatReducer } from "@slices/chat";
import { reducer as kanbanReducer } from "@slices/kanban";
import { reducer as mailReducer } from "@slices/mail";
import { reducer as partnersReducer } from "@slices/partners";

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  chat: chatReducer,
  kanban: kanbanReducer,
  mail: mailReducer,
  partners: partnersReducer,
});
