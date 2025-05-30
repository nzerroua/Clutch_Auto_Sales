//car.controller.js

import prisma from "../lib/prismaClient.js";
import fs from "fs";
import path from "path";

// GET all cars with filters
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

    const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);

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
    res.status(500).json({ error: "Failed to create car" });
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
    let updatedImageUrls = parsed.filter(
      (url) => typeof url === "string" && url.startsWith("/uploads/")
    );
    updatedImageUrls = [...new Set(updatedImageUrls)];

    const newImages =
      req.files?.map((file) => `/uploads/${file.filename}`) || [];
    const finalImageUrls = [...new Set([...updatedImageUrls, ...newImages])];

    if (finalImageUrls.length > 10) {
      return res.status(400).json({ error: "Maximum 10 images allowed." });
    }

    const data = {
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
    };

    const removedImages = existingCar.imageUrls.filter(
      (url) => !finalImageUrls.includes(url)
    );
    for (const fileUrl of removedImages) {
      const filePath = path.join(
        process.cwd(),
        "uploads",
        path.basename(fileUrl)
      );
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) console.warn("❌ Failed to delete:", filePath);
          else console.log("🗑️ Deleted:", filePath);
        });
      }
    }

    const updatedCar = await prisma.car.update({
      where: { id: parseInt(id) },
      data,
    });

    res.json(updatedCar);
  } catch (err) {
    console.error("🚨 Error updating car:", err);
    res.status(500).json({ error: "Failed to update car" });
  }
};

// DELETE car
export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await prisma.car.findUnique({ where: { id: parseInt(id) } });
    if (car?.imageUrls?.length) {
      for (const fileUrl of car.imageUrls) {
        const filePath = path.join(
          process.cwd(),
          "uploads",
          path.basename(fileUrl)
        );
        if (fs.existsSync(filePath)) {
          fs.unlink(filePath, (err) => {
            if (err) console.warn("❌ Failed to delete:", filePath);
            else console.log("🗑️ Deleted:", filePath);
          });
        }
      }
    }

    await prisma.car.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Car deleted successfully." });
  } catch (err) {
    console.error("Error deleting car:", err);
    res.status(500).json({ error: "Failed to delete car" });
  }
};
