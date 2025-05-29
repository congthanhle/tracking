import { DatePicker, ConfigProvider, Button, message } from "antd";
import viVN from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import { useEffect, useState } from "react";

dayjs.locale("vi");

const weekdays = [
  { name: "Thứ 2", dayNumber: 1 },
  { name: "Thứ 4", dayNumber: 3 },
  { name: "Thứ 6", dayNumber: 5 },
];

const ScheduleGrid = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [scheduleDates, setScheduleDates] = useState({});
  const [selectedDates, setSelectedDates] = useState({});

  useEffect(() => {
    if (!selectedMonth) {
      setScheduleDates({});
      return;
    }

    const monthDates = {};

    weekdays.forEach(({ dayNumber }) => {
      const dates = [];
      let date = selectedMonth.startOf("month");

      while (date.month() === selectedMonth.month()) {
        if (date.day() === dayNumber) {
          dates.push(date);
        }
        date = date.add(1, "day");
      }

      monthDates[dayNumber] = dates;
    });

    setScheduleDates(monthDates);
    setSelectedDates({});
  }, [selectedMonth]);

  const toggleDate = (dayNum, dateStr) => {
    setSelectedDates((prev) => {
      const current = prev[dayNum] || [];
      const exists = current.includes(dateStr);
      const updated = exists
        ? current.filter((d) => d !== dateStr)
        : [...current, dateStr];

      return {
        ...prev,
        [dayNum]: updated,
      };
    });
  };

  const handleSubmit = () => {
    const result = weekdays.map(({ name, dayNumber }) => ({
      thu: name,
      ngay: selectedDates[dayNumber] || [],
    }));

    console.log("Kết quả chọn:", result);
    message.success("Đã gửi đăng ký lịch!");
  };

  return (
    <ConfigProvider locale={viVN}>
      <div className="p-4 space-y-6 max-w-screen mx-auto">
        <div>
          <label className="font-medium block mb-1">Chọn tháng:</label>
          <DatePicker
            picker="month"
            format="MM_YYYY"
            value={selectedMonth}
            onChange={(date) => setSelectedMonth(date)}
            className="w-64"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border">
            <tbody>
              {weekdays.map(({ name, dayNumber }) => (
                <tr key={dayNumber} className="border-b">
                  <td className="border px-4 py-2 font-medium max-w-[40px] text-center whitespace-nowrap bg-green-200">
                    {name}
                  </td>
                  {scheduleDates[dayNumber]?.map((date) => {
                    const dateStr = date.format("DD/MM");
                    const checked = selectedDates[dayNumber]?.includes(dateStr);
                    return (
                      <td
                        key={dateStr}
                        className={`border px-2 py-6 text-center cursor-pointer select-none transition-colors duration-300 ${
                          checked ? "bg-red-200" : ""
                        }`}
                        onClick={() => toggleDate(dayNumber, dateStr)}
                      >
                        {dateStr}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Button type="primary" onClick={handleSubmit}>
          Gửi đăng ký
        </Button>
      </div>
    </ConfigProvider>
  );
};

export default ScheduleGrid;
