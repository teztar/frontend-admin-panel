import { combineReducers } from "@reduxjs/toolkit";
import { reducer as calendarReducer } from "@slices/calendar";
import { reducer as chatReducer } from "@slices/chat";
import { reducer as kanbanReducer } from "@slices/kanban";
import { reducer as mailReducer } from "@slices/mail";
import { reducer as partnersReducer } from "@slices/partners";
import { reducer as statsReducer } from "@slices/stats";
import { reducer as rolesReducer } from "@slices/roles";
import { reducer as usersReducer } from "@slices/users";
import { reducer as clientsReducer } from "@slices/clients";
import { reducer as couriersReducer } from "@slices/couriers";
import { reducer as bonusesReducer } from "@slices/bonuses";
import { reducer as pointsReducer } from "@slices/points";
import { reducer as productsReducer } from "@slices/products";
import { reducer as ordersReducer } from "@slices/orders";
import { reducer as handbooksReducer } from "@slices/handbooks";
import { reducer as transactionsReducer } from "@slices/transactions";
import { reducer as cooperationsReducer } from "@slices/cooperations";
import { reducer as partnersBalanceReducer } from "@slices/partnersBalance";
import { reducer as pushNotificationsReducer } from "@slices/pushNotifications";

export const rootReducer = combineReducers({
  calendar: calendarReducer,
  chat: chatReducer,
  kanban: kanbanReducer,
  mail: mailReducer,
  stats: statsReducer,
  roles: rolesReducer,
  users: usersReducer,
  clients: clientsReducer,
  couriers: couriersReducer,
  bonuses: bonusesReducer,
  points: pointsReducer,
  orders: ordersReducer,
  products: productsReducer,
  partners: partnersReducer,
  transactions: transactionsReducer,
  handbooks: handbooksReducer,
  cooperations: cooperationsReducer,
  partnersBalance: partnersBalanceReducer,
  pushNotifications: pushNotificationsReducer,
});
