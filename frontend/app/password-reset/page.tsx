import { PasswordResetForm } from '@/components/forms';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Full Auth | Password Reset',
	description: 'Full Auth password reset page',
};

export default function Page() {
	return (	
		<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
			<PasswordResetForm />
		</div>
	);
}
