import RunServer from '@components/survey/Survey';

// import dynamic from 'next/dynamic';
// const SurveyComponent = dynamic(() => import("@/components/Survey"), { ssr: false });


export default function Survey() {
  return (
    <div className="flex min-h-screen flex-col items-center p-8">
      <RunServer />
    </div>
  );
}


/*
ask for code, check if it is ok, go, store
*/