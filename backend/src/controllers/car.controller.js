// car.controller.js
import prisma from "../lib/prismaClient.js";
import supabase from "../utils/supabaseClient.js";
import path from "path";

// Helper: Upload a file to Supabase with validation
const uploadToSupabase = async (file) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    throw new Error("Invalid file type. Only JPG, PNG, WEBP allowed.");
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size exceeds 5MB limit.");
  }

  const fileName = `${Date.now()}-${file.originalname}`;
  const { error } = await supabase.storage
    .from("cars")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) {
    console.error("Supabase upload error:", error);
    throw new Error("Failed to upload image");
  }

  return `${process.env.SUPABASE_URL}/storage/v1/object/public/cars/${fileName}`;
};

// Helper: Delete a file from Supabase Storage
const deleteFromSupabase = async (url) => {
  const parts = url.split("/cars/");
  if (parts.length !== 2) return;
  const filePath = `cars/${parts[1]}`;
  await supabase.storage.from("cars").remove([filePath]);
};

// GET all cars
export const getCars = async (req, res) => {
  try {
    const {
      search,
      make,
      model,
      style,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 12,
    } = req.query;

    const where = {
      ...(make && { make: { equals: make, mode: "insensitive" } }),
      ...(model && { model: { equals: model, mode: "insensitive" } }),
      ...(style && { style: { equals: style, mode: "insensitive" } }),
      ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
      ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
      ...(search && {
        OR: [
          { make: { contains: search, mode: "insensitive" } },
          { model: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const orderBy = (() => {
      switch (sort) {
        case "price-asc":
          return { price: "asc" };
        case "price-desc":
          return { price: "desc" };
        case "year-asc":
          return { year: "asc" };
        case "year-desc":
          return { year: "desc" };
        case "mileage-asc":
          return { mileage: "asc" };
        case "mileage-desc":
          return { mileage: "desc" };
        default:
          return { price: "asc" };
      }
    })();

    const [cars, total] = await Promise.all([
      prisma.car.findMany({
        where,
        orderBy,
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
      }),
      prisma.car.count({ where }),
    ]);

    res.json({ cars, total });
  } catch (err) {
    console.error("Error fetching cars:", err);
    res.status(500).json({ error: "Failed to fetch cars" });
  }
};

// POST add a new car
export const addCar = async (req, res) => {
  try {
    if (req.files?.length > 10) {
      return res.status(400).json({ error: "Maximum 10 images allowed." });
    }

    let {
      make,
      model,
      style,
      year,
      price,
      mileage,
      description,
      transmission,
      drivetrain,
      fuelType,
      exteriorColor,
      interiorColor,
      engine,
      vin,
      features = [],
    } = req.body;

    if (!make || !model || !style || !year || !price || !mileage) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled." });
    }

    const capitalize = (s) =>
      s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    make = capitalize(make);
    model = capitalize(model);
    style = capitalize(style);

    const imageUrls = [];
    for (const file of req.files) {
      const url = await uploadToSupabase(file);
      imageUrls.push(url);
    }

    const car = await prisma.car.create({
      data: {
        make,
        model,
        style,
        year: parseInt(year),
        price: parseFloat(price),
        mileage: parseInt(mileage),
        description,
        transmission,
        drivetrain,
        fuelType,
        exteriorColor,
        interiorColor,
        engine,
        vin,
        features: Array.isArray(features)
          ? features
          : features
              .split(",")
              .map((f) => f.trim())
              .filter(Boolean),
        imageUrls,
      },
    });

    res.status(201).json(car);
  } catch (err) {
    console.error("Error adding car:", err);
    res.status(500).json({ error: err.message || "Failed to create car" });
  }
};

// PUT update car
export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const raw = req.body;

    const existingCar = await prisma.car.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    // Handle existing image URLs from client
    let parsed = [];
    const imageField = raw.imageUrls;

    if (Array.isArray(imageField)) {
      parsed = imageField.flatMap((item) =>
        item.includes(",") ? item.split(",") : item
      );
    } else if (typeof imageField === "string") {
      parsed = imageField.includes(",") ? imageField.split(",") : [imageField];
    }

    parsed = parsed.map((s) => s.trim()).filter(Boolean);
    let updatedImageUrls = [...new Set(parsed)];

    // Upload new images and merge
    const newImageUrls = [];
    if (req.files?.length) {
      for (const file of req.files) {
        const url = await uploadToSupabase(file);
        newImageUrls.push(url);
      }
    }

    const finalImageUrls = [...new Set([...updatedImageUrls, ...newImageUrls])];

    if (finalImageUrls.length > 10) {
      return res.status(400).json({ error: "Maximum 10 images allowed." });
    }

    // Remove deleted images from Supabase
    const removedImages = existingCar.imageUrls.filter(
      (url) => !finalImageUrls.includes(url)
    );
    for (const url of removedImages) {
      await deleteFromSupabase(url);
    }

    const updatedCar = await prisma.car.update({
      where: { id: parseInt(id) },
      data: {
        make: raw.make,
        model: raw.model,
        style: raw.style,
        year: parseInt(raw.year),
        price: parseFloat(raw.price),
        mileage: parseInt(raw.mileage),
        description: raw.description === "null" ? null : raw.description,
        transmission: raw.transmission === "null" ? null : raw.transmission,
        drivetrain: raw.drivetrain === "null" ? null : raw.drivetrain,
        fuelType: raw.fuelType === "null" ? null : raw.fuelType,
        exteriorColor: raw.exteriorColor === "null" ? null : raw.exteriorColor,
        interiorColor: raw.interiorColor === "null" ? null : raw.interiorColor,
        engine: raw.engine === "null" ? null : raw.engine,
        vin: raw.vin === "null" ? null : raw.vin,
        features:
          typeof raw.features === "string"
            ? raw.features
                .split(",")
                .map((f) => f.trim())
                .filter(Boolean)
            : [],
        imageUrls: finalImageUrls,
      },
    });

    res.json(updatedCar);
  } catch (err) {
    console.error("🚨 Error updating car:", err);
    res.status(500).json({ error: err.message || "Failed to update car" });
  }
};

// DELETE car
export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await prisma.car.findUnique({ where: { id: parseInt(id) } });
    if (!car) return res.status(404).json({ error: "Car not found" });

    // Delete all images from Supabase
    if (car.imageUrls?.length) {
      for (const url of car.imageUrls) {
        await deleteFromSupabase(url);
      }
    }

    await prisma.car.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Car deleted successfully." });
  } catch (err) {
    console.error("Error deleting car:", err);
    res.status(500).json({ error: "Failed to delete car" });
  }
};
