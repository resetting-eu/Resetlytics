import LoginForm from '@components/forms/LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Resetlytics | Login',
	description: 'Resetlytics login page',
};

export default function Page() {
	return (
		<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
			<LoginForm />
		</div>
	);
}
