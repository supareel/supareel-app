export type TNavbarItem = {
  title: string;
  url: string;
  nestedRoutes?: TNavbar[];
};

export type TNavbar = {
  group: string;
  items: TNavbarItem[];
};

const courseNavbar: Array<TNavbar> = [
  {
    group: "Course",
    items: [
      {
        title: "Basic Info",
        url: "/course",
      },
      {
        title: "Curriculum",
        url: "/course/#curriculum",
      },
    ],
  },
  {
    group: "Manage",
    items: [
      {
        title: "Customers",
        url: "/course/#customer",
      },
      {
        title: "Coupons",
        url: "/course/#coupon",
      },
      {
        title: "Reviews",
        url: "/course/#review",
      },
    ],
  },
];

export const rootNavbar: Array<TNavbar> = [
  {
    group: "Business",
    items: [
      {
        title: "Downloadables",
        url: "/downloadable",
      },
      {
        title: "Courses",
        url: "/course",
        nestedRoutes: courseNavbar,
      },
      {
        title: "Products",
        url: "/product",
      },
    ],
  },
  {
    group: "Manage",
    items: [
      {
        title: "Customers",
        url: "/customer",
      },
    ],
  },
];
