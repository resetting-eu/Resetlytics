
  export type Item_menu = {
    id: number;
    name: string;
    slug: string;
    href?: string;
    //icon: any;
    description?: string;
  };
  
  // organization by sections

  export const menus: { name: string; items: Item_menu[] }[] = [
    {
      name: 'Marketing',
      items: [
        {
            id: 1,
          name: 'Service Quality',
          slug: 'dashboard/quality',
          description: 'Service quality ...',
        },
        {
            id: 2,
          name: 'Sentiment Analysis',
          slug: 'dashboard/sentiment',
          description: 'Sentiment Analysis ...',
        },
        {
            id: 3,
          name: 'Sustainability',
          slug: 'dashboard/sustainability',
          description: 'Sustainability ...',
        },
      ],
    },
    {
        name: 'Forecast',
        items: [
          {
            id: 4,
            name: 'Visitors',
            slug: 'dashboard/visitors',
            description: 'Visitors forecast ...',
          },
          {
            id: 5,
            name: 'Interest',
            slug: 'dashboard/interest',
            description: 'Interest forecast ...',
          },
        ],
      },
    {
        name: 'Information',
        items: [
          {
            id: 6,
            name: 'Help',
            slug: 'dashboard/help',
            description: 'Information about how to use the platform.',
          },
          {
            id: 7,
            name: 'About',
            slug: 'dashboard/about',
            description: 'Information about us.',
          },
        ],
      },
  ];

  //onClick: (event: React.MouseEvent<HTMLElement>) => void;
/* import {
    IconAperture,
    IconCopy,
    IconLayoutDashboard,
    IconLogin,
    IconMoodHappy,
    IconTypography,
    IconUserPlus,
  } from "@tabler/icons-react";
  
  //import { uniqueId } from "lodash";
  
  export const menuitems = [
    {
      navlabel: true,
      subheader: "Home",
    },
  
    {
      //id: uniqueId(),
      id: 1,
      title: "Dashboard",
      icon: IconLayoutDashboard,
      href: "/",
    },
    {
      navlabel: true,
      subheader: "Utilities",
    },
    {
      id: 2,
      title: "Typography",
      icon: IconTypography,
      href: "/utilities/typography",
    },
    {
      id: 3,
      title: "Shadow",
      icon: IconCopy,
      href: "/utilities/shadow",
    },
    {
      navlabel: true,
      subheader: "Auth",
    },
    {
      id: 4,
      title: "Login",
      icon: IconLogin,
      href: "/authentication/login",
    },
    {
      id: 5,
      title: "Register",
      icon: IconUserPlus,
      href: "/authentication/register",
    },
    {
      navlabel: true,
      subheader: "Extra",
    },
    {
      id: 6,
      title: "Icons",
      icon: IconMoodHappy,
      href: "/icons",
    },
    {
      id: 7,
      title: "Sample Page",
      icon: IconAperture,
      href: "/sample-page",
    },
  ];

 */