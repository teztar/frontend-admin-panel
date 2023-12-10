import { createSlice } from "@reduxjs/toolkit";
import {
  getApplicationTypes,
  getBonusCategories,
  getBonusTypes,
  getClientBonusOperationTypes,
  getClientStatuses,
  getCooperationRequestStatuses,
  getCooperationRequestTypes,
  getCourierStatuses,
  getGenders,
  getNotificationFormats,
  getNotificationSortedFields,
  getNotificationStatuses,
  getOrderPaymentOptions,
  getOrderStatuses,
  getPartnerPointsBalanceStatuses,
  getPeriods,
  getPointStatuses,
  getPrefixes,
  getProductVolumes,
} from "@services/index";

const initialState = {
  applicationTypes: [],
  bonusCategories: [],
  bonusTypes: [],
  clientBonusOperationTypes: [],
  clientStatuses: [],
  cooperationRequestStatuses: [],
  cooperationRequestTypes: [],
  courierStatuses: [],
  genders: [],
  notificationFormats: [],
  notificationSortedFields: [],
  notificationStatuses: [],
  orderPaymentOptions: [],
  orderStatuses: [],
  partnerPointsBalanceStatuses: [],
  periods: [],
  pointStatuses: [],
  prefixes: [],
  volumes: [],
  loading: true,
  error: null,
};

const handbooks = createSlice({
  name: "handbooks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getApplicationTypes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getApplicationTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.applicationTypes = action.payload?.payload;
    });
    builder.addCase(getApplicationTypes.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getBonusCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBonusCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.bonusCategories = action.payload?.payload;
    });
    builder.addCase(getBonusCategories.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getBonusTypes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBonusTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.bonusTypes = action.payload?.payload;
    });
    builder.addCase(getBonusTypes.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getClientBonusOperationTypes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getClientBonusOperationTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.clientBonusOperationTypes = action.payload?.payload;
    });
    builder.addCase(getClientBonusOperationTypes.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getClientStatuses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getClientStatuses.fulfilled, (state, action) => {
      state.loading = false;
      state.clientStatuses = action.payload?.payload;
    });
    builder.addCase(getClientStatuses.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getCooperationRequestStatuses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getCooperationRequestStatuses.fulfilled,
      (state, action) => {
        state.loading = false;
        state.cooperationRequestStatuses = action.payload?.payload;
      }
    );
    builder.addCase(getCooperationRequestStatuses.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getCooperationRequestTypes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCooperationRequestTypes.fulfilled, (state, action) => {
      state.loading = false;
      state.cooperationRequestTypes = action.payload?.payload;
    });
    builder.addCase(getCooperationRequestTypes.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getCourierStatuses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCourierStatuses.fulfilled, (state, action) => {
      state.loading = false;
      state.courierStatuses = action.payload?.payload;
    });
    builder.addCase(getCourierStatuses.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getGenders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getGenders.fulfilled, (state, action) => {
      state.loading = false;
      state.genders = action.payload?.payload;
    });
    builder.addCase(getGenders.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getNotificationFormats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getNotificationFormats.fulfilled, (state, action) => {
      state.loading = false;
      state.notificationFormats = action.payload?.payload;
    });
    builder.addCase(getNotificationFormats.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getNotificationSortedFields.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getNotificationSortedFields.fulfilled, (state, action) => {
      state.loading = false;
      state.notificationSortedFields = action.payload?.payload;
    });
    builder.addCase(getNotificationSortedFields.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getNotificationStatuses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getNotificationStatuses.fulfilled, (state, action) => {
      state.loading = false;
      state.notificationStatuses = action.payload?.payload;
    });
    builder.addCase(getNotificationStatuses.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getOrderPaymentOptions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderPaymentOptions.fulfilled, (state, action) => {
      state.loading = false;
      state.orderPaymentOptions = action.payload?.payload;
    });
    builder.addCase(getOrderPaymentOptions.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getOrderStatuses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderStatuses.fulfilled, (state, action) => {
      state.loading = false;
      state.orderStatuses = action.payload?.payload;
    });
    builder.addCase(getOrderStatuses.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getPartnerPointsBalanceStatuses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getPartnerPointsBalanceStatuses.fulfilled,
      (state, action) => {
        state.loading = false;
        state.partnerPointsBalanceStatuses = action.payload?.payload;
      }
    );
    builder.addCase(getPartnerPointsBalanceStatuses.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getPeriods.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPeriods.fulfilled, (state, action) => {
      state.loading = false;
      state.periods = action.payload?.payload;
    });
    builder.addCase(getPeriods.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getPointStatuses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPointStatuses.fulfilled, (state, action) => {
      state.loading = false;
      state.pointStatuses = action.payload?.payload;
    });
    builder.addCase(getPointStatuses.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getPrefixes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPrefixes.fulfilled, (state, action) => {
      state.loading = false;
      state.prefixes = action.payload?.payload;
    });
    builder.addCase(getPrefixes.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getProductVolumes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductVolumes.fulfilled, (state, action) => {
      state.loading = false;
      state.volumes = action.payload?.payload;
    });
    builder.addCase(getProductVolumes.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer } = handbooks;

export default handbooks;
