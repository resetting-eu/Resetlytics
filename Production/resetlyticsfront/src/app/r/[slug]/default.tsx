import { Boundary } from '@/components/ui/basics/Boundary';
import SurveyRun from '@/components/ui/surveyrun/surveyrun';
import { ISurvey } from '@/lib/db/definitions';
import { Typography } from '@mui/material';

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

//import CategoryLabel from "@/components/blog/category";
//import AuthorCard from "@/components/blog/authorCard";

export default function PostSurvey(prop: {survey : ISurvey}) {

    // TODO: dealing with loading from params
    // loading? string or loading = false
    const survey = prop.survey
    const loading = false
    if (!loading && !survey) {
      notFound();
    }
  const slug = survey.slug;

  /*
const imageProps = post?.mainImage
    ? urlForImage(post?.mainImage)
    : null;
  */

    /*
 <Link
                href={`/post/${pathPrefix ? `${pathPrefix}/` : ""}${
                  post.slug.current
                }`}>
                <span>>
                  {post.title}
                </span>
              </Link>
    */

              /*
{imageProps && (
            <Link href={`/author/${author.slug.current}`}>
              <Image
                src={imageProps.src}
                alt={author.name}
                className="rounded-full object-cover"
                fill
                sizes="96px"
              />
            </Link>
          )}
              */
    /*
{AuthorimageProps && (
                  <Link href={`/author/${post.author.slug.current}`}>
                    <Image
                      src={AuthorimageProps.src}
                      alt={post?.author?.name}
                      className="rounded-full object-cover"
                      fill
                      sizes="40px"
                    />
                  </Link>
                )}
    */
  return (
    <>
    <Typography sx={{m: 2}} variant="h6" color="dodgerblue" gutterBottom >Survey owned by ... </Typography>
      <SurveyRun survey={survey} />
      </>
  );
}
