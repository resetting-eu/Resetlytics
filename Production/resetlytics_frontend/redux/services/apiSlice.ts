import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { setAuth, logout } from '../features/auth/authSlice';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    // CHANGE THIS TO THE REAL API
	baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api`,
	credentials: 'include',
});

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);

	//console.log('BASE QUERY WITH REAUTH', args, api, extraOptions, 'RESULT=', result)
	if (result.error && result.error.status === 401) { // Unauthorized
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult = await baseQuery(
					{
						url: '/jwt/refresh/',
						method: 'POST',
					},
					api,
					extraOptions
				);
				//console.log('RESULT DO RFRESH', refreshResult)
				if (refreshResult.data) {
				//	console.log('SET AUTH')
					api.dispatch(setAuth(refreshResult));
					result = await baseQuery(args, api, extraOptions);
				} else {
				//	console.log('ENTRA NO LOGOUT')
					//api.dispatch(logout());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;
};

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	endpoints: builder => ({}),
});