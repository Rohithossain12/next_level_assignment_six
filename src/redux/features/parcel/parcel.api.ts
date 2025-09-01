import { baseApi } from "@/redux/baseApi";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // sender
    createParcel: builder.mutation({
      query: (parcelData) => ({
        url: "/parcel",
        method: "POST",
        data: parcelData,
      }),
      invalidatesTags: ["PARCEL"],
    }),

   
    cancelParcel: builder.mutation({
      query: (id) => ({
        url: `/parcel/cancel/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    
    getMyParcels: builder.query({
      query: () => ({
        url: "/parcel/me",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    // Receiver
    getIncomingParcels: builder.query({
      query: () => ({
        url: "/parcel/incoming",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    confirmDelivery: builder.mutation({
      query: (id) => ({
        url: `/parcel/confirm/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Admin
    getAllParcels: builder.query({
      query: () => ({
        url: "/parcel",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),

    updateParcelStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/parcel/status/${id}`,
        method: "PATCH",
        data
      }),
      invalidatesTags: ["PARCEL"],
    }),

    blockParcel: builder.mutation({
      query: (id) => ({
        url: `/parcel/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useCancelParcelMutation,
  useGetMyParcelsQuery,
  useGetIncomingParcelsQuery,
  useConfirmDeliveryMutation,
  useGetAllParcelsQuery,
  useUpdateParcelStatusMutation,
  useBlockParcelMutation,
} = parcelApi;
