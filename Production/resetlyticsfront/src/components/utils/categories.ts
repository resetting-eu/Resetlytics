import { notFound } from 'next/navigation';

// `server-only` guarantees any modules that import code in file
// will never run on the client. Even though this particular API
// doesn't currently use sensitive environment variables, it's
// good practice to add `server-only` preemptively.

import 'server-only'

type Category = {
    name: string;
    slug: string;
    count: number;
    parent: string | null;
  };


// slug must be unique

 const db_categories = [
    {parent: 'quality', name: 'quality overview', slug: ['overview'], count: 0},
    {parent: 'quality', name: 'quality questionnaire', slug: 'questionnaire', count: 0},
    {parent: 'quality', name: 'quality report', slug: 'report', count: 0},
    {parent: 'quality', name: 'quality analysis', slug: 'analysis', count: 0},

    {parent: 'quality analysis', name: 'quality service', slug: ['quality', 'service'], count: 0},
    {parent: 'quality analysis', name: 'quality environment', slug: 'environment', count: 0},
    {parent: 'quality analysis', name: 'quality reservation', slug: 'reservation', count: 0},
    {parent: 'quality analysis', name: 'quality technology', slug: 'technology', count: 0},
    {parent: 'quality analysis', name: 'quality staff', slug: 'staff', count: 0},
    {parent: 'quality analysis', name: 'quality sustainability', slug: 'sustainability', count: 0},
    {parent: 'quality analysis', name: 'quality satisfaction', slug: 'satisfaction', count: 0},
    {parent: 'quality analysis', name: 'quality demographics', slug: 'demographics', count: 0},

    {parent: 'sentiment', name: 'sentiment overview', slug: 'overview', count: 0},
    {parent: 'sentiment', name: 'sentiment analysis', slug: 'analysis', count: 0},
    
    {parent: 'sustainability', name: 'sustainability overview', slug: 'overview', count: 0},
    {parent: 'sustainability', name: 'sustainability questionnaire', slug: 'questionnaire', count: 0},
    {parent: 'sustainability', name: 'sustainability report', slug: 'report', count: 0},
    {parent: 'sustainability', name: 'sustainability analysis', slug: 'analysis', count: 0},

    {parent: 'sustainability analysis', name: 'sustainability economic', slug: 'economic', count: 0},
    {parent: 'sustainability analysis', name: 'sustainability social', slug: 'social', count: 0},
    {parent: 'sustainability analysis', name: 'sustainability environment', slug: 'environment', count: 0},
    {parent: 'sustainability analysis', name: 'sustainability demographics', slug: 'demographics', count: 0},

 ]

export async function getCategories({ parent }: { parent?: string } = {}) {
    const categories = db_categories.filter((cat) => cat.parent === parent)
  
    if (categories.length === 0) {
      // Render the closest `not-found.js` Error Boundary
      notFound();
    }
  
    return categories as Category[];
  }
  
  // must get just 1
  // not need async but then if in a db...
  export async function getCategory({ slug }: { slug: string }) {
    const category = db_categories.filter((cat) => cat.slug === slug)
  
    if (category.length != 1) {
        // Render the closest `not-found.js` Error Boundary
        notFound();
      }
  
    return category[0] as Category;
  }
