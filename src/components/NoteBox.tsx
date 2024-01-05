import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

type NoteBoxProp = {
  bookFullKey: string;
};

export const NoteBox: React.FC<NoteBoxProp> = ({ bookFullKey }) => {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const storedNotes = localStorage.getItem(`${bookFullKey}-Notes`);
    if (storedNotes) {
      const storedNotesJSON = JSON.parse(storedNotes);
      setNotes(storedNotesJSON);
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(event.target.value);
    localStorage.setItem(
      `${bookFullKey}-Notes`,
      JSON.stringify(event.target.value)
    );
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { mt: "4vh", width: "50vw" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-static"
          label="Add Notes"
          multiline
          rows={4}
          placeholder="Insert notes here"
          value={notes}
          onChange={handleInputChange}
        />
      </div>
    </Box>
  );
};
