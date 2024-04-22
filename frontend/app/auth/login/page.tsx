import Link from 'next/link';
import LoginForm from '@components/forms/LoginForm';
import type { Metadata } from 'next';
import Provider from "@/redux/provider"

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

/*

<p className='mt-10 text-center text-sm text-gray-500'>
					Don&apos;t have an account?{' '}
					<Link
						href='/auth/register'
						className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
					>
						Register here
					</Link>
				</p>
*/
