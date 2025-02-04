import { ArrowDown, ArrowUp, ArrowUpDown, Calendar, Search } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Stream } from "../types/types";
import PaginationControls from "./PaginationControls";

interface StreamsTableProps {
  streams: Stream[];
}

const Columns = [
  { key: "songName", label: "Song Name" },
  { key: "artist", label: "Artist" },
  { key: "dateStreamed", label: "Date Streamed", width: 150 },
  { key: "streamCount", label: "Stream Count", width: 150 },
];

const StreamsTable: React.FC<StreamsTableProps> = ({ streams }) => {
  const [sortField, setSortField] = useState<keyof Stream>("dateStreamed");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    search: "",
    dateRange: {
      start: "",
      end: "",
    },
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortField, sortDirection]);

  const handleSort = (field: keyof Stream) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: keyof Stream) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  const filteredAndSortedStreams = useMemo(() => {
    return streams
      .filter((stream) => {
        const matchesSearch = filters.search.toLowerCase();
        const streamDate = new Date(stream.dateStreamed);
        const startDate = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
        const endDate = filters.dateRange.end ? new Date(filters.dateRange.end) : null;

        return (
          (!filters.search ||
            stream.songName.toLowerCase().includes(matchesSearch) ||
            stream.artist.toLowerCase().includes(matchesSearch)) &&
          (!startDate || streamDate >= startDate) &&
          (!endDate || streamDate <= endDate)
        );
      })
      .sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (sortField === "streamCount") {
          return sortDirection === "asc"
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        }

        if (sortField === "dateStreamed") {
          return sortDirection === "asc"
            ? new Date(aValue).getTime() - new Date(bValue).getTime()
            : new Date(bValue).getTime() - new Date(aValue).getTime();
        }

        return sortDirection === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
  }, [streams, filters, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSortedStreams.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedStreams.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
      <div className="p-4 space-y-4 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex max-sm:flex-col items-start gap-2 sm:gap-4">
          <div className="flex-1 w-full relative">
            <label
              htmlFor="search"
              className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search songs or artists
            </label>
            <input
              id="search"
              type="text"
              placeholder="Enter song name or artist..."
              className="w-full p-2 border rounded"
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            />
          </div>

          <div className="flex max-sm:flex-col max-sm:w-full max-sm:space-y-2 sm:space-x-2">
            <div className="flex-1 w-full">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                From
              </label>
              <input
                id="startDate"
                type="date"
                className="w-full p-2 border rounded"
                value={filters.dateRange.start}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, start: e.target.value },
                  }))
                }
              />
            </div>
            <div className="w-full">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <input
                id="endDate"
                type="date"
                className="w-full p-2 border rounded"
                value={filters.dateRange.end}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, end: e.target.value },
                  }))
                }
              />
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1}-
          {Math.min(indexOfLastItem, filteredAndSortedStreams.length)} of{" "}
          {filteredAndSortedStreams.length} streams
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-white">
            <tr>
              {Columns.map(({ key, label, width }) => (
                <th
                  key={key}
                  style={{ width: width ? `${width}px` : "auto" }}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => handleSort(key as keyof Stream)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{label}</span>
                    <span className="text-gray-400">{getSortIcon(key as keyof Stream)}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((stream) => (
                <tr key={stream.id} className="hover:bg-blue-50 transition-colors duration-200">
                  {Columns.map(({ key }) => (
                    <td key={key} className="px-6 py-4 whitespace-nowrap">
                      {key === "dateStreamed"
                        ? new Date(stream[key]).toLocaleDateString()
                        : key === "streamCount"
                        ? stream[key].toLocaleString()
                        : stream[key as keyof Stream]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={Columns.length}
                  className="px-6 py-8 text-center text-gray-500 bg-gray-50"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Search className="w-6 h-6 text-gray-400" />
                    No results found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default StreamsTable;
