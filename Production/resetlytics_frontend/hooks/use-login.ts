
'use client'

import { useState, useContext, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { useLoginMutation } from '@redux/features/auth/authApiSlice';
import { setAuth, setIsLoading } from '@redux/features/auth/authSlice';
import { toast } from 'react-toastify';

export default function useLogin() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		dispatch(setIsLoading());
		login({ email, password })
			.unwrap()
			.then((payload) => {
				const email_payload = {email: email, payload: payload}
				dispatch(setAuth(email_payload));
				
				toast.success('Logged in');
				router.push('/information/about');   // return to root
			})
			.catch(() => {
				toast.error('Failed to log in');
				
			})
			.finally(
				//dispatch(setIsLoading(false))
			);
	};

	return {
		email,
		password,
		isLoading,
		onChange,
		onSubmit,
	};
}