import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import { WarningAmber } from "@mui/icons-material";

export default function AlertDialog({ open, onClose, onConfirm, taskTitle }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      dir="rtl"
      PaperProps={{
        style: {
          borderRadius: "16px",
          padding: "8px",
          fontFamily: "Cairo",
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        style={{
          fontFamily: "Cairo",
          textAlign: "right",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#d32f2f",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        <WarningAmber style={{ fontSize: "26px" }} />
        تأكيد الحذف
      </DialogTitle>

      <DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          style={{
            fontFamily: "Cairo",
            textAlign: "right",
            fontSize: "18px",
            color: "#333",
          }}
        >
          هل أنت متأكد من رغبتك في حذف المهمة التالية؟
          <Box
            component="strong"
            sx={{
              color: "#d32f2f",
              display: "block",
              margin: "12px 0",
              fontSize: "19px",
            }}
          >
            {taskTitle}
          </Box>
          لا يمكنك التراجع عن الحذف بعد إتمامه.
        </DialogContentText>
      </DialogContent>

      <DialogActions
        sx={{
          justifyContent: "flex-start",
          padding: "16px",
          paddingTop: "8px",
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            fontFamily: "Cairo",
            fontSize: "16px",
            borderRadius: "8px",
            textTransform: "none",
            margin:"0 10px",
          }}
        >
          إلغاء
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          autoFocus
          sx={{
            fontFamily: "Cairo",
            fontSize: "16px",
            borderRadius: "8px",
            textTransform: "none",
          }}
        >
          نعم، احذف
        </Button>
      </DialogActions>
    </Dialog>
  );
}
