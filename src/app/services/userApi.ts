import type { User } from "../types";
import { api } from "./api"

// Définir les types ou interfaces pour éviter la répétition
type AuthCredentials = {
    email: string;
    password: string;
    name: string;
}

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<{token: string}, {email: string; password: string}>({
            query: (userData) => ({
                url: "/login",
                method: "POST",
                body: userData,
            }),
        }),
        // l'interface AuthCredentials pour spécifier à la fois le type de la réponse et le type des données d'entrée. 
        register: builder.mutation<AuthCredentials, AuthCredentials>({
            query: (userData) => ({
                url: "/register",
                method: "POST",
                body: userData,
            }),
        }),

        current: builder.query<User, void>({
            query: () => ({
                url: "/current",
                method: "GET",
            }),
        }),

        getUserById: builder.query<User, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET",
            }),
        }),

        updateUser: builder.mutation<User, { userData: FormData; id: string }>({
            query: ({ userData, id }) => ({
                url: `/users/${id}`,
                method: "PUT",
                body: userData,
            }),
        }),
    }),
});

//  Accès aux hooks générés automatiquement
export const {
    useRegisterMutation,
    useLoginMutation,
    useCurrentQuery,
    useLazyCurrentQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
    useUpdateUserMutation,
} = userApi

export const {
    endpoints: { login, register, current, getUserById, updateUser },
} = userApi