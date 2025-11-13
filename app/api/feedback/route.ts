import Feedback from "@/database/feedback.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { error } from "console";
import { feedbacks } from "@/constants/data";


export async function POST(req: NextRequest){
    try{
     await connectDB();
     const formData = await req.formData();
     let feedbackData;
     try{
        feedbackData = Object.fromEntries(formData.entries());
     } catch {
     return NextResponse.json(
     { message: "Invalid form data format" },
     { status: 400 }
     );
     }

    const createdFeedback = await Feedback.create(feedbackData);
    return NextResponse.json({ message: "Feedback created successfully" , feedback: createdFeedback }, { status: 201 });
    

    } catch(error: unknown){
        console.error(`Failed to create a feedback` , error);
        return NextResponse.json({ message: `Failed to create a feedback` }, { status: 500 });
    }

}

export async function GET(){
    try{
     await connectDB();
     const feedbacks = await Feedback.find().sort({ createdAt: -1 });
     return NextResponse.json({ message: "Feedbacks fetched successefully", feedbacks } , { status: 200 });
     return feedbacks;
    } catch(error: unknown){
        console.error(`Failed to fetch feedbacks` , error);
        return NextResponse.json({ message: "Failed to fetch feedbacks" } , { status : 500 });
    }
}