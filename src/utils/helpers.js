import icons from "./icons";

const { AiOutlineStar, AiFillStar } = icons;

export const secondsToHms = (seconds) => {
  seconds = Number(seconds) / 1000;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);
  return { h, m, s };
};

export const slugifyTitle = (title) => {
  //Đổi chữ hoa thành chữ thường
  var slug;
  slug = title.toLowerCase();

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, "e");
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, "i");
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, "o");
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, "u");
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, "y");
  slug = slug.replace(/đ/gi, "d");
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    ""
  );
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, "-");
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-\-/gi, "-");
  slug = slug.replace(/\-\-\-/gi, "-");
  slug = slug.replace(/\-\-/gi, "-");
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = "@" + slug + "@";
  slug = slug.replace(/\@\-|\-\@|\@/gi, "");

  return slug;
};

export const formatMoney = (number) =>
Number((+number).toFixed(2)).toLocaleString();
export const renderStarFromNumber = (number, textSize) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    i <= +number
      ? stars.push(<AiFillStar key={i} color="orange" />)
      : stars.push(<AiOutlineStar key={i} color="orange" />);
  }

  return <div className={`flex text-[${textSize}px]`}>{stars}</div>;
};

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);

  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { nameKey: arr[0], mes: "Require!" },
      ]);
    }
  }

  for (let arr of formatPayload) {
    switch (arr[0]) {
      case "email":
        const regex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!arr[1].match(regex)) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { nameKey: arr[0], mes: "Email invalid!!!" },
          ]);
        }
        break;
      case "password":
        if (arr[1].length < 8) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            {
              nameKey: arr[0],
              mes: "Password must be greater than 8 characters",
            },
          ]);
        }
        break;

      default:
        break;
    }
  }

  return invalids;
};

export const generateRange = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => start + index);
};
