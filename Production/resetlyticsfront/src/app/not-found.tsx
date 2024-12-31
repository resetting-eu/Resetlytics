import { Boundary } from '../components/ui/basics/Boundary';

export default function NotFound() {
  return (
    <Boundary labels={['not-found.tsx']}>
      <div >
        <h2>Not Found</h2>
        <p>Could not find the requested resource</p>
      </div>
    </Boundary>
  );
}