import { Project } from "@/database";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { UploadApiResponse } from "cloudinary";
import { error } from "console";
import { stat } from "fs";


interface CloudinaryUploadResult {
  secure_url: string;
  [key: string]: any; // pour les autres propriétés éventuelles
}

// ✅ CREATE PROJECT
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    let projectData;
    try {
      projectData = Object.fromEntries(formData.entries());
    } catch {
      return NextResponse.json(
        { message: "Invalid form data format" },
        { status: 400 }
      );
    }

    const file = formData.get("image") as File | null;
    const tags = JSON.parse((formData.get("tags") as string) || "[]");

    if (!file) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 }
      );
    }

    // 📤 Upload image to Cloudinary
     const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult: CloudinaryUploadResult = await new Promise((resolve, reject) => {
  cloudinary.uploader.upload_stream(
    { resource_type: 'image', folder: 'DevEvent' },
    (error, result) => {
      if (error) return reject(error);
      resolve(result as CloudinaryUploadResult);
    }
  ).end(buffer);
});
 
projectData.image = uploadResult.secure_url;

    // 🧩 Create the project
    const createdProject = await Project.create({
      ...projectData,
      tags,
    });

    return NextResponse.json(
      { message: "Project created successfully", project: createdProject },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Project creation failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

{/*
export async function GET() {
  try {
    console.log('Connecting to MongoDB...')
    await connectDB()
    console.log('Connected! Fetching projects...')
    const projects = await Project.find().sort({ createdAt: -1 })
    console.log(`Found ${projects.length} projects`)
    return { projects }
  } catch (error: unknown) {
    console.error('Failed to fetch projects:', error)
    return { projects: [] }
  }
}  
*/}

export async function GET(){
  try{
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1});
    return projects;
  } catch(error: unknown){
    console.error(`Failed to fetch projects` , error);
    return NextResponse.json({ message: "Failed to fetch projects" } , { status : 500 });
  }
}

// ✅ UPDATE PROJECT
export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    // recupération de l'id
    const id = req.nextUrl.searchParams.get('id');
    if(!id) {
      return NextResponse.json(
        {message : 'Project ID is required',
         status : 500 }
        )
    }

    // Récupérer les champs à mettre à jour
    const title = formData.get("title") as string;
    const href = formData.get("href") as string;
    const tags = JSON.parse((formData.get("tags") as string) || "[]");
    const file = formData.get("image") as File | null;

    // Trouver le projet par slug
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    // 🔄 Upload nouvelle image si envoyée
    if (file && typeof file !== "string") {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { resource_type: "image", folder: "DevEvent" },
          (error, results) => {
            if (error) return reject(error);
            resolve(results);
          }
        ).end(buffer);
      });

      project.image = (uploadResult as any).secure_url;
    }

    // Mettre à jour les autres champs
    if (title) project.title = title;
    if (href) project.href = href;
    if (Array.isArray(tags) && tags.length > 0) project.tags = tags;

    // 🔹 Mettre à jour le slug si le titre change
    if (title) {
      project.slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    }

    await project.save();

    return NextResponse.json(
      { message: "Project updated successfully", project },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      {
        message: "Failed to update project",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    // Récupérer l'ID depuis query param
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "Project ID is required" },
        { status: 400 }
      );
    }

    // Vérifier si le projet existe
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    // Supprimer le projet
    await Project.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Project deleted successfully", id },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      {
        message: "Failed to delete project",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}






// ✅ GET PROJECT BY SLUG
export async function GetProjectBySlug(req: NextRequest) {
  try {
    await connectDB();
    const slug = req.nextUrl.searchParams.get("slug");
    if (!slug) {
      return NextResponse.json(
        { message: "Slug is required" },
        { status: 400 }
      );
    }

    const project = await Project.findOne({ slug });

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Project fetched successfully", project },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: "Error fetching project",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}

