
import { ISurvey } from "@/lib/db/definitions";
import PostSurvey from "./default";

import { getAllSurveysSlugs, getSurveyBySlug } from "@/lib/db/services";
import { Typography } from "@mui/material";

// generateStaticParams in combination with dynamic route segments 
// to statically generate routes at build time instead of on-demand 
// at request time

export async function generateStaticParams() {
  return await getAllSurveysSlugs();
}

export async function generateMetadata(params: any) {
  const survey = await getSurveyBySlug(params.slug);
  return { title: 'Title' };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const survey = await getSurveyBySlug(params.slug) as ISurvey;
  
  return (
    <>
    <Typography>{params.slug}</Typography>
    <PostSurvey survey={survey} />
    </>
  
  )

}

