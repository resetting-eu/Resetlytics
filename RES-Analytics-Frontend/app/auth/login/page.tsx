import Link from 'next/link';
import LoginForm from '@components/forms/LoginForm';
import type { Metadata } from 'next';
import Provider from "@/redux/provider"

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login page',
};

export default function Page() {
	return (
		<LoginForm />
	);
}