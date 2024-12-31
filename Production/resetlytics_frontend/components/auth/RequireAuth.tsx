'use client';

import { hasCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
interface Props {
	children: React.ReactNode;
}

export default function RequireAuth({ children }: Props) {
	//const { isAuthenticated, email, isLoading } = useAppSelector(state => state.auth);

	const access = hasCookie('access');

	//console.log('Require Auth: cookie ', access)

	const router = useRouter();
	/*
	if (isLoading) {
		return (
			<div className='flex justify-center my-8'>
				<Spinner lg />
			</div>
		);
	}
*/
/*
	if ( x === 2 ) {
		//redirect('/auth/login');
		router.refresh();
		router.push('/auth/login')
	}
*/
	return <>{children}</>;
}
