import { apiSlice } from '../../services/apiSlice';

const appApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		sentiment: builder.mutation({
			query: ({ name, country }) => ({
				url: '/sent/' + name + '/' + country,
				method: 'POST',
				//body: { email, password },
			}),
		}),
		words: builder.mutation({
			query: ({ name, country }) => ({
				url: '/wc/' + name + '/' + country,
				method: 'POST',
				//body: { email, password },
			}),
		}),
		service: builder.mutation({
			query: ({ name, country, year }) => ({
				url: '/servq/' + name + '/' + country + '/' + year,
				method: 'POST',
				//body: { email, password },
			}),
		}),
		
	}),
});

export const {
	useSentimentMutation,
	useWordsMutation,
	useServiceMutation,
} = appApiSlice;