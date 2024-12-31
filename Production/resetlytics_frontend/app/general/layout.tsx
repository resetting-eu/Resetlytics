import { RequireAuth } from '@components/auth';

interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	return <RequireAuth>{children}</RequireAuth>;
}
