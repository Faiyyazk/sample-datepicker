import React, { useEffect, useState } from "react";
import { Tag, DatePicker, Select } from "antd";
import moment from "moment";
import * as R from "ramda";

function getTimestamp(value) {
  return value.format("YYYY-MM-DD");
}

export default function MultipleDatePicker(props) {
  const {
    onDateSelectionChange,
    selectProps,
    editingBooking,
    datesToDisable,
    futureDeskBookingLimitInDays,
    selectedDate,
    pageName,
    disabled,
  } = props;

  // const selectedDate = props?.selectedDate;

  const format = "YYYY-MM-DD";

  const [open, setOpen] = useState(false);
  const [dateValueString, setDateValueString] = useState(null);

  const onValueChange = (date) => {
    const t = getTimestamp(date);
    const index = selectedDate.indexOf(t);

    const clone = R.clone(selectedDate);
    if (editingBooking) {
      clone.splice(0, 1);
      clone.push(t);
    } else if (index > -1) {
      clone.splice(index, 1);
    } else {
      clone.push(t);
    }
    // onChange && onChange(clone);
    onDateSelectionChange && onDateSelectionChange(clone);
  };

  const dateRender = (currentDate) => {
    const isSelected = selectedDate.indexOf(getTimestamp(currentDate)) > -1;

    const currentFormattedDate = moment(currentDate).format("YYYY-MM-DD");
    const todayDate = moment().format("YYYY-MM-DD");

    return (
      <div
        className="ant-picker-cell-inner"
        style={
          currentFormattedDate === todayDate && !isSelected
            ? {
                position: "relative",
                zIndex: 2,
                display: "inlineBlock",
                width: "24px",
                height: "22px",
                lineHeight: "22px",
                backgroundColor: "#E4F2F2",
                color: "#000",
                margin: "auto",
                borderRadius: "50%",
                transition: "background 0.3s, border 0.3s",
              }
            : isSelected
            ? {
                position: "relative",
                zIndex: 2,
                display: "inlineBlock",
                width: "24px",
                height: "22px",
                lineHeight: "22px",
                backgroundColor: "#00ADD7",
                color: "#fff",
                margin: "auto",
                borderRadius: "50%",
                transition: "background 0.3s, border 0.3s",
              }
            : {}
        }
      >
        {currentDate.date()}
      </div>
    );
  };

  // const renderTag = ({ value, onClose }) => {
  //   const handleClose = () => {
  //     onClose();
  //     onChange && onChange(selectedDate.filter((t) => t !== value));
  //   };
  //   return (
  //     <Tag onClose={handleClose} closable>
  //       {moment(value).format(format)}
  //     </Tag>
  //   );
  // };

  useEffect(() => {
    let bookingDates;
    const bookingDateString = [];

    const totalBookingDates = selectedDate.length || 0;

    if (totalBookingDates > 0) {
      for (let index = 0; index < totalBookingDates; index++) {
        if (index < 2) {
          const element = selectedDate[index];

          const formattedDate = moment(element).format("MMM D");

          bookingDateString.push(formattedDate);
        }
      }
      if (totalBookingDates > 2) {
        bookingDates = `${bookingDateString.toString()}, + ${
          totalBookingDates - 2
        } More`;
      } else {
        bookingDates = `${bookingDateString.toString()}`;
      }
    } else {
      bookingDates = "Choose a date";
    }

    setDateValueString(bookingDates);
    // onDateSelectionChange(selectedDate);
  }, [selectedDate, onDateSelectionChange]);

  // disable past dates, booked dates and futureDeskBookingLimitInDays from general settings
  function disabledDate(current) {
    const _date = moment(current).format("YYYY-MM-DD");
    return (
      moment().add(-1, "days") >= moment(_date) ||
      datesToDisable.includes(_date) ||
      (futureDeskBookingLimitInDays > 0 &&
        moment().add(futureDeskBookingLimitInDays, "days") < moment(_date))
    );
  }

  return (
    <Select
      allowClear
      style={{ width: "300px" }}
      mode="multiple"
      // value={selectedDate}
      value={dateValueString}
      onClear={() => onDateSelectionChange && onDateSelectionChange([])}
      // tagRender={renderTag}
      // open
      open={open}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      dropdownMatchSelectWidth={false}
      dropdownClassName={"multipleDropdownClassName1"}
      className="multipleDatePickerCalendarSelect"
      dropdownStyle={{ height: "270px", width: "280px", minWidth: "0" }}
      dropdownRender={() => (
        <DatePicker
          disabledDate={disabledDate}
          defaultValue={moment("2015/01/01", "YYYY/MM/DD")}
          format={"YYYY/MM/DD"}
          onChange={onValueChange}
          value=""
          showToday={false}
          open
          dateRender={dateRender}
          getPopupContainer={() =>
            document.getElementsByClassName("multipleDropdownClassName1")[0]
          }
        />
      )}
    />
  );
}
