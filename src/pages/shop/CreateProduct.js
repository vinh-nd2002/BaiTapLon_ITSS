import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, InputForm, Select } from "../../components";
import { previewImage, slugifyTitle, validate } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import icons from "../../utils/icons";
import Swal from "sweetalert2";
import axios from "axios";
import { apiCreateProduct, apiUploadImage } from "../../apis";
import { showModal } from "../../stores/admin/adminSlice";
import Loading from "../../components/Loading";
const { BsFillTrashFill, AiOutlinePlus } = icons;

const typeImges = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/PNG",
  "image/GIF",
  "image/JPEG",
  "image/JPG",
];

const CreateProduct = () => {
  const { categories } = useSelector((state) => state.category);
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    name: "",
    description: "",
    price: "",
    thumbnail: "",
    stock_quantity: "",
    images: [],
    attributes: [],
    category_id: "",
  });
  const [preview, setPreview] = useState({
    thumbnail: "",
    image: [],
  });

  const { attributes } = watch();

  const [count, setCount] = useState(1);

  const handlePreviewThumb = async (file) => {
    if (!typeImges.includes(file.type)) {
      Swal.fire("Toang", "Ảnh không đúng định dạng", "error");
    }
    const image = await previewImage(file);
    setPreview((prev) => ({
      ...prev,
      thumbnail: image,
    }));
  };

  const handlePreviewImages = async (files) => {
    let images = [];
    for (let file of files) {
      if (!typeImges.includes(file.type)) {
        Swal.fire("Toang", "Ảnh không đúng định dạng", "error");
      }
      const image = await previewImage(file);
      images.push(image);
    }
    setPreview((prev) => ({
      ...prev,
      images: images,
    }));
  };

  useEffect(() => {
    if (watch("thumbnail")[0]) handlePreviewThumb(watch("thumbnail")[0]);
  }, [watch("thumbnail")]);

  useEffect(() => {
    handlePreviewImages(watch("images"));
  }, [watch("images")]);

  const handleInputChange = (e, index) => {
    // lấy giá trị nhập vào
    const { name, value } = e.target;
    // kiểm tra xem name có phải là attributeName hay attributeValue
    if (name === `attributes[${index - 1}].name`) {
      // nếu là attributeName, thì gán giá trị nhập vào cho thuộc tính name của đối tượng tại vị trí index trong attributes
      setValue(`attributes[${index - 1}].name`, value);
    } else {
      // nếu là attributeValue, thì gán giá trị nhập vào cho thuộc tính value của đối tượng tại vị trí index trong attributes
      setValue(`attributes[${index - 1}].value`, value);
    }
  };

  let buttonColor = disable ? "bg-green-700" : "bg-green-500";

  const handleDeleteAttribute = (index) => {
    // tạo một mảng mới bằng cách sao chép giá trị của attributes
    const newAttributes = [...attributes];
    // xóa phần tử tại vị trí index khỏi mảng
    newAttributes.splice(index - 1, 1);
    // gán giá trị mới cho attributes
    setValue("attributes", newAttributes);
  };

  const handleCreateProduct = async (data) => {
    setDisable(true);
    let body = { ...data };
    for (let key in data) {
      if (key === "thumbnail") {
        let bodyImgae = new FormData();
        bodyImgae.append("upload_preset", "krbrxzl7");
        bodyImgae.append("file", data.thumbnail[0]);
        bodyImgae.append("cloud_name", "dv6nakslw");

        // sử dụng async/await để đợi cho fetch hoàn thành
        try {
          let res = await fetch(
            "https://api.cloudinary.com/v1_1/dv6nakslw/image/upload",
            {
              method: "POST",
              body: bodyImgae,
            }
          );
          let data = await res.json();
          body = { ...body, thumbnail: data.url };
        } catch (err) {
          console.log(err);
        }
      }
      if (key === "images") {
        let listImages = [];
        for (let file of data.images) {
          let bodyImgae = new FormData();
          bodyImgae.append("upload_preset", "krbrxzl7");
          bodyImgae.append("file", file);
          bodyImgae.append("cloud_name", "dv6nakslw");

          try {
            let res = await fetch(
              "https://api.cloudinary.com/v1_1/dv6nakslw/image/upload",
              {
                method: "POST",
                body: bodyImgae,
              }
            );
            let data = await res.json();
            // sau khi fetch hoàn thành, append thumbnail vào formData
            listImages.push({ image_url: data.url });
            // body = { ...body, thumbnail: data.url };
          } catch (err) {
            console.log(err);
          }
        }

        body = { ...body, images: listImages };
      }
    }

    body.sold_quantity = 0;
    body.shop_id = 1;
    body.slug = slugifyTitle(data.name);
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiCreateProduct(body);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));

    if (response.success) {
      reset();
      setPreview({
        thumbnail: "",
        image: [],
      });
      Swal.fire("Ok!", "Đã thêm sản phẩm mới", "success");
    } else {
      Swal.fire("Toang!", response.message, "error");
    }
    setDisable(false);
  };

  const renderInputAttributes = () => {
    return Array.from({ length: count }, (x, i) => i + 1).map((ele) => (
      <div className="flex justify-between gap-2 items-center" key={ele}>
        <div className="flex flex-col w-full">
          <label>Thuộc tính</label>
          <input
            register={register}
            errors={errors}
            id={`attributes[${ele - 1}].name`}
            name={`attributes[${ele - 1}].name`}
            placeholder="Nhập thuộc tính"
            {...register(`attributes[${ele - 1}].name`, {
              required: "Bắt buộc",
            })}
            className="form-input w-full outline-none p-2 rounded-md text-black border border-blue-500 my-2"
            onChange={(e) => handleInputChange(e, ele)}
          />
          <small className="text-main text-xs">
            {errors["attributes"] &&
              errors["attributes"][`${ele - 1}`]?.name?.message}
          </small>
        </div>
        <div className="flex flex-col w-full">
          <label>Giá trị</label>
          <input
            register={register}
            errors={errors}
            id={`attributes[${ele - 1}].value`}
            name={`attributes[${ele - 1}].value`}
            {...register(`attributes[${ele - 1}].value`, {
              required: "Bắt buộc",
            })}
            placeholder="Nhập thông tin"
            className="form-input w-full outline-none p-2 rounded-md text-black border border-blue-500 my-2"
            onChange={(e) => handleInputChange(e, ele)}
          />
          <small className="text-main text-xs">
            {errors["attributes"] &&
              errors["attributes"][`${ele - 1}`]?.value?.message}
          </small>
        </div>
        <button
          className="flex justify-center items-center"
          onClick={() => {
            setCount((prev) => prev - 1);
            handleDeleteAttribute(ele);
          }}
        >
          <BsFillTrashFill className="cursor-pointer text-main" />
        </button>
      </div>
    ));
  };
  return (
    <div className="w-full pl-4">
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4">
        Tạo mới sản phẩm
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <InputForm
            register={register}
            errors={errors}
            id="name"
            validate={{
              required: "Bắt buộc",
            }}
            label="Tên sản phẩm"
            placeholder="Nhập tên sản phẩm"
            className="form-input w-full outline-none p-2 rounded-md text-black border border-blue-500 my-2"
          />
          <div className="w-full flex gap-4">
            <InputForm
              register={register}
              errors={errors}
              id="price"
              validate={{
                required: "Bắt buộc",
              }}
              type="number"
              label="Giá tiền"
              placeholder="Nhập giá tiền"
              className="form-input w-full outline-none p-2 rounded-md text-black border border-blue-500 my-2"
            />
            <InputForm
              register={register}
              errors={errors}
              id="stock_quantity"
              validate={{
                required: "Bắt buộc",
              }}
              label="Số lượng"
              type="number"
              placeholder="Nhập số lượng"
              className="form-input w-full outline-none p-2 rounded-md text-black border border-blue-500 my-2"
            />
            <Select
              label="Danh mục sản phẩm"
              register={register}
              errors={errors}
              id="category_id"
              validate={{
                required: "Bắt buộc",
              }}
              options={categories?.map((cate) => ({
                code: cate.id,
                value: cate.name,
              }))}
              placeholder="Lựa chọn danh mục"
              className="form-select w-full outline-none p-2 rounded-md text-black border border-blue-500 my-2"
            />
          </div>

          <button
            className="bg-green-500 p-2 mt-2 flex rounded-full items-center font-bold text-white cursor-pointer"
            onClick={() => setCount((prev) => prev + 1)}
          >
            <AiOutlinePlus className="font-semibold" />
          </button>
          <div className="flex justify-between gap-1 flex-col">
            {renderInputAttributes()}
          </div>
          <InputForm
            register={register}
            errors={errors}
            id="description"
            validate={{
              required: "Bắt buộc",
            }}
            label="Thêm mô tả"
            placeholder="Nhập mô tả sản phẩm"
            className="form-input w-full outline-none p-2 rounded-md text-black border border-blue-500 my-2"
          />
          <div className="flex flex-col mt-4">
            <label className="font-bold" htmlFor="thumbnail">
              Ảnh chính
            </label>
            <input
              register={register}
              errors={errors}
              {...register("thumbnail", { required: "Bắt buộc" })}
              type="file"
              id="images"
              multiple
            />
            <small className="text-main text-xs">
              {errors["thumbnail"]?.message}
            </small>
          </div>
          {preview.thumbnail && (
            <div className="my-4">
              <img
                src={preview.thumbnail}
                alt="thumb"
                className="w-[300px] object-contain"
              />
            </div>
          )}
          <div className="flex flex-col mt-4">
            <label className="font-bold" htmlFor="images">
              Ảnh phụ
            </label>
            <input
              register={register}
              errors={errors}
              validate={{
                required: "Bắt buộc",
              }}
              {...register("images", { required: "Bắt buộc" })}
              type="file"
              id="images"
              multiple
            />
            {errors["images"] && (
              <small className="text-main text-xs">
                {errors["images"]?.message}
              </small>
            )}
          </div>
          {preview.images?.length > 0 && (
            <div className="my-4 flex gap-4 w-full flex-wrap">
              {preview.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="thumb"
                  className="w-[200px] object-contain"
                />
              ))}
            </div>
          )}

          <button
            disabled={disable}
            type="submit"
            className={`${buttonColor} p-4 w-full rounded-md text-white font-semibold my-6`}
          >
            Thêm sản phẩm mới
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
