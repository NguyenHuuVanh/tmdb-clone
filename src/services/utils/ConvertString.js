const formatterDate = (first_air_date, release_date) => {
  if (first_air_date !== "") {
    const dString = first_air_date || release_date;
    const dateString = dString && dString.split("-");
    const year = parseInt(dateString[0]);
    const month = parseInt(dateString[1]);
    const day = parseInt(dateString[2]);

    const date = new Date(year, month - 1, day);

    // Tạo đối tượng Intl.DateTimeFormat để định dạng ngày
    const formatter = new Intl.DateTimeFormat("en-US", {month: "short", day: "numeric", year: "numeric"});

    // Định dạng lại theo định dạng mong muốn
    const newDate = formatter.format(date);
    return newDate;
  }
  return release_date || first_air_date;
};

const convertString = (inputString) => {
  // Chuyển thành chữ thường
  let lowercaseString = inputString.toLowerCase();

  // Thay thế tất cả các ký tự không phải là chữ cái hoặc số bằng dấu gạch ngang
  let replacedString = lowercaseString.replace(/[^a-z0-9]+/g, "-");

  // Loại bỏ dấu gạch ngang ở đầu và cuối chuỗi nếu có
  let finalString = replacedString.replace(/^-+|-+$/g, "");

  return finalString;
};

export {formatterDate, convertString};
