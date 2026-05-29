import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="p-4 sm:p-6">
      <Table className="w-full overflow-x-auto border rounded-lg shadow-md text-white">
        <TableCaption className="text-sm text-white-600 ">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader>
          <TableRow className="hidden md:table-row">
            <TableHead className="text-white">Logo</TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white">Website Link</TableHead>
            <TableHead className="text-white">Location</TableHead>
            <TableHead className="text-right text-white">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <TableRow
              key={company._id}
              className="block md:table-row border-b md:border-none mb-4 md:mb-0"
            >
              <TableCell className="block md:table-cell flex items-center gap-2 mb-2 md:mb-0 text-white">
                <span className="md:hidden font-medium">Logo:</span>
                <Avatar>
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell className="block md:table-cell mb-2 md:mb-0 text-white">
                <span className="md:hidden font-medium ">Name:</span>
                {company.name}
              </TableCell>
              <TableCell className="block md:table-cell mb-2 md:mb-0 text-white">
                <span className="md:hidden font-medium ">Date:</span>
                {company.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="block md:table-cell mb-2 md:mb-0 text-white">
                <span className="md:hidden font-medium text-white">Website:</span>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white-500 hover:underline "
                >
                  {company.website}
                </a>
              </TableCell>
              <TableCell className="block md:table-cell mb-2 md:mb-0 text-white">
                <span className="md:hidden font-medium ">Location:</span>
                {company.location}
              </TableCell>
              <TableCell className="block md:table-cell text-right text-white">
                <span className="md:hidden font-medium ">Action:</span>
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;