import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import MultipleDatePicker from "./MultipleDatePicker";

export default function Home() {
  const [datesToDisable, setDatesToDisable] = useState([]);
  const [datesToCreateBookings, setDatesToCreateBookings] = useState([]);
  const [futureDeskBookingLimitInDays, setFutureDeskBookingLimitInDays] =
    useState(0);
  const [editingBooking, setEditingBooking] = useState(null);

  function onDateSelectionChange(date) {
    setDatesToCreateBookings(date);
  }

  function SwitchablePicker() {
    return (
      <MultipleDatePicker
        datesToDisable={datesToDisable}
        selectedDate={datesToCreateBookings || []}
        onDateSelectionChange={onDateSelectionChange}
        selectProps={{ style: { width: "300px" } }}
        editingBooking={editingBooking}
        futureDeskBookingLimitInDays={futureDeskBookingLimitInDays}
      />
    );
  }

  return SwitchablePicker();
}
