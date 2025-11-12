"use client"
interface SearchFilterProps {
    placeholder?: string;
    paramName?: string;
}


const SearchFilter = ({
    placeholder = "Search...",
    paramName = "searchTerm",
}: SearchFilterProps) => {
    return (
        <div>

        </div>
    );
};

export default SearchFilter;