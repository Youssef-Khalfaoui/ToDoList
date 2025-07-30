import "./App.css";
import {
  ButtonGroup,
  Button,
  ThemeProvider,
  createTheme,
  TextField,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import AlertDialog from "./alert.js";

const theme = createTheme({
  typography: {
    fontFamily: "Cairo",
  },
  palette: {
    primary: {
      main: "#3f50b5",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

function App() {
  const [activeFilter, setActiveFilter] = useState("غير منجز");
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskToDeleteIndex, setTaskToDeleteIndex] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="container">
          <div className="title">
            <h1 className="heading">مهامي</h1>
          </div>

          <ButtonGroup
            style={{ position: "relative", top: "-40px", zIndex: "9" }}
            variant="outlined"
            aria-label="Large button group"
          >
            {["غير منجز", "منجز", "الكل"].map((label) => (
              <Button
                key={label}
                variant={activeFilter === label ? "contained" : "outlined"}
                color="primary"
                onClick={() => setActiveFilter(label)}
              >
                {label}
              </Button>
            ))}
          </ButtonGroup>

          <div
            className="task-list"
            style={{
              marginTop: "30px",
              width: "80%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "15px",
            }}
          >
            {tasks
              .filter((task) => {
                if (activeFilter === "الكل") return true;
                if (activeFilter === "منجز") return task.done;
                if (activeFilter === "غير منجز") return !task.done;
                return true;
              })
              .map((task, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#3f50b5",
                    padding: "15px 20px",
                    borderRadius: "12px",
                    fontSize: "20px",
                    color: "white",
                    width: "100%",
                    maxWidth: "600px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                    transition: ".3s linear",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.height = "100px";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.height = "70px";
                  }}
                >
                  <span
                    style={{
                      textDecoration: task.done ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() => {
                        setTaskToDeleteIndex(index);
                        setConfirmOpen(true);
                      }}
                      style={{
                        backgroundColor: "#fff",
                        padding: "8px",
                        borderRadius: "50%",
                        fontSize: "16px",
                        color: "red",
                        border: "2px solid red",
                        cursor: "pointer",
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>

                    <button
                      onClick={() => {
                        const updated = [...tasks];
                        updated[index].done = !updated[index].done;
                        setTasks(updated);
                      }}
                      style={{
                        backgroundColor: task.done ? "green" : "#fff",
                        color: task.done ? "white" : "green",
                        padding: "8px",
                        borderRadius: "50%",
                        fontSize: "16px",
                        border: "2px solid green",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>

                    <button
                      onClick={() => {
                        const newTitle = prompt("عنوان جديد:", tasks[index].title);
                        if (newTitle && newTitle.trim() !== "") {
                          const updated = [...tasks];
                          updated[index].title = newTitle.trim();
                          setTasks(updated);
                        }
                      }}
                      style={{
                        backgroundColor: "#fff",
                        padding: "8px",
                        borderRadius: "50%",
                        fontSize: "16px",
                        color: "blue",
                        border: "2px solid blue",
                        cursor: "pointer",
                      }}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div
            className="input"
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
              width: "100%",
              maxWidth: "600px",
            }}
          >
            <TextField
              id="outlined-basic"
              dir="ltr"
              label="عنوان المهمة"
              variant="outlined"
              style={{ flex: 1 }}
              InputProps={{
                style: { fontFamily: "Cairo" },
              }}
              InputLabelProps={{
                style: { fontFamily: "Cairo" },
              }}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />

            <Button
              variant="contained"
              style={{
                fontSize: "20px",
                fontFamily: "Cairo",
                padding: "10px 20px",
                minWidth: "100px",
              }}
              onClick={() => {
                if (inputValue.trim() === "") {
                  setError("لا يمكن ترك العنوان فارغًا");
                  setTimeout(() => setError(""), 3000);
                } else {
                  setTasks([...tasks, { title: inputValue.trim(), done: false }]);
                  setInputValue("");
                  setError("");
                }
              }}
            >
              إضافة
            </Button>
          </div>

          {error && (
            <Alert
              severity="error"
              sx={{
                mt: 2,
                maxWidth: 600,
                fontFamily: "Cairo",
                "& .MuiAlert-message": {
                  fontFamily: "Cairo",
                },
              }}
            >
              {error}
            </Alert>
          )}
        </div>

        <AlertDialog
          open={confirmOpen}
          onClose={() => {
            setConfirmOpen(false);
            setTaskToDeleteIndex(null);
          }}
          onConfirm={() => {
            if (taskToDeleteIndex !== null) {
              const updated = tasks.filter((_, i) => i !== taskToDeleteIndex);
              setTasks(updated);
            }
            setConfirmOpen(false);
            setTaskToDeleteIndex(null);
          }}
          taskTitle={
            taskToDeleteIndex !== null ? tasks[taskToDeleteIndex].title : ""
          }
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
