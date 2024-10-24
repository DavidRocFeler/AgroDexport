export interface Company {
  id: number;
  name: string;
  role: "Admin" | "User";
  status: "Active" | "Inactive";
}

export const companiesData: Company[] = [
  {
    id: 1,
    name: "Company One",
    role: "Admin",
    status: "Active",
  },
];
