import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";

type ReadingStatusSelectProp = {
  bookFullKey: string;
};

export const ReadingStatusSelect: React.FC<ReadingStatusSelectProp> = ({
  bookFullKey,
}) => {
  const [status, setStatus] = useState("Unread");

  useEffect(() => {
    const storedStatus = localStorage.getItem(`${bookFullKey}-ReadingStatus`);
    if (storedStatus) {
      const storedStatusJSON = JSON.parse(storedStatus);
      setStatus(storedStatusJSON);
    }
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
    localStorage.setItem(
      `${bookFullKey}-ReadingStatus`,
      JSON.stringify(event.target.value)
    );
  };

  return (
    <div>
      <FormControl style={{ width: "17vw" }}>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Reading Status"
          onChange={handleChange}
        >
          <MenuItem value={"Unread"}>Unread</MenuItem>
          <MenuItem value={"Reading"}>Reading</MenuItem>
          <MenuItem value={"Finished"}>Finished</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
