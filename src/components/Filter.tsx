import { Box, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

type FilterProp = {
  filterValues: any;
  setFilterValues: Dispatch<SetStateAction<any>>;
};

export const Filter: React.FC<FilterProp> = ({
  filterValues,
  setFilterValues,
}) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilterValues({
      ...filterValues,
      [name]: value,
    });
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        sx={{ width: "25vw", margin: "4vh 7vw" }}
      >
        <p style={{ fontSize: "1.2rem" }}>Filter by:</p>
        <TextField
          id="author-filter"
          label="Author"
          variant="outlined"
          name="author"
          value={filterValues.author}
          onChange={handleFilterChange}
          sx={{ margin: "2vh 0" }}
        />
        <TextField
          id="reading-status-filter"
          label="Reading status"
          variant="outlined"
          name="readingStatus"
          value={filterValues.readingStatus}
          onChange={handleFilterChange}
          sx={{ marginBottom: "2vh" }}
        />
        <TextField
          id="title-filter"
          label="Title"
          variant="outlined"
          name="title"
          value={filterValues.title}
          onChange={handleFilterChange}
        />
      </Box>
      <hr className="dividerStyle" />
    </div>
  );
};
